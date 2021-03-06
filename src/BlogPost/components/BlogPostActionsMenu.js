import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteBlogPostMenuItem from './DeleteBlogPostMenuItem';
import DeleteBlogPostDialog from './DeleteBlogPostDialog';
import EditBlogPostMenuItem from './EditBlogPostMenuItem';
import PinBlogPostMenuItem from './PinBlogPostMenuItem';
import UnpinBlogPostMenuItem from './UnpinBlogPostMenuItem';
import withBlogPostPinnedSnackBar from './withBlogPostPinnedSnackBar';
import withBlogPostUnpinnedSnackBar from './withBlogPostUnpinnedSnackBar';
import {BlockUserGloballyMenuItem, CreateGlobalBlockingDialog, canBlockUser} from "../../GlobalBlocking";
import {ReportBlogPostDialog, ReportBlogPostMenuItem} from "../../BlogPostReport/components";
import * as blogPostPermissions from "../permissions";

@withBlogPostUnpinnedSnackBar
@withBlogPostPinnedSnackBar
@inject('authStore')
@inject('blockBlogPostAuthorStore')
@observer
class BlogPostActionsMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            anchorElement: undefined
        }
    };

    openMenu = event => {
        this.setState({
            anchorElement: event.currentTarget
        })
    };

    closeMenu = () => {
        this.setState({anchorElement: null});
    };

    handleBlockBlogPostAuthorMenuItemClick = () => {
        this.closeMenu();

        const {blockBlogPostAuthorStore, blogPost} = this.props;
        blockBlogPostAuthorStore.setBlogPostPublisher(blogPost.publisher);
        blockBlogPostAuthorStore.setBlogPostId(blogPost.id);
    };

    render() {
        const {authStore, blogPost, blockBlogPostAuthorStore} = this.props;
        const items = [];

        const canDeleteBlogPost = blogPostPermissions.canDeleteBlogPost(authStore.currentUser, blogPost);
        const canBlockAuthor = canBlockUser(authStore.currentUser);
        const canEditBlogPost = blogPostPermissions.canEditBlogPost(authStore.currentUser, blogPost);
        const canPinBlogPost = !blogPost.pinned && blogPostPermissions.canPinBlogPost(authStore.currentUser, blogPost.blogId);
        const canUnpinBlogPost = blogPost.pinned && blogPostPermissions.canUnpinBlogPost(authStore.currentUser, blogPost.blogId);

        items.push(<ReportBlogPostMenuItem onClick={this.closeMenu}
                                           blogPostId={blogPost.id}
        />);

        if (canPinBlogPost) {
            items.push(<PinBlogPostMenuItem onClick={this.closeMenu}
                                            blogPostId={blogPost.id}
            />);
        }

        if (canUnpinBlogPost) {
            items.push(<UnpinBlogPostMenuItem onClick={this.closeMenu}
                                              blogPostId={blogPost.id}
            />);
        }

        if (canDeleteBlogPost) {
            items.push(<DeleteBlogPostMenuItem onClick={this.closeMenu}
                                               blogPostId={blogPost.id}
            />);
        }

        if (canBlockAuthor) {
            items.push(<BlockUserGloballyMenuItem onClick={this.handleBlockBlogPostAuthorMenuItemClick}/>);
        }

        if (canEditBlogPost) {
            items.push(<EditBlogPostMenuItem onClick={this.closeMenu} blogPostId={blogPost.id}/>);
        }

        const menuId = `blogPostActionsMenu-${blogPost.id}`;
        const {anchorElement} = this.state;

        return <div>
            <IconButton onClick={this.openMenu}>
                <MoreVertIcon/>
            </IconButton>
            <Menu id={menuId}
                  anchorEl={anchorElement}
                  open={Boolean(anchorElement)}
                  onClose={this.closeMenu}
                  anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                  }}
                  transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                  }}
            >
                {items}
            </Menu>
            <ReportBlogPostDialog blogPostId={blogPost.id}/>
            {canDeleteBlogPost && <DeleteBlogPostDialog blogPostId={blogPost.id}/>}
            {(canBlockAuthor && blockBlogPostAuthorStore.blogPostId === blogPost.id) && <CreateGlobalBlockingDialog/>}
        </div>
    }
}

BlogPostActionsMenu.propTypes = {
    authStore: PropTypes.object,
    blockBlogPostAuthorStore: PropTypes.object,
    blogPost: PropTypes.object
};

export default BlogPostActionsMenu;