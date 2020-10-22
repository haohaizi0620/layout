/*
 * @Author: your name
 * @Date: 2020-03-13 17:19:16
 * @LastEditTime: 2020-03-26 16:29:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \layout\src\component\interactionLayer\Button.js
 */
import React from 'react';
export default function Button(props){
  const {text, bgcolor,font, hyperlink} = props.layerData;
  const {url,isNewWindow} = hyperlink;
   return (

       <a
           src={url ? url : ''}
           target={isNewWindow ? '_blank' : '_self'}
           style={{
               display: 'block',
               width: '100%',
               height: '100%'
           }} >
           <div  style={{
               height:'100%',
               width:'100%',
               backgroundColor:bgcolor,
               fontFamily:font.family,
               color:font.color,
               fontSize:font.size,
               fontWeight:font.weight,
               textAlign:font.textAlign,
               writingMode:font.writingMode
           }} >{text}</div>
      </a>

    );
};