import {observable, action, reaction, computed} from "mobx";
import {normalize} from "normalizr";
import {blogPostReportListSchema} from "./schemas";
import {canSeeBlogPostReports} from "../permissions";
import {ReportStatus} from "../../Report";
import {blogPostReportService, createErrorFromResponse} from "../../Api";

const BLOG_POST_REPORTS_INITIAL_STATE = {
    result: [],
    entities: {
        blogPostReports: {}
    }
};

export default class BlogPostReportListStore {
    @observable authStore = undefined;
    @observable blogPostReports = BLOG_POST_REPORTS_INITIAL_STATE;
    @observable selectedBlogPostReports = [];
    @observable paginationParameters = {
        pageSize: 30,
        sortingDirection: 'DESC'
    };
    @observable currentPageNumber = 0;
    @observable pending = false;
    @observable error = undefined;
    @observable fetchReportsOnUserChange = false;

    @computed
    get currentUser() {
        return this.authStore.currentUser;
    }

    constructor(authStore) {
        this.authStore = authStore;

        reaction(
            () => this.currentUser,
            () => {
                if (this.fetchReportsOnUserChange) {
                    this.fetchBlogPostReports();
                }
            }
        )
    }

    @action
    fetchBlogPostReports = () => {
        if (canSeeBlogPostReports(this.currentUser)) {
            this.error = undefined;
            this.pending = true;

            return blogPostReportService.findAll({
                ...this.paginationParameters,
                page: this.currentPageNumber
            }).then(({data}) => {
                if (data.length !== 0) {
                    const normalizedResponse = normalize(data, blogPostReportListSchema);
                    this.blogPostReports.entities.blogPostReports = {
                        ...this.blogPostReports.entities.blogPostReports,
                        ...normalizedResponse.entities.blogPostReports
                    };
                    this.blogPostReports.result = {
                        ...this.blogPostReports.result,
                        ...normalizedResponse.result
                    };
                    this.currentPageNumber = this.currentPageNumber + 1;
                }
            }).catch(({response}) => {
                this.error = createErrorFromResponse(response);
            }).then(() => {
                this.pending = false;
            })
        }
    };

    @action
    reset = () => {
        this.blogPostReports = BLOG_POST_REPORTS_INITIAL_STATE;
        this.selectedBlogPostReports = [];
        this.error = undefined;
        this.pending = false;
        this.currentPageNumber = 0;
    };

    @action
    selectBlogPostReport = id => {
        if (this.selectedBlogPostReports.length < 30) {
            this.blogPostReports.entities.blogPostReports[id].selected = true;
            this.selectedBlogPostReports.push(id);
        }
    };

    @action
    unselectBlogPostReport = id => {
        this.blogPostReports.entities.blogPostReports[id].selected = false;
        this.selectedBlogPostReports = this.selectedBlogPostReports.filter(blogPostReportId => blogPostReportId !== id);
    };

    @action
    clearSelection = () => {
        this.selectedBlogPostReports.forEach(blogPostReportId => {
            this.blogPostReports.entities.blogPostReports[blogPostReportId].selected = false;
        });
        this.selectedBlogPostReports = [];
    };

    @action
    markSelectedBlogPostReportsAsAccepted = () => {
        const blogPostReports = this.selectedBlogPostReports.map(id => ({
            id,
            status: ReportStatus.ACCEPTED
        }));

        return blogPostReportService.updateMultiple(blogPostReports)
            .then(({data}) => {
                const normalizedResponse = normalize(data, blogPostReportListSchema);
                normalizedResponse.result.forEach(reportId => {
                    normalizedResponse.entities.commentReports[reportId].selected = true;
                });
                this.blogPostReports.entities.blogPostReports = {
                    ...this.blogPostReports.entities.blogPostReports,
                    ...normalizedResponse.entities.blogPostReports
                }
            })
    };

    @action
    updateBlogPostReports = updatedReports => {
        this.blogPostReports.entities.blogPostReports = {
            ...this.blogPostReports.entities.blogPostReports,
            ...updatedReports
        }
    };
}