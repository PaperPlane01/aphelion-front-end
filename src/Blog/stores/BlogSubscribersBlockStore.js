import {action, observable, reaction} from 'mobx';
import {createErrorFromResponse, subscriptionService} from "../../Api";
import {Component} from "../../simple-ioc";

@Component({
    dependencies: [
        {propertyName: 'blogStore'}
    ]
})
class BlogSubscribersBlockStore {
    @observable blogId = undefined;
    @observable subscribers = [];
    @observable pending = false;
    @observable error = undefined;
    @observable blogStore = undefined;

    constructor() {
        reaction(
            () => this.blogStore.blogId,
            () => this.blogId = this.blogStore.blogId
        );

        reaction(
            () => this.blogId,
            () => {
                if (this.blogId) {
                    this.subscribers = [];
                    this.fetchSubscribers();
                }
            }
        )
    }

    @action fetchSubscribers = () => {
        this.pending = true;

        return subscriptionService.findByBlog(this.blogId, {
            page: 0,
            pageSize: 6,
            sortBy: 'id'
        }).then(response => {
            this.subscribers = response.data.map(subscription => subscription.user);
            this.error = undefined;
        }).catch(error => {
            this.error = createErrorFromResponse(error.response);
        }).then(() => {
            this.pending = false;
        })
    };

    @action setBlogId = blogId => {
        this.blogId = blogId;
    }
}

export default BlogSubscribersBlockStore;