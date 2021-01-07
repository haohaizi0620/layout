import React, {Component} from 'react';
import {Progress} from 'antd';
import request from "../../../api/request";

class BarProgressLayer extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        let {url,textCenter, barProgress} = this.props.layerData;
        let percent;
        if (url) {
            let result = this.getDataSource(url);
            Promise.all([result]).then((results) => {
                if (results) {
                    let res = results[0];
                    textCenter.value = res.value;
                }
            });
        }
        percent = textCenter.value;
        return (
            <Progress percent={percent} status={barProgress.status} strokeColor={barProgress.strokeColor}
                      strokeWidth={barProgress.strokeWidth}/>
        );
    }

    getDataSource(url) {
        return request({
            url: url,
            method: 'get'
        });
    }
}

export default BarProgressLayer;