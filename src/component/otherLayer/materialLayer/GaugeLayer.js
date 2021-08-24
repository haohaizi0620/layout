import React, {Component} from 'react';
import {Gauge} from '@ant-design/charts';

class GaugeLayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            percent: 0
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

        let {url, textCenter} = _this.props.layerData;
        if (url) {
            fetch(url + "?time=" + new Date().getTime()).then(response => response.json())
                .then(data => this.setState({
                    percent: data.value,
                }))
                .catch(e => console.log("error", e));
        } else {
            this.setState({
                percent: textCenter.value,
            })
        }


        _this.timeClose = setInterval(() => {
            let {url} = _this.props.layerData;
            if (url) {
                fetch(url + "?time=" + new Date().getTime()).then(response => response.json())
                    .then(data => this.setState({
                        percent: data.value,
                    }))
                    .catch(e => console.log("error", e));
            }
        }, 1000);
    }

    render() {
        let {format, font, gauge} = this.props.layerData;
        let percent = this.state.percent / 100.00;
        let begin = gauge.beginColor ? gauge.beginColor : 'rgba(180,226,255,1)';
        let end = gauge.endColor ? gauge.endColor : 'rgba(149,152,255,1)';

        let config = {
            percent: percent,
            range: {color: 'l(0) 0:' + begin + ' 1:' + end},
            startAngle: Math.PI,
            endAngle: 2 * Math.PI,
            indicator: null,
            statistic: {
                title: {
                    offsetY: -(font.size + 16),
                    style: {
                        fontSize: font.size,
                        color: font.color ? font.color : 'rgba(255,255,255,1)',
                    },
                    formatter: function formatter(_ref) {
                        let percent = _ref.percent * 100;
                        let per = parseFloat(percent);
                        per = per.toFixed(2);
                        return per + '%';
                    },
                },
                content: {
                    style: {
                        fontSize: font.size,
                        lineHeight: (font.size + 16) + 'px',
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
}

export default GaugeLayer;
