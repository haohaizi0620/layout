/*
 * @Author: your name
 * @Date: 2020-03-13 17:19:16
 * @LastEditTime: 2020-03-26 16:31:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \layout\src\component\otherLayer\SingleRowText.js
 */
import React, { Component } from 'react';
class SingleRowText extends Component {
    constructor(props) {
        super(props);
        this.state = { 
         }
    }
    render() { 
       let layerData = this.props.layerData;
        return ( 
            <div
            style={{
              height:'100%',
              width:'100%',
              textOverflow: 'clip',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              fontSize: layerData&&layerData.fontSize ? layerData.fontSize : '30px',
              fontFamily: layerData&&layerData.fontFamily ? layerData.fontFamily : 'auto',
              color: layerData&&layerData.fontColor ? layerData.fontColor : 'rgba(255,255,255,1)',
              fontWeight: layerData&&layerData.fontWeight ? layerData.fontWeight : 'normal',
              writingMode:layerData&& layerData.writingMode ? layerData.writingMode : 'horizontal-tb'
            }}>
                {
                    layerData&&layerData.hyperlinkCenter
                    ?<a src={layerData&&layerData.hyperlinkCenter ? layerData.hyperlinkCenter : ''}
                        className={'textLayer'}
                        target={layerData&&layerData.isNewWindow ? '_blank' : '_self'}>
                        {layerData&&layerData.textCenter&&layerData.textCenter.value ? layerData.textCenter.value : '标题'}
                        </a>
                    :layerData&&layerData.textCenter&&layerData.textCenter.value ? layerData.textCenter.value : '标题'
                }
            </div>
         );
    }
}

export default SingleRowText;