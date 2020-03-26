/*
 * @Author: your name
 * @Date: 2020-03-09 15:40:08
 * @LastEditTime: 2020-03-26 15:46:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \layout\src\component\ModelCom\ShareItemModal.js
 */
import React from 'react'
import { Modal, Button } from 'antd';
class ShareItemModal extends React.Component {
    constructor() {
        super();
        this.state = {
            shareAffirmFlag: false, //控制是否显示删除提示框
            shareUrl:''
        } 
    }
   
    setDefaultValue(shareUrl){
        this.setState({
            shareAffirmFlag: true,
            shareUrl:shareUrl,
        })
    }


    shareAffirmCancel = e => {
        this.setState({
          shareAffirmFlag: false
        });
      };
    
    shareAffirmOk = e => {
        this.setState(
          {
            shareAffirmFlag: false
          },
          () => {
            this.props.saveShowPageData();
          }
        );
      };


    render() {
        let {shareAffirmFlag,shareUrl} = this.state;
        return (
            <Modal
            title='是否进行预览当前分享'
            visible={shareAffirmFlag}
            onOk={this.shareAffirmOk}
            onCancel={this.shareAffirmCancel}
            footer={[
              <Button key='back' onClick={this.shareAffirmCancel}>
                取消
              </Button>,
              <Button key='submit' type='primary' onClick={this.shareAffirmOk}>
                确认
              </Button>
            ]}>
              <span>{shareUrl}</span>
          </Modal>
        )
    }
}


export default ShareItemModal;
