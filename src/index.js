import ReactDom from 'react-dom';
import React from "react";
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config'
import { HashRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

import routes from "./router";
import store from './store/index';
import './style/index.less'

ReactDom.render(
    <Provider store={store}>
        <HashRouter>
            {renderRoutes(routes)}
        </HashRouter>
    </Provider>
    , document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
