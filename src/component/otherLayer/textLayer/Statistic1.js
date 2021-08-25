/*
 * @Author: your name
 * @Date: 2020-12-23 10:11:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \layout\src\component\otherLayer\Statistic1.js
 */
import React, {Component} from 'react';
import {Statistic} from 'antd';

class Statistic1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        }
    }

    componentDidMount() {
        this.regular();
    }

    componentWillUnmount() {
        clearInterval(this.timeClose);
    }

    regular() {
        let _this = this;

        let {dataSourceUrl, textCenter} = _this.props.layerData;
        if (dataSourceUrl) {
            fetch(dataSourceUrl+ "?time=" + new Date().getTime()).then(response => response.json())
                .then(data => this.setState({
                    value: data.value,
                }))
                .catch(e => console.log("error", e));
        } else {
            this.setState({
                value: textCenter.value,
            })
        }



        _this.timeClose = setInterval(() => {
            let {dataSourceUrl} = _this.props.layerData;
            if (dataSourceUrl) {
                fetch(dataSourceUrl+ "?time=" + new Date().getTime()).then(response => response.json())
                    .then(data => this.setState({
                        value: data.value,
                    }))
                    .catch(e => console.log("error", e));
            }
        }, 1000);
    }

    render() {
        let {backgroundColor, fontFamily, fontSize, fontColor, fontWeight, textAlign, writingMode, title, precision, prefix, suffix,textCenter,url} = this.props.layerData;
        let value = textCenter.value;
        if (url){
            value = this.state.value;
        }
        return (
            <Statistic
                title={title}
                value={value}
                precision={precision}
                valueStyle={{
                    color: fontColor,
                    fontSize: fontSize,
                    backgroundColor: backgroundColor,
                    fontFamily: fontFamily,
                    fontWeight: fontWeight,
                    textAlign: textAlign,
                    writingMode: writingMode
                }}
                prefix={prefix}
                suffix={suffix}
            />
        );
    }
}

export default Statistic1;
