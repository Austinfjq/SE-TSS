import { FORUMINFO_REQUEST, FORUMINFO_SUCCESS, FORUMINFO_FAILURE, HOTPOSTS_REQUEST, HOTPOSTS_SUCCESS, HOTPOSTS_FAILURE, USERSTATES_REQUEST, USERSTATES_FAILURE, USERSTATES_SUCCESS, COLLEGES_SUCCESS, COLLEGES_FAILURE, COURSES_SUCCESS, COURSES_FAILURE, TEACHERLIST_SUCCESS, TEACHERLIST_FAILURE, SET_TIMETYPE, SET_TIME } from "./actions";
import moment from 'moment';


const initialState = {
    hotPosts: undefined,
    isFetchingHotPosts: false,
    collegeItems: undefined,
    courseItems: undefined,
    teacherItems: undefined,
    timeType: 'month',
    time: moment().locale('zh-cn').utcOffset(8),
    userStatesPageSize: 10,
    userStates: undefined,
    isFetchingUserStates: false,
    userStatesPageSize: 5,
    info: undefined,
    isFetchingInfo: false,
    errors: undefined,
};

export function managementReducer(state = initialState, action) {
    switch (action.type) {
        case FORUMINFO_REQUEST:
            return (Object.assign({}, state, {
                isFetchingInfo: true,
            }));
        case FORUMINFO_SUCCESS:
            return (Object.assign({}, state, {
                isFetchingInfo: false,
                info: action.info
            }));
        case FORUMINFO_FAILURE:
            return (Object.assign({}, state, {
                isFetchingInfo: false,
                errors: action.errors,
                info: undefined,
            }));
        case USERSTATES_REQUEST:
            return (Object.assign({}, state, {
                isFetchingUserStates: true,
            }));
        case USERSTATES_SUCCESS:
            return (Object.assign({}, state, {
                isFetchingUserStates: false,
                userStates: action.userStates,
            }))
        case USERSTATES_FAILURE:
            return (Object.assign({}, state, {
                isFetchingUserStates: false,
                errors: action.errors,
                userStates: undefined,
            }))
        case HOTPOSTS_REQUEST:
            return (Object.assign({}, state, {
                isFetchingHotPosts: true,
            }));
        case HOTPOSTS_SUCCESS:
            return (Object.assign({}, state, {
                isFetchingHotPosts: false,
                hotPosts: action.hotPosts,
            }))
        case HOTPOSTS_FAILURE:
            return (Object.assign({}, state, {
                isFetchingHotPosts: false,
                errors: action.errors,
                hotPosts: undefined,
            }))
        case COLLEGES_SUCCESS:
            return (Object.assign({}, state, {
                collegeItems: action.collegeItems,
            }));
        case COLLEGES_FAILURE:
            return (Object.assign({}, state, {
                collegeItems: undefined,
                errors: action.errors,
            }));
        case COURSES_SUCCESS:
            return (Object.assign({}, state, {
                courseItems: action.courseItems,
                teacherItems: undefined,
            }));
        case COURSES_FAILURE:
            return (Object.assign({}, state, {
                courseItems: undefined,
                teacherItems: undefined,
                errors: action.errors,
            }));
        case TEACHERLIST_SUCCESS:
            return (Object.assign({}, state, {
                teacherItems: action.teacherItems,
            }));
        case TEACHERLIST_FAILURE:
            return (Object.assign({}, state, {
                teacherItems: undefined,
            }));
        case SET_TIMETYPE:
            return (Object.assign({}, state, {
                timeType: action.timeType,
            }));
        case SET_TIME:
            return (Object.assign({}, state, {
                time: action.time,
            }));
        default: return state;
    };
}