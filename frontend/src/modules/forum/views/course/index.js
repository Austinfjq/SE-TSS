import React, {Component} from 'react'
import {connect} from "react-redux"
import {checkSubscribed, getCourseInfo, newPost, subscribe, unsubscribe} from "./actions"
import {MainBody} from "../../components/util/MainBody"
import {Path} from "../../components/util/Path"
import {SectionText, SectionTitle} from "../../components/util/SectionTitle"
import {Extension, Announcement} from "@material-ui/icons"
import {Button, Grid} from "material-ui"
import {goBottom} from "../../utils/pageHandler"
import PostsList from "./components/PostsList"
import PostEditor from "../teacher/components/PostEditor"
import SubForum from "./components/SubForum"

class Course extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLogin: true // todo: get login!!!
        }
        this.subscribe = this.subscribe.bind(this)
        this.unsubscribe = this.unsubscribe.bind(this)
        this.goToPost = this.goToPost.bind(this)
        this.post = this.post.bind(this)
    }

    componentDidMount() {
        const {collegeid, courseid} = this.props.match.params
        this.props.getCourseInfo(collegeid, courseid)
        if (this.state.isLogin) {
            this.props.checkSubscribed("uid", collegeid, courseid) // todo: get uid
        }
    }

    subscribe() {
        if (!this.state.isLogin) {
            // todo: redirect to login
        }
        else {
            const {collegeid, courseid} = this.props.match.params
            this.props.subscribe("uid", collegeid, courseid) // todo: get uid
        }
    }

    unsubscribe() {
        if (!this.state.isLogin) {
            // todo: redirect to login
        }
        else {
            const {collegeid, courseid} = this.props.match.params
            this.props.unsubscribe("uid", collegeid, courseid)
        }
    }

    goToPost() {
        if (this.state.isLogin)
            goBottom()
        else {
            // todo: redirect to login
        }
    }

    post(title, content) {
        const {collegeid, courseid} = this.props.match.params
        this.props.newPost("uid", collegeid, courseid, title, content) // todo: get uid
    }

    render() {
        const {college, course, subForums, subscribed} = this.props
        const {collegeid, courseid} = this.props.match.params
        const path = {
            college: {
                name: college,
                link: `/forum/${collegeid}`
            },
            course: {
                name: course,
                link: `/forum/${collegeid}/${courseid}`
            }
        }

        return (
            <div>
                <MainBody>
                    <div>
                        <Path path={path}/>
                        <SectionTitle>
                            <SectionText text={'教师版块'}>
                                <Extension color={'primary'} style={{fontSize: 40}}/>
                            </SectionText>
                            <div>
                            </div>
                        </SectionTitle>
                        <Grid container>
                            {subForums.map((sub) => (
                                <Grid item xs={4}
                                      style={{
                                          padding: 10
                                      }}
                                >
                                    <SubForum
                                        key={sub.id}
                                        id={sub.id}
                                        name={sub.name}
                                        pic={sub.pic}
                                        lastUpdate={sub.lastUpdate}
                                        postsNum={sub.postsNum}
                                        posts={sub.newestPosts}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                    <div style={{marginTop: 40}}>
                        <SectionTitle>
                            <SectionText text={'所有帖子'}>
                                <Announcement color={'primary'} style={{fontSize: 40}}/>
                            </SectionText>
                            <div>
                                {
                                    subscribed ?
                                        <Button
                                            color={'secondary'}
                                            variant={'raised'}
                                            onClick={this.unsubscribe}
                                        >取消订阅</Button>
                                        :
                                        <Button
                                            color={'secondary'}
                                            variant={'raised'}
                                            onClick={this.subscribe}
                                        >订阅</Button>
                                }
                                <span style={{width: 10}}> </span>
                                <Button
                                    color={'primary'}
                                    variant={'raised'}
                                    onClick={this.goToPost}
                                >发布新帖</Button>
                            </div>
                        </SectionTitle>
                        <PostsList/>
                    </div>
                    <PostEditor
                        post={this.post}
                    />
                </MainBody>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    college: state.forum.course.college,
    course: state.forum.course.course,
    subForums: state.forum.course.subForums,
    subscribed: state.forum.course.subscribed,
    posts: []
})

const mapDispatchToProps = (dispatch) => ({
    newPost: (uid, collegeId, courseId, title, content) => {
        dispatch(newPost(uid, collegeId, courseId, title, content))
    },
    subscribe: (uid, collegeId, courseId) => {
        dispatch(subscribe(uid, collegeId, courseId))
    },
    unsubscribe: (uid, collegeId, courseId) => {
        dispatch(unsubscribe(uid, collegeId, courseId))
    },
    checkSubscribed: (uid, collegeId, courseId) => {
        dispatch(checkSubscribed(uid, collegeId, courseId))
    },
    getCourseInfo: (collegeId, courseId) => {
        dispatch(getCourseInfo(collegeId, courseId))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(Course)