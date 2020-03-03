import React from 'react'
import ReactDOM from 'react-dom';
import './css/EditItemModal.css';
import { Modal, Button } from 'antd';
import EditItemConfig from './EditItemConfig';
class EditItemModal extends React.Component {
    constructor() {
        super();
        this.state = {
            editAffirmFlag: false, //控制是否显示删除提示框
            editIndex: -1, //用来表示当前删除的是哪个id,方便提示框之后处理.
            editItemOption:[],//当前展示的图层的数据
            chartsObj:[],//当前组件基本信息
        } 
    }
   
    setDefaultValue(layerIndex,editItemOption,tempChart){
        this.setState({
            editAffirmFlag: true,
            editIndex: layerIndex,
            editItemOption:editItemOption,
            chartsObj:tempChart,
        },() => {
         
        })
    }


    deleteAffirmCancel = e => {
        this.setState({
          editAffirmFlag: false
        });
      };
    
    deleteAffirmOk = e => {   
        let chartObj = this.props.ChartDatas[this.state.editIndex];   
         let editJson = this.refs.editItemmConfig.getEditJson(chartObj);
        this.setState(
          {
            editAffirmFlag: false
          },
          () => {
           this.props.editItem(this.state.editIndex,editJson);
          }
        ); 
      };


    render() {
        return (
            <Modal
            title='编辑当前组件'
            visible={this.state.editAffirmFlag}
            onOk={this.deleteAffirmOk}
            onCancel={this.deleteAffirmCancel}
            footer={[
              <Button key='back' onClick={this.deleteAffirmCancel}>
                取消
              </Button>,
              <Button key='submit' type='primary' onClick={this.deleteAffirmOk}>
                确认
              </Button>
            ]}>
            <div>
              <EditItemConfig
                  ref="editItemmConfig"
                  editItemOption={this.state.editItemOption}
                />
            </div>
          </Modal>
        )
    }
}


export default EditItemModal
