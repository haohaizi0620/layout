/*
 * @Author: your name
 * @Date: 2020-02-19 11:52:23
 * @LastEditTime: 2020-02-20 11:34:03
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


const BasicRoute = () => (
    <Router >
        <Switch>
          <Route exact  path="/test/:showData" component={ShowPage} />
          <Route path="/" component={App} />
        </Switch>
    </Router>
);

  export default BasicRoute;
  
