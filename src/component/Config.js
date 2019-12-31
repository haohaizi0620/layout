import './Config.css';
import React, {Component, Fragment} from 'react';
import Properties from './Properties'

class Config extends Component {
    constructor(props) {
        console.info(props);
        super(props);
    }

    changeProperties(props) {
        this.props.changeProperties(props);
    }

    render() {
        return (
            <Fragment>
                <div className="control-panel">
                    <div className="control-panel-header">控制面板，当前操作组件下标：{this.props.cptIndex}</div>
                    <div className="control-panel-container">
                        <Properties param={this.changeProperties.bind(this)}
                                           controlPropertyObj={this.props.controlPropertyObj}
                                           cptIndex={this.props.cptIndex}></Properties>
                    </div>
                </div>
            </Fragment>
        )
    }
}
export default Config;