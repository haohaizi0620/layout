import React, { Component } from 'react';

class Mytext extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div style={{ position: "absolute", width: this.props.xWidth+'px', height: this.props.xHeight+'px',left:this.props.xLeft+'px',top:this.props.xTop+'px' }}>
                <h1>Hellp</h1>
        </div>
         );
    }
}
 
export default Mytext;