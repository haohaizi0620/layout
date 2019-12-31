import React, {Component, Fragment} from 'react';
import ReactEcharts from 'echarts-for-react';

class Charts extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div id={this.props.id} style={{
                position: "absolute",
                width: this.props.xWidth + 'px',
                height: this.props.xHeight + 'px',
                left: this.props.xLeft + 'px',
                top: this.props.xTop + 'px'
            }}>
            </div>
        );
    }
}

export default Charts;