import React, {Component} from 'react';
import {Gauge} from '@ant-design/charts';
import request from "../../../api/request";

class GaugeLayer extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        let {url,textCenter,format, font, gauge} = this.props.layerData;
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
        let begin = gauge.beginColor ? gauge.beginColor : 'rgba(180,226,255,1)';
        let end = gauge.endColor ? gauge.endColor : 'rgba(149,152,255,1)';

        var config = {
            percent: percent,
            range: {color: 'l(0) 0:' + begin + ' 1:' + end},
            startAngle: Math.PI,
            endAngle: 2 * Math.PI,
            indicator: null,
            statistic: {
                title: {
                    offsetY: -(font.size+16),
                    style: {
                        fontSize: font.size,
                        color: font.color ? font.color : 'rgba(255,255,255,1)',
                    },
                    formatter: function formatter(_ref) {
                        let percent = _ref.percent*100;
                        let per = parseFloat(percent);
                        per = per.toFixed(2);
                        return per + '%';
                    },
                },
                content: {
                    style: {
                        fontSize: font.size,
                        lineHeight: (font.size+16)+'px',
                        color: font.color ? font.color : 'rgba(255,255,255,1)',
                    },
                    formatter: function formatter() {
                        return format;
                    },
                },
            },
        };
        return (
            <Gauge {...config}/>
        );
    }

    getDataSource(url) {
        return request({
            url: url,
            method: 'get'
        });
    }
}

export default GaugeLayer;