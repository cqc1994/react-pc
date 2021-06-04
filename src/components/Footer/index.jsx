import React from "react"
import './index.less'

class Footer extends React.Component{

    constructor(props) {
        super(props);
    }
    render() {
        return(
            <footer className="footer">
                <p className="text-center">这是网站底部</p>
            </footer>
        )
    }
}
export default Footer
