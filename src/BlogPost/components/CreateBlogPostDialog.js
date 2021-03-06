import React from "react";
import PropTypes from "prop-types";
import {inject, observer} from "mobx-react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import {Editor} from "react-draft-wysiwyg";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import BlogPostTagsInput from './BlogPostTagsInput';
import CreateBlogPostFormStyles from "./CreateBlogPostForm.css";
import {withLocale} from "../../localization";

@withLocale
@inject('createBlogPostStore')
@observer
class CreateBlogPostDialog extends React.Component {
    renderForm = () => {
        const {createBlogPostStore, l, currentLocale} = this.props;
        const {
            createBlogPostFormErrors,
            createBlogPostFormValues,
            submissionError,
        } = createBlogPostStore;
        console.log(createBlogPostFormValues.tags);

        return (
            <div>
                <TextField label={l('title')}
                           value={createBlogPostFormValues.title}
                           onChange={event => createBlogPostStore.setCreateBlogPostFormValue(event.target.value, 'title')}
                           error={createBlogPostFormErrors.title}
                           helperText={createBlogPostFormErrors.title && l(createBlogPostFormErrors.title)}
                           fullWidth
                           margin="dense"
                />
                <BlogPostTagsInput tags={createBlogPostFormValues.tags}
                                   onTagAdded={createBlogPostStore.addTag}
                                   onTagRemoved={createBlogPostStore.removeTag}
                />
                <Editor style={{
                    width: '100%',
                    border: '1px solid #F1F1F1 !important'
                }}
                        editorState={createBlogPostFormValues.content}
                        onEditorStateChange={editorState => createBlogPostStore.setCreateBlogPostFormValue(editorState, 'content')}
                        localization={{
                            locale: currentLocale
                        }}
                        editorClassName="createBlogPostForm"
                />
                {createBlogPostFormErrors.content && <Typography variant="body1"
                                                                 style={{color: 'red'}}
                >
                    {l(createBlogPostFormErrors.content)}
                </Typography>}
                {submissionError && <Typography variant="body1"
                                                style={{color: 'red'}}
                >
                    {l('errorWhenAttemptedToCreateBlogPost', {errorStatus: submissionError.status})}
                </Typography>}
            </div>
        )
    };

    render() {
        const {createBlogPostStore, l} = this.props;
        const {
            pending,
            createBlogPostFormOpen
        } = createBlogPostStore;

        return (
            <div>
                <Button variant="contained"
                        color="primary"
                        onClick={() => createBlogPostStore.setCreateBlogPostFormOpen(true)}
                >
                    {l('createBlogPost')}
                </Button>
                <Dialog open={createBlogPostFormOpen}
                        fullScreen
                        onClose={() => createBlogPostStore.setCreateBlogPostFormOpen(false)}
                >
                    <DialogTitle>
                        {l('createBlogPost')}
                    </DialogTitle>
                    <DialogContent>
                        {this.renderForm()}
                    </DialogContent>
                    <DialogActions>
                        {pending && <CircularProgress color="primary" size={25}/>}
                        <Button variant="contained"
                                color="primary"
                                onClick={createBlogPostStore.createBlogPost}
                        >
                            {l('save')}
                        </Button>
                        <Button variant="outlined"
                                color="secondary"
                                onClick={() => createBlogPostStore.setCreateBlogPostFormOpen(false)}
                        >
                            {l('cancel')}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

CreateBlogPostDialog.propTypes = {
    createBlogPostStore: PropTypes.object,
    currentLocale: PropTypes.string,
    l: PropTypes.func,
    classes: PropTypes.object
};

export default CreateBlogPostDialog;