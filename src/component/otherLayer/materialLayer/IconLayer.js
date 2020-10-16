import React, {Component} from 'react';
import fontawesome from "@fortawesome/fontawesome";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class IconLayer extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        let { iconColor, iconImage} = this.props.layerData;
        return (
            <FontAwesomeIcon icon={iconImage} style={{width:"100%",height:"100%"}} color={iconColor}/>
        );
    }
}

export default IconLayer;