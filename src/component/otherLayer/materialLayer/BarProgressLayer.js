import React, {Component} from 'react';
import {Progress} from 'antd';

class BarProgressLayer extends Component {
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
            let {url, textCenter} = _this.props.layerData;
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
        let {barProgress} = this.props.layerData;
        return (
            <Progress percent={this.state.percent} status={barProgress.status} strokeColor={barProgress.strokeColor}
                      strokeWidth={barProgress.strokeWidth}/>
        );
    }

}

export default BarProgressLayer;