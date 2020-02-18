/*
 * @Author: your name
 * @Date: 2020-01-06 14:08:58
 * @LastEditTime : 2020-01-07 15:05:14
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \one-react\src\redux\reducers\counter.js
 */
import {INCREMENT, DECREMENT, RESET} from '../actions/counter';

/*
* 初始化state
 */

const initState = {
    count: 0
};
/*
* reducer
 */
export default function reducer(state = initState, action) {
    switch (action.type) {
        case INCREMENT:
            return {
                count: state.count + 1
            };
        case DECREMENT:
            return {
                count: state.count - 1
            };
        case RESET:
            return {count: 0};
        default:
            return state
    }
}