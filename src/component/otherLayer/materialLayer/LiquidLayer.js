import React, {Component} from 'react';
import {Liquid} from '@ant-design/charts';
import request from "../../../api/request";

class LiquidLayer extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        let {url,textCenter, format, font, liquid} = this.props.layerData;
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
        percent = percent/100.00;

        var config = {
            percent: percent,
            statistic: {
                title: {
                    formatter: function formatter() {
                        return format;
                    },
                    style: function () {
                        return {fill: font.color ? font.color : 'rgba(0,0,0,1)'}
                    }
                },
                content: {
                    style: {
                        fontSize: font.size,
                        lineWidth: liquid.lineWidth,
                        fill: font.color ? font.color : 'rgba(0,0,0,1)',
                    },
                }
            },
            liquidStyle: {
                fill: liquid.fill ? liquid.fill : 'rgba(111,149,247,1)',
                fillOpacity: 1,
                stroke: liquid.stroke ? liquid.stroke : 'rgba(88,131,247,1)',
                lineWidth: liquid.lineWidth ? liquid.lineWidth : 1
            }

        };
        return (
            <Liquid {...config}/>
        );
    }

    getDataSource(url) {
        return request({
            url: url,
            method: 'get'
        });
    }
}


async function fetchGet(url) {
    return  await fetch(url).then((res) =>{
        return res.data;
    });

}

export default LiquidLayer;