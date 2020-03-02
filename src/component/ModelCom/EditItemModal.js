import React from 'react'
import ReactDOM from 'react-dom';
import './css/EditItemModal.css';
import { Modal, Button } from 'antd';
class EditItemModal extends React.Component {
    constructor() {
        super();
        this.state = {
            editAffirmFlag: false, //控制是否显示删除提示框
            editIndex: -1, //用来表示当前删除的是哪个id,方便提示框之后处理.
        } 
    }
   
    setDefaultValue(layerIndex){
        this.setState({
            editAffirmFlag: true,
            editIndex: layerIndex
        })
    }


    deleteAffirmCancel = e => {
        this.setState({
          editAffirmFlag: false
        });
      };
    
    deleteAffirmOk = e => {
        this.setState(
          {
            editAffirmFlag: false
          },
          () => {
            this.props.editItem(this.state.editIndex);
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

            </div>
          </Modal>
        )
    }
}


export default EditItemModal
