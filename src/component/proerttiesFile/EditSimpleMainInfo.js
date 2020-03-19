import React, { Component } from 'react';
import ReactColor from '../globalCom/SketchColor.js';
import ImageUploading from '../globalCom/ImageUploading';
import JSONInput from 'react-json-editor-ajrm';
import locale    from 'react-json-editor-ajrm/locale/en';
import {
  Input,
  InputNumber,
  Slider,
  Col,
  Row,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Checkbox,
  Button,
  AutoComplete,
  Switch
} from 'antd';
import 'antd/dist/antd.css';
import './singleProperties.scss';
const { Option } = Select;
const { TextArea } = Input;
class EditSimpleMainInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showImageOptionFlag: false
    };
  }
  
  render() {
    let showData = this.props.childer;
    var defaultOneColVal = 6;
    var defaultTwoColVal = 18;
    let oneClassName = "";
    if (this.props.includeSelectFlag) {
      //当前的childer的
      defaultOneColVal = 0;
      defaultTwoColVal = 24;
    }
    if (this.props.updateArrFlag) {
      showData = [showData];
    }
    if(showData.length==1){
       oneClassName = "pro-item-single";
    }
    return (
      <Row>
        <Col span={defaultOneColVal}>
          <span>{this.props.name}</span>
        </Col>
        <Col span={defaultTwoColVal}>
          {showData.map((item, i) => {
            let itemType = item.type;
            if (itemType == 'InputNumber') {
              return (
                <div className={oneClassName+' pro-item-simple'} >
                  <InputNumber
                    size='small'
                    min={item.minNumber}
                    max={item.maxNumber}
                    onChange={event => {
                      this.updateChartField(event, item.ename);
                    }}
                    value={typeof item.value === 'number' ? item.value : 0}
                  />
                  {
                    showData.length>1?
                    <span>{item.cname}</span>
                    :null
                  }
                </div>
              );
            } else if (itemType == 'Slider') {
              let showVal = item.value;
              if(!showVal){
                showVal = 0;
              }
              if (typeof(showVal) == "number"&&showVal<0)
              {
                showVal = 0;
              }
              return (
                <div>
                  <div className='pro-item-simple pro-item-slider'>
                    <Slider
                      min={item.minNumber}
                      max={item.maxNumber}
                      step={item.step}
                      onChange={event => {
                        this.updateChartField(event, item.ename);
                      }}
                      value={typeof item.value === 'number' ? item.value : 0}
                    />
                  </div>
                  <div className='pro-item-simple pro-item-number'>
                    <InputNumber
                      size='small'
                      min={item.minNumber}
                      max={item.maxNumber}
                      step={item.step}
                      value={typeof item.value === 'number' ? item.value : 0}
                      onChange={event => {
                        this.updateChartField(event, item.ename);
                      }}
                    />
                  </div>
                </div>
              );
            } else if (itemType == 'Color') {
              return (
                <div className={oneClassName+' pro-item-simple'}>
                  <ReactColor
                    key={item.ename}
                    colorVal={item.value}
                    setBgColor={this.setBgColor.bind(this, item.ename)}
                  />
                </div>
              );
            } else if (itemType == 'ImageUploading') {
              return (
                <div className={oneClassName+' pro-item-simple'}>
                  <div
                    className='previewImage'
                    onMouseEnter={this.handleMouseEnter.bind(this)}
                    onMouseLeave={this.handleMouseLeave.bind(this)}
                    style={{
                      backgroundImage: `url(${item.value})`,
                      backgroundSize: '100% 100%'
                    }}>
                    {
                      // item.value?<img src={item.value}  id="previewImageObj"  style={{ width: '100%',height:'auto',padding: '20px 20px'}} />:true
                    }
                    {this.state.showImageOptionFlag ? (
                      <div className='previewOption'>
                        <span className='previewOptionText'>
                          <span onClick={this.setUploadPageBg.bind(this)}>更改</span>|
                          <span onClick={this.deletePageBg.bind(this)}>删除</span>
                        </span>
                      </div>
                    ) : (
                      true
                    )}
                  </div>
                  <div style={{ display: 'none' }}>
                    <ImageUploading
                      ref='ImageUploading'
                      key={item.ename}
                      colorVal={item.value}
                      setShowPreview={this.setShowPreview.bind(this)}
                    />
                  </div>
                </div>
              );
            } else if (itemType == 'Input') {
              return (
                <div className={oneClassName+' pro-item-simple'}>
                  <Input
                    placeholder={item.placeholder}
                    key={item.ename}
                    disabled={item.disabled ? item.disabled : false}
                    onChange={event => {
                      this.updateChartField(event.target.value, item.ename);
                    }}
                    value={item.value}
                  />
                </div>
              );
            } else if (itemType == 'Select') {
              return (
                <div className={oneClassName+' pro-item-simple'}>
                  <Select
                    size='small'
                    key={item.ename}
                    value={item.value}
                    showSearch
                    placeholder='Select a person'
                    optionFilterProp='children'
                    onChange={event => {
                      this.updateChartField(event, item.ename);
                    }}
                    filterOption={(input, option) =>
                      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }>
                    {item.optionValues.map(optionItem => {
                      let bgImg =  optionItem.src;
                      return <Option value={optionItem.value}>
                             {
                               bgImg?<img   width="30" height="20"  src={require('../../img/'+bgImg)}   />:null
                             }
                            {optionItem.cname}
                        </Option>;
                    })}
                  </Select>
                </div>
              );
            } else if (itemType == 'Switch') {
              return (
                <div className={oneClassName+' pro-item-simple'}>
                  <Switch
                    onChange={event => {
                      this.updateChartField(event, item.ename);
                    }}
                  />
                </div>
              );
            } else if (itemType == 'TextArea') {
              return (
                <div className={oneClassName+' pro-item-simple'}>
                  <TextArea
                    value={item.value}
                    placeholder={item.placeholder}
                    onChange={event => {
                      this.updateChartFieldPrev(event, item.ename);
                    }}
                  />
                </div>
              );
            } else if (itemType == 'JsonShow') {
              return (
                <div className={oneClassName+' pro-item-simple'}>
                  <pre style={{ maxHeight: '200px', outline: '1px solid white' }}>
                    <code id='json'>{JSON.stringify(item.value, null, '  ')}</code>
                  </pre>
                </div>
              );
            } else if(itemType == "EditJsonReactAjrm"){
              let isEdit = item.isEdit;
              let editJsonId = 'edit-json-react-ajrm-edit'
              if(!isEdit){
                editJsonId = 'edit-json-react-ajrm-noEdit'
              }
              return (
                <div className='pro-item-simple-block pro-item-simple'  >
                  <span>{item.cname}</span>
                      <JSONInput
                        id          = {editJsonId}
                        placeholder = { item.value }
                        locale      = { locale }
                        height      = '300px'
                        width       = '400px'
                        onChange={this.editJsonChange}
                        onChange={event => {
                          this.editJsonChange(event, item.ename);
                        }}
                        viewOnly = {!isEdit}
                      />
                </div>
              )
            }else if (itemType == 'noContent') {
              return (
                <div className={oneClassName+' pro-item-simple'}>
                  <span>暂无数据</span>
                </div>
              );
            } 
          })}
        </Col>
      </Row>
    );
  }



  /**
   * @description: 鼠标进入图片预览的里面显示选项文本
   * @param {type}
   * @return:
   */
  handleMouseEnter = e => {
    this.updateImagePreView(true);
  };
  /**
   * @description:  鼠标推出图片预览的里面显示选项文本
   * @param {type}
   * @return:
   */
  handleMouseLeave = e => {
    this.updateImagePreView(false);
  };

  updateImagePreView(Imageflag) {
    this.setState({
      showImageOptionFlag: Imageflag
    });
  }

  deletePageBg() {
    this.props.deletePageBg();
    this.refs.ImageUploading.deleteImageUrl();
  }

  setUploadPageBg() {
    this.refs.ImageUploading.imitationClick();
  }

  setShowPreview(imageUrl) {
    this.props.setShowPreview(imageUrl);
  }

  /**
   * @description:  给画布设置背景颜色
   * @param {string}  colorObj  是一个rgba值
   * @return:
   */
  setBgColor(eName, colorObj) {
    this.props.setBgColor(eName, colorObj);
  }
  /**
   * @description: 在编辑面板上面修改一个单独的值,进行调用
   * @param {type}
   * @return:
   */
  updateChartField(fieldValue, fieldEname) {
    this.props.updateThisCharsField(fieldValue, fieldEname);
  }

  updateChartFieldPrev(event, fieldEname) {
    this.updateChartField(event.target.value, fieldEname);
  }

  updateChartFieldPrevEditJson(event, fieldEname) {
    this.updateChartField(event.updated_src, fieldEname);
  }

  editJsonChange = (event,fieldEname) =>{
    if(event.error)
      return;
    let jsonStr = event.json;
    let jsonObj = event.jsObject;
    this.updateChartField(event.jsObject, fieldEname);
  }
  text(f, a) {
    let s = f;
  }
}

export default EditSimpleMainInfo;
