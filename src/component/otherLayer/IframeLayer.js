import React, { Component } from 'react';
class IframeLayer extends Component {
    constructor(props) {
        super(props);
        this.state = { 
        }
    }

    render() { 
       let chartData = this.props.chartData;
        return ( 
            <iframe
            className='iframeObj'
            src={chartData&&chartData.iframeUrl ? chartData.iframeUrl : ''}
            height='100%'
            width='100%'></iframe>
         );
    }
}
 
export default IframeLayer;