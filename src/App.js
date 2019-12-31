import React, {  Fragment } from 'react';
import ReactDome from 'react-dom';
import Layout from './component/Layout';

function App() {
    var script1 = document.createElement('script');
    script1.type = 'text/javascript';
    script1.async = true;
    script1.src = 'http://172.24.254.94:8082/TileServer/dmapgl/dmap-gl-dev.js';
    document.head.appendChild(script1);

    var script2 = document.createElement('script');
    script2.type = 'text/javascript';
    script2.async = true;
    script2.src = 'http://172.24.254.94:8082/TileServer/dmapgl/echarts.min.js';
    document.head.appendChild(script2);

    var script3 = document.createElement('script');
    script3.type = 'text/javascript';
    script3.async = true;
    script3.src = 'http://172.24.254.94:8082/TileServer/dmapgl/EchartsLayer.js';
    document.head.appendChild(script3);

    var script4 = document.createElement('script');
    script4.type = 'text/javascript';
    script4.async = true;
    script4.src = 'http://172.24.254.94:8082/TileServer/dmapgl/ehcartsgl.min.js';
    document.head.appendChild(script4);

    return (
        <Fragment>
            <Layout />
        </Fragment>
    );
}

export default App;
