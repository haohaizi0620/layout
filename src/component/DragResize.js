import React,{Component} from 'react';
import ReactDom from 'react-dom';
import { Resizable, ResizableBox } from 'react-resizable';

export default class DragResize extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <ResizableBox width={200} height={200} 
            minConstraints={[100, 100]} maxConstraints={[300, 300]}>
          <span>Contents</span>
        </ResizableBox>
        )
    }
}
