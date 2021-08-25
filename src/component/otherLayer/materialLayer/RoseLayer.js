import React, {Component} from 'react';
import {Rose} from '@ant-design/charts';

class RoseLayer extends Component {
    constructor(props) {
        super(props);
        console.info(this);
        this.state = {
            value: ""
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
                    value: data.value,
                }))
                .catch(e => console.log("error", e));
        } else {
            this.setState({
                value: textCenter.value,
            })
        }


        _this.timeClose = setInterval(() => {
            let {url} = _this.props.layerData;
            if (url) {
                fetch(url + "?time=" + new Date().getTime()).then(response => response.json())
                    .then(data => this.setState({
                        value: data.value,
                    }))
                    .catch(e => console.log("error", e));
            }
        }, 1000);
    }

    render() {
        let {positionObj, font,rose,url,textCenter} = this.props.layerData;
        let data = textCenter.value;
        if (url){
            data = this.state.value;
        }


        var config = {
            width: parseInt(positionObj.cptBorderObj.width),
            height: parseInt(positionObj.cptBorderObj.height),
            autoFit: true,
            xField: 'name',
            yField: 'value',
            seriesField: 'type',
            data: data === ''?[{"name":"分类一","value":27,"type":"分类一"},{"name":"分类二","value":25,"type":"分类二"},{"name":"分类三","value":18,"type":"分类三"},{"name":"分类四","value":15,"type":"分类四"},{"name":"分类五","value":10,"type":"分类五"},{"name":"其他","value":5,"type":"其他"}]:data,
            innerRadius: rose.innerRadius ? rose.innerRadius : 0,
            radius: rose.radius ? rose.radius : 1,
            label: {
                style: {
                    fill: font.color ? font.color : 'rgba(255,255,255,1)',
                    opacity: 1,
                    fontSize: font.size ? font.size : 16,
                }
            },
            legend: {
                itemName: {
                    style: {
                        fill: font.color ? font.color : 'rgba(255,255,255,1)',
                        opacity: 1,
                        fontSize: font.size ? font.size : 16,
                    }
                },
            }
        };
        return (
            <Rose {...config}/>
        );
    }
}

export default RoseLayer;
