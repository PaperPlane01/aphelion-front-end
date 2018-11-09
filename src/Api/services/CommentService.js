import queryString from 'query-string';
import Api from '../Api';
import Routes from '../Routes';

const findByBlogPost = (blogPostId, paginationParams) => {
    return Api.get(`/${Routes.BLOG_POSTS}/${blogPostId}/${Routes.COMMENTS}${paginationParams && `?${queryString.stringify(paginationParams)}`}`);
};

const save = comment => {
    return Api.post(`/${Routes.COMMENTS}`, JSON.stringify(comment));
};

const update = (id, comment) => {
    return Api.put(`/${Routes.COMMENTS}/${id}`, JSON.stringify(comment));
};

const _delete = id => {
    return Api.delete(`/${Routes.COMMENTS}/${id}`)
};

const restore = id => {
    return Api.patch(`/${Routes.COMMENTS}/${id}`, JSON.stringify({deleted: false}));
};

export default {
    findByBlogPost,
    save,
    update,
    delete: _delete,
    restore
};