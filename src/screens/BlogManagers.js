import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AppBar from '../AppBar';
import StandardLayout from '../StandardLayout';
import {BlogManagersList} from '../BlogManager';
import {withLocale} from "../localization";

@withLocale
@inject('blogManagersStore')
@observer
class BlogManagers extends React.Component {
    renderContent = () => {
        const {blogManagersStore, l} = this.props;
        const {error} = blogManagersStore;

        if (error) {
            return error.status === 404 || error.status === 400
                ? <Typography variant="headline">
                    {l('blogNotFound')}
                </Typography>
                : <Typography variant="headline">
                    {l('errorWhenAttemptedToFetchBlogManagers', {errorStatus: error.status})}
                </Typography>
        }

        return <BlogManagersList/>
    };

    render() {
        const {blogManagersStore, l} = this.props;
        const {blog} = blogManagersStore;
        const appBarTitle = blog
            ? `${l('blogManagers_withBlogName', {blogName: blog.name})}`
            : `${l('blogManagers')}`;

        return <Grid container>
            <Grid item xs={12}>
                <AppBar title={appBarTitle}/>
            </Grid>
            <StandardLayout>
                {this.renderContent()}
            </StandardLayout>
        </Grid>
    }
}

BlogManagers.propTypes = {
    blogManagersStore: PropTypes.object,
    l: PropTypes.func
};

export default BlogManagers;