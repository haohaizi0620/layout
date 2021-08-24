import React from 'react'
//import ReactDOM from 'react-dom';
import './css/DeleteItemModal.scss';
import { Modal, Button } from 'antd';
class DeleteItemModal extends React.Component {
    constructor() {
        super();
        this.state = {
            deleteAffirmFlag: false, //控制是否显示删除提示框
            delIndex: -1, //用来表示当前删除的是哪个id,方便提示框之后处理.
        }
    }

    setDefaultValue(layerIndex){
        this.setState({
            deleteAffirmFlag: true,
            delIndex: layerIndex
        })
    }


    deleteAffirmCancel = e => {
        this.setState({
          deleteAffirmFlag: false
        });
      };

    deleteAffirmOk = e => {
        this.setState(
          {
            deleteAffirmFlag: false
          },
          () => {
            this.props.delItem(this.state.delIndex);
          }
        );
      };


    render() {
        return (
            <Modal
            title='确认删除组件'
            visible={this.state.deleteAffirmFlag}
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
            <div>是否删除选中的一个组件</div>
          </Modal>
        )
    }
}


export default DeleteItemModal
