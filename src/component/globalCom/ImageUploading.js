/*
 * @Author: your name
 * @Date: 2020-02-11 18:42:33
 * @LastEditTime: 2020-03-26 14:15:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \layout\src\component\globalCom\ImageUploading.js
 */
import { Upload, Icon, message } from 'antd';
import React from 'react'
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('您只能上传JPG/PNG图片!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('图片必须小于 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

class ImageUploading extends React.Component {
  state = {
    loading: false,
  };

  /**
   * @description: 模仿点击上传按钮
   * @param {type}
   * @return:
   */
  imitationClick() {
    this.refs.upload.click();
  }

  /**
   * @description: 将图片源置空,和展示页面没关系
   * @param {type}
   * @return:
   */
  deleteImageUrl() {
    this.setState({
      imageUrl: '',
      loading: false,
    })
  }

  /**
   * @description: 上传文件成功,并通知上层组件图表改变
   * @param {type}
   * @return:
   */
  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }, () => {
          this.props.setShowPreview(imageUrl,this.props.ename);
        }),
      );
    }
  };

  render() {
    return (
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        //action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        beforeUpload={beforeUpload}
        onChange={this.handleChange}>
          <div   ref="upload" ></div>
      </Upload>
    );
  }
}

export default ImageUploading