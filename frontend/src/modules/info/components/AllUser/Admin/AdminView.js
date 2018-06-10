import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {bindActionCreators} from 'redux';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import * as actionCreators from '../../../actions/auth';
import Typography from '@material-ui/core/Typography';

import {Link} from "react-router";
import {
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@material-ui/core';

import {
    Home,
    AccountBox,
    SupervisorAccount,
    Class,
    Star,
} from '@material-ui/icons';

import Bar from "../Bar";
import {listItems, otherItems} from "../Staff/StaffData";

function mapStateToProps(state) {
    return {
        userName: state.auth.userName,
        data: state.auth.data,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

const styles = theme => ({

});




class AdminView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
        };
    }

    componentDidMount() {

    }

    render() {
        const {classes, theme} = this.props;
        return (
            <Bar
                listItems={listItems}
                otherItems={otherItems}
                children={
                    <Typography>{'欢迎来到教务管理系统吸吸'}</Typography>
                }
            />

        );
    }
}

AdminView.propType = {
    userName: PropTypes.string,
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};


export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(AdminView));



