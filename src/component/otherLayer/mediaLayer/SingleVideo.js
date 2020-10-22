/*
 * @Author: your name
 * @Date: 2020-03-13 17:19:16
 * @LastEditTime: 2020-03-26 16:29:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \layout\src\component\otherLayer\SingleVideo.js
 */
import React from 'react';
export default function SingleVideo(props){
  const {url, autoplay,loop, controls, muted} = props.layerData;
   return (
       <video src={url} autoPlay={autoplay} loop={loop} controls={controls} muted={muted} style={{
           height:'100%',
           width:'100%',
           objectFit:'fill'
       }} ></video>
    );
};