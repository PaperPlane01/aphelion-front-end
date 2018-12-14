import {AuthStore, SignUpStore, EditProfileStore, UserProfileStore, CreateGlobalBlockingStore,
    GoogleAuthStore} from '../User'
import {SettingsStore} from '../Settings';
import {BlogPostListStore, CreateBlogPostStore, BlogPostLikeStore, DeleteBlogPostDialogStore,
    BlogPostStore, BlockBlogPostAuthorStore, FeedStore} from "../BlogPost";
import {CreateBlogStore, BlogStore, BlogSubscribersBlockStore, SubscribeToBlogStore,
    UnsubscribeFromBlogStore, EditBlogDialogStore, BlogSubscribersListStore} from "../Blog";
import {BlogManagersBlockStore, CreateBlogManagerStore, UpdateBlogManagerStore, BlogManagersStore} from '../BlogManager'
import {CreateBlogBlockingStore, BlogBlockingsStore, UpdateBlogBlockingStore} from '../BlogBlocking';
import {AppBarStore, CurrentUserSubscriptionsStore, CurrentUserBlogsStore} from "../AppBar";
import {CommentListStore, CreateCommentStore, CommentLikeStore, DeleteCommentStore,
    RestoreCommentStore, BlockCommentAuthorInBlogStore, BlockCommentAuthorGloballyStore} from "../Comment";
import {NotificationsHolderStore} from "../Notification";

const authStore = new AuthStore();
const signUpStore = new SignUpStore();
const settingsStore = new SettingsStore();
const editProfileStore = new EditProfileStore(authStore);
const userProfileStore = new UserProfileStore(authStore);
const blogStore = new BlogStore(authStore);
const blogSubscribersBlockStore = new BlogSubscribersBlockStore(blogStore);
const appBarStore = new AppBarStore(authStore);
const currentUserSubscriptionsStore = new CurrentUserSubscriptionsStore(authStore, appBarStore);
const subscribeToBlogStore = new SubscribeToBlogStore(blogStore, currentUserSubscriptionsStore);
const unsubscribeFromBlogStore = new UnsubscribeFromBlogStore(blogStore, currentUserSubscriptionsStore);
const createBlogPostStore = new CreateBlogPostStore();
const blogPostLikeStore = new BlogPostLikeStore();
const blogPostListStore = new BlogPostListStore(blogStore, authStore, createBlogPostStore, blogPostLikeStore);
const deleteBlogPostDialogStore = new DeleteBlogPostDialogStore(blogPostListStore);
const blogManagersBlockStore = new BlogManagersBlockStore(authStore, blogStore);
const blogPostStore = new BlogPostStore(authStore, blogPostLikeStore);
const createCommentStore = new CreateCommentStore(blogPostStore);
const commentListStore = new CommentListStore(blogPostStore, authStore, createCommentStore);
const commentLikeStore = new CommentLikeStore(commentListStore);
const deleteCommentStore = new DeleteCommentStore(commentListStore);
const restoreCommentStore = new RestoreCommentStore(commentListStore);
const editBlogDialogStore = new EditBlogDialogStore(blogStore);
const notificationsHolderStore = new NotificationsHolderStore(authStore);
const createBlogBlockingStore = new CreateBlogBlockingStore(blogStore, blogPostStore);
const blockCommentAuthorInBlogStore = new BlockCommentAuthorInBlogStore();
const blogSubscribersListStore = new BlogSubscribersListStore();
const createGlobalBlockingStore = new CreateGlobalBlockingStore();
const blockBlogPostAuthorStore = new BlockBlogPostAuthorStore(createGlobalBlockingStore);
const feedStore = new FeedStore(authStore, blogPostLikeStore);
const blogBlockingsStore = new BlogBlockingsStore(authStore);
const updateBlogBlockingStore = new UpdateBlogBlockingStore();
const createBlogManagerStore = new CreateBlogManagerStore();
const updateBlogManagerStore = new UpdateBlogManagerStore();
const blogManagersStore = new BlogManagersStore(updateBlogManagerStore);
const blockCommentAuthorGloballyStore = new BlockCommentAuthorGloballyStore();
const googleAuthStore = new GoogleAuthStore(authStore);
const createBlogStore = new CreateBlogStore();
const currentUserBlogsStore = new CurrentUserBlogsStore(authStore, createBlogStore, appBarStore);

export default {
    authStore,
    blogPostListStore,
    blogPostLikeStore,
    signUpStore,
    settingsStore,
    createBlogStore,
    editProfileStore,
    userProfileStore,
    blogStore,
    blogSubscribersBlockStore,
    subscribeToBlogStore,
    unsubscribeFromBlogStore,
    createBlogPostStore,
    appBarStore,
    currentUserSubscriptionsStore,
    deleteBlogPostDialogStore,
    blogManagersBlockStore,
    blogPostStore,
    commentListStore,
    createCommentStore,
    commentLikeStore,
    deleteCommentStore,
    restoreCommentStore,
    editBlogDialogStore,
    notificationsHolderStore,
    createBlogBlockingStore,
    blockCommentAuthorInBlogStore,
    blogSubscribersListStore,
    createGlobalBlockingStore,
    blockBlogPostAuthorStore,
    feedStore,
    blogBlockingsStore,
    updateBlogBlockingStore,
    createBlogManagerStore,
    updateBlogManagerStore,
    blogManagersStore,
    blockCommentAuthorGloballyStore,
    googleAuthStore,
    currentUserBlogsStore
};