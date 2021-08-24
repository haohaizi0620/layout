import React, {Component} from 'react';
import {Liquid} from '@ant-design/charts';

class LiquidLayer extends Component {
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
        let {format, font, liquid} = this.props.layerData;
        let percent = this.state.percent / 100.00;
        let config = {
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

}


export default LiquidLayer;
