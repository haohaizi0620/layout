/*
 * @Author: your name
 * @Date: 2020-02-19 11:52:23
 * @LastEditTime: 2020-03-20 18:54:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \layout\src\router\router.js
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    HashRouter,
  } from "react-router-dom";
  import '../index.css';
  import ShowPage from '../component/ShowPage' 
  import App from '../App';
//<Route path="/" component={App} />
//<Route   path="/" component={ShowPage} />
const BasicRoute = () => (
    <Router >
        <Switch>
        <Route path="/" component={App} />
        </Switch>
    </Router>
);

  export default BasicRoute;
  
