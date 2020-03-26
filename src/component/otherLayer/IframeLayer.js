import React, { Component } from 'react';
class IframeLayer extends Component {
    constructor(props) {
        super(props);
        this.state = { 
        }
    }

    render() { 
       let layerData = this.props.layerData;
        return ( 
            <iframe
            className='iframeObj'
            src={layerData&&layerData.iframeUrl ? layerData.iframeUrl : ''}
            height='100%'
            width='100%'></iframe>
         );
    }
}
 
export default IframeLayer;