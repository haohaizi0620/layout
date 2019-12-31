import React, { Component } from 'react';
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
const Map = ReactMapboxGl({
    accessToken: "pk.eyJ1Ijoic25vd2ZsYWtlMTEiLCJhIjoiY2plZHY1MzIyMDRkZjJ4cXVkenc0N2llcCJ9.YRhx7NDp9QAMNfOkdf3nFA"
});
class Mymap extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (

            <div style={{ position: "absolute", width: this.props.xWidth+'px', height: this.props.xHeight+'px',left:this.props.xLeft+'px',top:this.props.xTop+'px' }}>
               <Map
                style="mapbox://styles/mapbox/streets-v9"
                containerStyle={{
                    height: this.props.xWidth+'px',
                    width: this.props.xHeidth+'px'
                }}>
                <Layer
                    type="symbol"
                    id="marker"
                    layout={{ "icon-image": "marker-15" }}>
                    <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
                </Layer>
             </Map>
            </div>
            
        );
    }
}

export default Mymap;