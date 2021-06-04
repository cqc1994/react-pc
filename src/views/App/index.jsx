import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { Button } from 'antd';

import './index.less'
import { increment } from '@/store/num/action';
import Footer from '@components/Footer'
import Header from '@components/Footer'

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

    onClick3(){
        this.props.dispatch({type:'UPDATE',name:'李四',age:18})
    }
    onClick4(){
        console.log(this.props.info)

    }
    componentDidMount() {
        console.log(this.props)
    }

    render() {
        return (
            <div className='app'>
                <Header></Header>
                <Button type="primary" onClick={()=>this.onClick3()}>Button</Button>
                <Button type="primary" onClick={()=>this.onClick4()}>Button222</Button>
                <Link  to="/test">测试页面</Link>
                <br/>
                <div>redux & redux-saga测试</div>
                <div>current number： {this.props.number} <button onClick={()=>this.onClick()}>点击+1</button></div>
                <div>current number： {this.props.number} <button onClick={()=>this.onClick2()}>点击2秒后+1</button></div>
                <Footer></Footer>
            </div>
        );
    }
}
export default connect(
    state => ({
        number: state.incrementReducer.number,
        info: state.demoReducer
    })
)(App);
