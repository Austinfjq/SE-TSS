import React, {Component} from 'react'
import {connect} from "react-redux"
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "material-ui"
import {CLOSE_COMMENT, comment, OPEN_COMMENT} from "../actions"

class Comment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            content: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        this.setState({
            content: e.target.value
        })
    }

    handleSubmit() {
        const {to, postId, replyId} = this.props
        this.props.comment(postId, replyId, "uid", to, this.state.content)
    }

    render() {
        const {open, to, closeComment, postId, replyId} = this.props
        return (
            <Dialog
                open={open}
                onClose={() => closeComment()}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle
                    style={{
                        width: 400
                    }}
                    id="form-dialog-title"
                >评论</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        value={this.state.content}
                        margin="dense"
                        id="name"
                        label="评论"
                        type="text"
                        fullWidth
                        onChange={this.handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => closeComment()} color="secondary">
                        取消
                    </Button>
                    <Button onClick={() => this.handleSubmit()} color="primary">
                        提交
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

const mapStateToProps = (state) => ({
    open: state.forum.post.comment.open,
    postId: state.forum.post.comment.postId,
    replyId: state.forum.post.comment.replyId,
    to: state.forum.post.comment.to
})

const mapDispatchToProps = (dispatch) => ({
    comment: (postId, replyId, from, to, content) => {
        dispatch(comment(postId, replyId, from, to, content))
    },
    closeComment: () => {
        dispatch({
            type: CLOSE_COMMENT
        })
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Comment)
