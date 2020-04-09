/*
 * @Author: your name
 * @Date: 2020-03-13 17:19:16
 * @LastEditTime: 2020-03-26 16:29:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \layout\src\component\otherLayer\SingleImage.js
 */
import React from 'react';
export default function SingleImage(props){
  const {urlConfig,backgroundImage,radius,repeat} = props.layerData;
  const {url,ifBlank} = urlConfig;
   return ( 
       <div
       style={{
         height:'100%',
         width:'100%',
         backgroundImage: `url(${backgroundImage})`,
         borderRadius: `${radius}px`,
         backgroundRepeat: repeat,
         imageRendering: '-webkit-optimize-contrast',
         backgroundSize: '100% 100%'
       }}>
         <a  
           src={url ? url : ''}
           target={ifBlank ? '_blank' : '_self'}
           style={{
             display: 'block',
             width: '100%',
             height: '100%'
         }} />
       </div>
    );
};