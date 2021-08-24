/*
 * @Author: your name
 * @Date: 2020-03-13 17:19:16
 * @LastEditTime: 2020-03-26 16:31:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \layout\src\component\otherLayer\RollText.js
 */
import React, { Component } from 'react';
class RollText extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        let layerData = this.props.layerData;
        let playSpeed = layerData.playSpeed;
        let uuid = this.uuid();
        this.update(uuid,playSpeed);
        return (

            <div id={uuid+`bg`} style={{
                height:'100%',
                width:'100%',
                textOverflow: 'clip',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                backgroundColor:layerData.backgroundColor
            }} >
                <div id={uuid}
                    style={{
                        height:'100%',
                        width:'auto',
                       /* textOverflow: 'clip',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',*/
                        position: 'relative',
                        fontSize: layerData&&layerData.fontSize ? layerData.fontSize : '30px',
                        fontFamily: layerData&&layerData.fontFamily ? layerData.fontFamily : 'auto',
                        color: layerData&&layerData.fontColor ? layerData.fontColor : 'rgba(255,255,255,1)',
                        fontWeight: layerData&&layerData.fontWeight ? layerData.fontWeight : 'normal',
                        writingMode:layerData&& layerData.writingMode ? layerData.writingMode : 'horizontal-tb'
                    }}>
                    {
                        layerData&&layerData.textCenter&&layerData.textCenter.value ? layerData.textCenter.value : '滚动文字...'
                    }

                </div>
            </div>
        );

        //this.update(uuid);
    }

    uuid(){
        var s = [];
        var hexDigits = "0123456789abcdefghijklmnopqrstuvwxyz";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
        //s[8] = s[13] = s[18] = s[23] = "-";

        var uuid = s.join("");
        return uuid;
    }
    update(uuid,playSpeed){
        //console.info('update uuid'+uuid);
        var speed = 20;
        function Marquee3() {
            var bg = document.getElementById(uuid+"bg");
            var move = document.getElementById(uuid);
            if (bg&&move){
                var left = move.style.left.substr(0, move.style.left.length-2);
                var l = parseInt(left);

                if (l<=0&&Math.abs(l)<move.offsetWidth){
                    l -=playSpeed;
                    move.style.left = l+"px";
                }else{
                    if (l>=0){
                        l -=playSpeed;
                    }else{
                        l=bg.offsetWidth-2;
                    }
                    move.style.left =l+"px";
                }
            }
        }
        var a = window[''+uuid];
        if (a){
            clearInterval(a);
        }
        var MyMar3 = setInterval(Marquee3, speed);
        window[''+uuid] = MyMar3;
    }
}

export default RollText;
