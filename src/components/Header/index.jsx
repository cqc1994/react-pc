import React from "react"
import './index.less'

class Header extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <header>
                <nav>
                    <li>首页</li>
                </nav>
            </header>
        )
    }
}
export default Header
