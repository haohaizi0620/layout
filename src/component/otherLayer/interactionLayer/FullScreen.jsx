/*
 * @Author: your name
 * @Date: 2020-03-20 10:53:15
 * @LastEditTime: 2020-03-24 19:27:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \layout\src\component\otherLayer\BaseTable.js
 */
import React, { Component } from "react";
import fontawesome from "@fortawesome/fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCompress,
  faExpand,
} from "@fortawesome/fontawesome-free-solid";
fontawesome.library.add(faCompress,faExpand);
class FullScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
       flag:-1,
       UiData:[
         {
           icon:faExpand,
           flag:-1,
           setFlag:1
         },
         {
          icon:faExpand,
          flag:1,
          setFlag:-1
        }
       ]
    };
  }
  updateFullScreenState = (flag) =>{
    this.setState({flag},() => {
      this.updateState();
    })
  }
 updateState() {
    let {flag} = this.state;
    var docElm = window.parent.document.documentElement;
    var docElmD = document.documentElement;
    if (flag === 1) {
      if (docElmD.requestFullscreen) {
        // W3C
        docElm.requestFullscreen();
      } else if (docElmD.mozRequestFullScreen) {
        // FireFox
        docElm.mozRequestFullScreen();
      } else if (docElmD.webkitRequestFullScreen) {
        // Chrome等
        docElm.webkitRequestFullScreen();
      } else if (docElmD.msRequestFullscreen) {
        // IE11
        docElm.msRequestFullscreen();
      }
    } else if(flag === -1){
      if (document.exitFullscreen) {
        window.parent.document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        window.parent.document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        window.parent.document.webkitCancelFullScreen();
      } else if (document.msExitFullscreen) {
        window.parent.document.msExitFullscreen();
      }
    }
  }

  render() {
    let {flag,UiData} = this.state;
    let {color,size} = this.props.layerData;
    return (
      <>
        {
           UiData.map(item => {
             let {icon,flag:FlagVal,setFlag} = item;
             if(flag === FlagVal){
              return (
                <FontAwesomeIcon icon={icon}  style={{
                  color:color,
                  fontSize:size+'px'
                }}  onClick={this.updateFullScreenState.bind(this,setFlag)}  />
              );
             }
           })
        }
      </>
    )
  }
}

export default FullScreen;
