import {DEBUG, ROOT_URL} from "../../configs/config"

export const GET_COURSE_INFO = 'get_course_info'
export const GOT_COURSE_INFO = 'got_course_info'
export const GET_COURSE_POSTS = 'get_course_posts'
export const GOT_COURSE_POSTS = 'got_course_posts'
export const CHECKED_SUBSCRIBED = 'checked_course_subscribed'
export const SUBSCRIBE_COURSE = 'subscribe_course'
export const UNSUBSCRIBE_COURSE = 'unsubscribe_course'
export const POSTING = 'course_posting'
export const POST_SUCCESS = 'course_post_success'
export const POST_FAIL = 'course_post_fail'
export const CLOSE_DIALOG = 'close_course_dialog'

export const newPost = (uid, collegeId, courseId, title, content, fileId) => (dispatch, getState) => {
    dispatch({
        type: POSTING
    })
    fetch(
        `${ROOT_URL}/api/forum/course_newpost`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                uid: "1", // todo: remove uid
                collegeId: collegeId,
                courseId: courseId,
                title: title,
                content: content,
                fileId: fileId
            })
        }
    )
        .then(res => res.json())
        .then((data) => {
            if (data.error) {
                console.log(data)
            } else {
                dispatch({
                    type: POST_SUCCESS
                })
            }
        })
}

export const subscribe = (uid, collegeId, courseId) => (dispatch, getState) => {
    fetch(`${ROOT_URL}/api/forum/course_subscribe${DEBUG ? '' : `?uid=${uid}&collegeid=${collegeId}&courseid=${courseId}`}`)
        .then(res => res.json())
        .then((data) => {
            if (data.error) {
                // todo: deal with error
            } else {
                dispatch({
                    type: SUBSCRIBE_COURSE,
                    subscribed: data.subscribed
                })
            }
        })
}

export const unsubscribe = (uid, collegeId, courseId) => (dispatch, getState) => {
    fetch(`${ROOT_URL}/api/forum/course_unsubscribe${DEBUG ? '' : `?uid=${uid}&collegeid=${collegeId}&courseid=${courseId}`}`)
        .then(res => res.json())
        .then((data) => {
            if (data.error) {
                // todo: deal with error
            } else {
                dispatch({
                    type: UNSUBSCRIBE_COURSE,
                    subscribed: data.subscribed
                })
            }
        })
}

export const checkSubscribed = (uid, collegeId, courseId) => (dispatch, getState) => {
    fetch(`${ROOT_URL}/api/forum/course_subscribed${DEBUG ? '' : `?uid=${uid}&collegeid=${collegeId}&courseid=${courseId}`}`)
        .then(res => res.json())
        .then((data) => {
            if (data.error) {
                // todo: deal with error
            } else {
                dispatch({
                    type: CHECKED_SUBSCRIBED,
                    subscribed: data.subscribed
                })
            }
        })
}

export const getCourseInfo = (collegeId, courseId) => (dispatch, getState) => {
    fetchCourseInfo(collegeId, courseId)
        .then((data) => {
            if (data.error) {
                // todo: error handle
            } else {
                dispatch({
                    type: GOT_COURSE_INFO,
                    courseInfo: data
                })
                dispatch(getPosts(collegeId, courseId, getState().forum.course.currPage))
            }
        })
}

export const getPosts = (collegeId, courseId, pageId) => (dispatch, getState) => {
    fetchPosts(collegeId, courseId, pageId)
        .then((data) => {
            if (data.error) {
                // todo: deal with error
            } else {
                dispatch({
                    type: GOT_COURSE_POSTS,
                    currPage: pageId,
                    posts: data.data
                })
            }
        })
}

function fetchCourseInfo(collegeId, courseId) {
    return fetch(`${ROOT_URL}/api/forum/course${DEBUG ? '' : `?collegeid=${collegeId}&courseid=${courseId}`}`)
        .then((response) => (response.json()))
}


function fetchPosts(collegeId, courseId, pageId) {
    return fetch(`${ROOT_URL}/api/forum/course_posts${DEBUG ? '' : `?collegeid=${collegeId}&courseid=${courseId}&pageid=${pageId}`}`)
        .then((response) => (response.json()))
}
