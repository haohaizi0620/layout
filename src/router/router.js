/*
 * @Author: your name
 * @Date: 2020-02-19 11:52:23
 * @LastEditTime: 2020-03-27 19:26:09
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

  import typeObj from '../router/type';
  let model;
  if ("/data/" == typeObj.project){
    model = App;
  }else {
    model = ShowPage;
  }
//<Route path="/" component={App} />
//<Route   path="/" component={ShowPage} />
const BasicRoute = () => (
    <Router >
        <Switch>
          <Route path="/" component={model} />
        </Switch>
    </Router>
);

  export default BasicRoute;

