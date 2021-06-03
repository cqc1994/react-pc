import React from "react";
import { connect } from 'react-redux';
import { increment } from '../../actions/index';
import { Link } from "react-router-dom";

class Test extends React.Component{
    constructor(props) {
        super(props);
    }
    onClick(){
        console.log(this.props.number)
    }
    render() {
        return(
            <div>
                <div onClick={()=>{this.onClick()}}>点击</div>
                <Link to="/home">home</Link>
            </div>

        )
    }
}
export default connect(
    state=>({
        number: state.number,
        text: 'test'
    })
)(Test)
