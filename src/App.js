/*
 * @Author: your name
 * @Date: 2020-01-07 09:25:24
 * @LastEditTime : 2020-02-11 14:14:07
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \layout\src\App.js
 */
import React, {  Fragment } from 'react';
import ReactDome from 'react-dom';
import Layout from './component/Layout';

function App() {
    var script1 = document.createElement('script');
    script1.type = 'text/javascript';
    script1.async = true;
    // script1.src = 'http://172.24.254.94:8082/TileServer/dmapgl/dmap-gl-dev.js';
    script1.src = 'http://localhost/kshCharsTempJs/dmap-gl-dev.js';
    document.head.appendChild(script1);

    var script2 = document.createElement('script');
    script2.type = 'text/javascript';
    script2.async = true;
    // script2.src = 'http://172.24.254.94:8082/TileServer/dmapgl/echarts.min.js';
    script2.src = 'http://localhost/kshCharsTempJs/echarts.min.js';
    document.head.appendChild(script2);

    var script3 = document.createElement('script');
    script3.type = 'text/javascript';
    script3.async = true;
    // script3.src = 'http://172.24.254.94:8082/TileServer/dmapgl/EchartsLayer.js';
    script3.src = 'http://localhost/kshCharsTempJs/EchartsLayer.js';
    document.head.appendChild(script3);

    var script4 = document.createElement('script');
    script4.type = 'text/javascript';
    script4.async = true;
    // script4.src = 'http://172.24.254.94:8082/TileServer/dmapgl/ehcartsgl.min.js';
    script4.src = 'http://localhost/kshCharsTempJs/ehcartsgl.min.js';
    document.head.appendChild(script4);

    var script5 = document.createElement('script');
    script5.type = 'text/javascript';
    script5.async = true;
    // script5.src = 'http://172.26.50.89/TileServer/dmapgl/dmapgl.js';
    script5.src = 'http://localhost/kshCharsTempJs/dmapgl.js';
    document.head.appendChild(script5);

    /* var script6 = document.createElement('script');
    script6.type = 'text/javascript';
    script6.async = true;
    // script6.src = 'http://172.26.50.89/TileServer/dmapgl/dmapgl.js';
    script6.src = 'http://localhost/kshCharsTempJs/dmap4.0.js';
    document.head.appendChild(script6); */


    return (
        <Fragment>
            <Layout />
        </Fragment>
    );
}

export default App;
