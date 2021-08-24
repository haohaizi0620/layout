import React, { Component } from 'react';
import ReactColor from '../globalCom/SketchColor.js';
import ImageUploading from '../globalCom/ImageUploading';
import JSONInput from 'react-json-editor-ajrm';
import locale    from 'react-json-editor-ajrm/locale/en';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  Input,
  InputNumber,
  Slider,
  Col,
  Row,
  //Tooltip,
  //Icon,
  //Cascader,
  Select,
  //Checkbox,
  //Button,
  //AutoComplete,
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

  componentDidMount(){
    let inputNumber = document.getElementsByClassName("ant-input-number-handler");
    if(inputNumber){
      for(let element of inputNumber){
        element.onclick = this.simulationInputNumberClick
      }
    }
  }


 simulationInputNumberClick = event => {
    let target = event.target;
    let tagName = target.tagName.toLowerCase();
    let InputNumber = target.parentElement;
    let spanElement = target;
    if(tagName === "svg"){
      InputNumber = InputNumber.parentElement.parentElement;
      spanElement = target.parentElement.parentElement;
    }
    let className = spanElement.classList[1];
    let value = parseInt(InputNumber.nextElementSibling.firstElementChild.value);
    if(className==="ant-input-number-handler-up"){
      value++;
    }else if(className==="ant-input-number-handler-down"){
      value--;
    }
    let ename = InputNumber.parentElement.previousSibling.innerText;
    this.updateChartField(value,ename)
  }

  render() {
    let showData = this.props.childer;
    var defaultOneColVal = 6;
    var defaultTwoColVal = 18;
    let oneClassName = "";
    /* if (this.props.includeSelectFlag) {
      //当前的childer的
      defaultOneColVal = 0;
      defaultTwoColVal = 24;
    } */
    if (!showData){
        return false;
    }

    if (this.props.updateArrFlag) {
      showData = [showData];
    }
    if(showData.length===1){
       oneClassName = "pro-item-single";
    }
    //console.info(showData[0].type);
    if(showData&&showData.length>0&&showData[0].type === 'EditJsonReactAjrm'){
        defaultOneColVal = 0;
        defaultTwoColVal = 24;
    }

      //排除不播放属性
      if (showData.length === 2&&(showData[1].ename === 'dataSourceUrlFlag'||showData[1].ename === 'titleFlag'||showData[1].ename === 'playFlag'||showData[1].ename === 'precisionFlag'||showData[1].ename === 'prefixFlag'||showData[1].ename === 'suffixFlag')){
          if (showData[1].value === false){
              return false;
          }else{
              oneClassName = "pro-item-single";
          }
      }
    return (
      <Row>
        <Col span={defaultOneColVal}>
          <span>{this.props.name}</span>
        </Col>
        <Col span={defaultTwoColVal}>
          {showData.map((item, i) => {
            let itemType = item.type;
            if (itemType === 'InputNumber') {
              return (
                <div key={i} className={oneClassName+' pro-item-simple'}  >
                   <span className="pro-item-simple-close" >{item.ename}</span>
                  <InputNumber
                    size='small'
                    min={item.minNumber}
                    max={item.maxNumber}
                    data-ename={item.ename}
                    onBlur={event => {
                      this.updateChartField(parseInt(event.target.value), item.ename);
                    }}
                    value={typeof item.value === 'number' ? parseInt(item.value) : 0}
                  />
                  {
                    showData.length>1?
                    <span>{item.cname}</span>
                    :null
                  }
                </div>
              );
            } else if (itemType === 'Slider') {
              let {value:showVal,step,minNumber,maxNumber,ename} = item;
              if(!showVal){
                showVal = 0;
              }
              if(ename === 'rotate' && showVal<0){
                showVal = 360 + showVal;
              }
              return (
                <div key={i} >
                  <div className='pro-item-simple pro-item-slider'>
                    <Slider
                      min={minNumber}
                      max={maxNumber}
                      step={step}
                      onChange={event => {
                        this.updateChartField(event, ename);
                      }}
                      value={showVal}
                    />
                  </div>
                  <div className='pro-item-simple pro-item-number'>
                    <span  className="pro-item-simple-close" >{ename}</span>
                    <InputNumber
                      size='small'
                      min={minNumber}
                      max={maxNumber}
                      step={step}
                      value={showVal}
                      onBlur={event => {
                        let value = parseInt(event.target.value);
                        this.updateChartField(value, ename);
                      }}
                      onChange={event => {
                        // this.updateChartField(event, ename);
                      }}
                    />
                  </div>
                </div>
              );
            } else if (itemType === 'Color') {
              return (
                <div key={i} className={oneClassName+' pro-item-simple'}>
                  <ReactColor
                    ename={item.ename}
                    colorVal={item.value}
                    setBgColor={this.updateChartField}
                  />
                </div>
              );
            } else if (itemType === 'ImageUploading') {
              return (
                <div key={i} className={oneClassName+' pro-item-simple'}>
                  <div
                    className='previewImage'
                    onMouseEnter={this.handleMouseEnter}
                    onMouseLeave={this.handleMouseLeave}
                    style={{
                      backgroundImage: `url(${item.value})`,
                      backgroundSize: '100% 100%'
                    }}>
                    {
                      // item.value?<img src={item.value}  id="previewImageObj"  style={{ width: '100%',height:'auto',padding: '20px 20px'}} />:true
                    }
                    {
                      this.state.showImageOptionFlag
                      ? <div className='previewOption'>
                          <span className='previewOptionText'>
                            <span onClick={this.setUploadPageBg}>更改</span>|
                            <span onClick={this.deletePageBg.bind(this,item.ename)}>删除</span>
                          </span>
                        </div>
                      : null
                     }
                  </div>
                  <div style={{ display: 'none' }}>
                    <ImageUploading
                      ref='ImageUploading'
                      ename={item.ename}
                      colorVal={item.value}
                      setShowPreview={this.updateChartField}
                    />
                  </div>
                </div>
              );
            } else if (itemType === 'Input') {
              return (
                <div key={i} className={oneClassName+' pro-item-simple'}>
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
            } else if (itemType === 'Select') {
              return (
                <div key={i} className={oneClassName+' pro-item-simple'}>
                  <Select
                    size='small'
                    key={item.ename}
                    value={item.value}
                    suffixIcon={item.suffix}
                    showSearch
                    placeholder='Select a person'
                    optionFilterProp='children'
                    onChange={event => {
                      this.updateChartField(event, item.ename);
                    }}
                    filterOption={(input, option) =>
                      option.props.children[2].indexOf(input.toLowerCase()) >= 0
                    }>
                    {item.optionValues.map((optionItem,optionIndex) => {
                      let bgImg =  optionItem.src,icon = optionItem.icon;
                      return <Option value={optionItem.value}  key={optionIndex}  >
                                {
                                  bgImg?<img alt="" width="30" height="20"  src={require('../../img/'+bgImg)}   />:null
                                }
                                {
                                  icon?<FontAwesomeIcon icon={icon} style={{width:"16px",height:"16px",margin:"0 4px"}} color="rgba(10,115,255,1)"/>:null
                                }
                                {optionItem.cname}

                        </Option>;
                    })}
                  </Select>
                </div>
              );
            } else if (itemType === 'Switch') {
              return (
                <div key={i} className={oneClassName+' pro-item-simple'}>
                  <Switch
                    onChange={event => {
                      this.updateChartField(event, item.ename);
                    }}
                    checked={item.value}/>
                </div>
              );
            } else if (itemType === 'TextArea') {
              return (
                <div key={i} className={oneClassName+' pro-item-simple'}>
                  <TextArea
                    value={item.value}
                    placeholder={item.placeholder}
                    onChange={event => {
                      this.updateChartField(event.target.value, item.ename);
                    }}
                  />
                </div>
              );
            } else if (itemType === 'JsonShow') {
              return (
                <div key={i} className={oneClassName+' pro-item-simple'}>
                  <pre style={{ maxHeight: '200px', outline: '1px solid white' }}>
                    <code id='json'>{JSON.stringify(item.value, null, '  ')}</code>
                  </pre>
                </div>
              );
            } else if(itemType === "EditJsonReactAjrm"){
              let isEdit = item.isEdit;
              let editJsonId = 'edit-json-react-ajrm-edit'
              if(!isEdit){
                editJsonId = 'edit-json-react-ajrm-noEdit'
              }
              return (
                <div className='pro-item-simple-block pro-item-simple'  key={i} style={{textAlign: 'left'}}   >
                  <span>{item.cname}</span>
                      <JSONInput
                        id          = {editJsonId}
                        placeholder = { item.value }
                        locale      = { locale }
                        height      = '300px'
                        width       = '300px'
                        onChange={event => {this.editJsonChange(event, item.ename);}}
                        viewOnly = {!isEdit}
                        confirmGood = {false}
                        onKeyPressUpdate = {false}
                      />
                </div>
              )
            }else if (itemType === 'noContent') {
              return (
                <div key={i} className={'pro-item-single-all pro-item-simple'} >
                  <span>该组件不需要配置数据</span>
                </div>
              );
            }
            return i;
          })}
        </Col>
      </Row>
    );
  }

  /**
   * @description: 在编辑面板上面修改一个单独的值,进行调用
   * @param {type}
   * @return:
   */
  updateChartField = (fieldValue, fieldEname) => {
    this.props.updateThisCharsField(fieldValue,fieldEname);
  }

  /**
   * @description: 对json静态数据进行编辑
   * @param {type}
   * @return:
   */
  editJsonChange = (event,fieldEname) =>{
    if(event.error) return;
    this.updateChartField(event.jsObject, fieldEname);
  }


  deletePageBg = (ename) => {
    this.updateChartField('', ename);
    this.refs.ImageUploading.deleteImageUrl();
  }

  setUploadPageBg= () =>  {
    this.refs.ImageUploading.imitationClick();
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

  /**
   * @description: 是否显示更改和删除图片按钮
   * @param {type}
   * @return:
   */
  updateImagePreView(Imageflag) {
    this.setState({
      showImageOptionFlag: Imageflag
    });
  }

}

export default EditSimpleMainInfo;
