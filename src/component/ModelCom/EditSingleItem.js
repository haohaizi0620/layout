import React from "react";
import ReactDOM from "react-dom";
import "./css/EditSingleItem.css";
import {
  Form,
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
  Collapse,
  Switch,
  Modal
} from "antd";
import 'antd/dist/antd.css';
const { Option } = Select;
const { Panel } = Collapse;
const { TextArea } = Input;
class EditSingleItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      layerItem: this.props.layerItem
    };
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
  /**
   * @description:  给画布设置背景颜色
   * @param {string}  colorObj  是一个rgba值
   * @return:
   */
  setBgColor(fieldEname, colorObj) {
    this.updateChartField(colorObj,fieldEname);
  }

  render() {
    var defaultOneColVal = 6;
    var defaultTwoColVal = 18;
    let layerItem = this.state.layerItem;
    if (layerItem.level == 1) {
      layerItem = [layerItem];
    }
    return (
      <div>
        <Row>
          <Col span={defaultOneColVal}>
            <span>{layerItem[0].name}</span>
          </Col>
          <Col span={defaultTwoColVal}>
            {layerItem.map((item, i) => {
              let itemType = item.type;
              if (itemType == "InputNumber") {
                let tempVal = parseInt(item.value);
                return (
                  <div key={item.ename} className="pro-item-simple">
                    <InputNumber
                      min={item.minNumber}
                      max={item.maxNumber}
                      onChange={event => {
                        this.updateChartField(event, item.ename);
                      }}
                      value={tempVal}
                    />
                  </div>
                );
              } else if (itemType == "Input") {
                return (
                  <div className="pro-item-simple">
                    <Input
                      placeholder={item.placeholder}
                      key={item.ename}
                      onChange={event => {
                        this.updateChartField(event.target.value, item.ename);
                      }}
                      value={item.value}
                    />
                  </div>
                );
              } else if (itemType == "Select") {
                return (
                  <div className="pro-item-simple">
                    <Select
                      key={item.ename}
                      value={item.value}
                      showSearch
                      placeholder="Select a person"
                      optionFilterProp="children"
                      onChange={event => {
                        this.updateChartField(event, item.ename);
                      }}
                      filterOption={(input, option) =>
                        option.props.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {item.optionValues.map(optionItem => {
                        return (
                          <Option value={optionItem.value}>
                            {optionItem.cname}
                          </Option>
                        );
                      })}
                    </Select>
                  </div>
                );
              } else if (itemType == "Switch ") {
                return (
                  <div className="pro-item-simple">
                    <Switch
                      onChange={event => {
                        this.updateChartField(event, item.ename);
                      }}
                    />
                  </div>
                );
              } else if (itemType == "TextArea") {
                return (
                  <div className="pro-item-simple">
                    <TextArea
                      value={item.value}
                      placeholder={item.placeholder}
                      onChange={event => {
                        this.updateChartFieldPrev(event, item.ename);
                      }}
                    />
                  </div>
                );
              }
            })}
          </Col>
        </Row>
      </div>
    );
  }
}

export default EditSingleItem;
