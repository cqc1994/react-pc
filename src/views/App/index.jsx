import React from 'react';
import { connect } from 'react-redux';
import { increment } from '../../actions/index';
import { Link } from "react-router-dom";
import { Button } from 'antd';
import './index.less'

class App extends React.Component {

    constructor(props) {
        super(props);
    }

    onClick() {
        this.props.dispatch(increment())
    }

    onClick2() {
        this.props.dispatch({ type: 'INCREMENT_ASYNC' })
    }

    render() {
        return (
            <div className='app'>
                <Button type="primary">按钮测试</Button>
                <Link  to="/test">测试页面</Link>
                <br/>
                <div>redux & redux-saga测试</div>
                <div>current number： {this.props.number} <button onClick={()=>this.onClick()}>点击+1</button></div>
                <div>current number： {this.props.number} <button onClick={()=>this.onClick2()}>点击2秒后+1</button></div>
            </div>
        );
    }
}
export default connect(
    state => ({
        number: state.number
    })
)(App);
