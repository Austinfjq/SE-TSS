import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/auth';

function mapStateToProps(state) {
    return {
       // isRegistering: state.auth.isRegistering,
       // registerStatusText: state.auth.registerStatusText,
        isAuthenticated: state.info.auth.isAuthenticated,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}




class Analytics extends React.Component { // eslint-disable-line react/prefer-stateless-function
    render() {
        return (
            <div className="col-md-8">
                <h1>Analytics</h1>
                <hr />
            </div>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Analytics);

