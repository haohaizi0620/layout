/*
 * @Author: your name
 * @Date: 2020-01-06 14:09:04
 * @LastEditTime : 2020-01-06 14:10:14
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \one-react\src\redux\actions\counter.js
 */
export const INCREMENT = "counter/INCREMENT";
export const DECREMENT = "counter/DECREMENT";
export const RESET = "counter/RESET";

export function increment() {
    return {type: INCREMENT}
}

export function decrement() {
    return {type: DECREMENT}
}

export function reset() {
    return {type: RESET}
}