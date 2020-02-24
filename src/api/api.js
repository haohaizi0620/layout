import {request} from "./request";
import serviceUrl from './serviceAPI.config';
import Qs from 'qs';
export function selectGetOneMainLayer(index){
    return request(serviceUrl.selectGetOneMainLayer+"/"+index,{method:'GET',mode: "cors"})
}
export function selectPostOneMainLayer(data){
    return  request(serviceUrl.selectPostOneMainLayer, {method: 'POST',body: Qs.stringify(data) });
}
//接口2方法
export function addMainLayer(data){
    return request(serviceUrl.addMainLayer, {method: 'POST',body: Qs.stringify(data) });
}
