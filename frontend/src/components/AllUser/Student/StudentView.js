import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../../actions/auth';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import {browserHistory} from "react-router";
import FlatButton from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import ContentCopy from 'material-ui/svg-icons/content/content-copy';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import StudentBar from "./StudentBar";

function mapStateToProps(state) {
    return {
        isRegistering: state.auth.isRegistering,
        registerStatusText: state.auth.registerStatusText,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

const style = {
    height: 180,
    width: 280,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
};

const buttonStyle = {
    color: 'white',
    width: 150,
    marginTop: 10,
}

@connect(mapStateToProps, mapDispatchToProps)
export default class StudentView extends React.Component {

    constructor(props){
        super(props);
        const redirectRoute = '/student';
        this.state={
            userName:'',
            redirectTo: redirectRoute,
            drawerOpen:false,
        };
    }

    componentDidMount() {
        this.setState({userName: localStorage.getItem('userName')});
    }


    handleClick(){
        this.setState({drawerOpen: !this.state.drawerOpen});
    }
    render() {
        const contentStyle = {
            transition: 'margin-left 450ms cubic-bezier(0.23, 1, 0.32, 1)' ,
            margin: '50'
        };
        if (this.state.drawerOpen) {
            contentStyle.marginLeft = 220;
        }
        else{
            contentStyle.marginLeft = 50;
        }

        return (
            <div>
                <StudentBar drawerOpen={this.state.drawerOpen} handleClick={this.handleClick.bind(this)}/>

                <Card style={contentStyle}>
                    <CardHeader title={"欢迎登录基础信息管理系统"}/>
                    <hr/>
                </Card>

            </div>
        );
    }
}


StudentView.propType={


};


