import React, { Component } from 'react';
import {
    Collapse,
  } from 'antd';
const { Panel } = Collapse;

class EditDoubleMainInfo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Collapse expandIconPosition='right' bordered={false} onChange={this.callback}>
        <Panel header={item.name} key='1'>
          {item.childer.map((itemLayer, itemIndex) => {
            {
              if (itemLayer.type == 'Collapse') {
                return (
                  <Collapse expandIconPosition='right' bordered={false}>
                    <Panel header={itemLayer.name} key='1'>
                      {itemLayer.childer.map((itemTwo, layerIndex) => {
                        return (
                          <EditSimpleMainInfo
                            updateArrFlag={true}
                            key={layerIndex}
                            childer={itemTwo}
                            name={itemTwo.cname}
                            includeSelectFlag={itemTwo.includeSelect}
                            updateThisCharsField={this.props.updateThisCharsField.bind(
                              this,
                              this.props.cptPropertyObj.type
                            )}
                            setBgColor={this.setBgColor.bind(this, item.layerType)}
                            setShowPreview={this.setShowPreview.bind(this)}
                            deletePageBg={this.deletePageBg.bind(this)}
                          />
                        );
                      })}
                    </Panel>
                  </Collapse>
                );
              } else {
                return (
                  <EditSimpleMainInfo
                    updateArrFlag={true}
                    key={itemIndex}
                    childer={itemLayer}
                    name={itemLayer.cname}
                    includeSelectFlag={itemLayer.includeSelect}
                    updateThisCharsField={this.updateThisCharsField.bind(
                      this,
                      this.props.cptPropertyObj.type
                    )}
                    setBgColor={this.setBgColor.bind(this, item.layerType)}
                    setShowPreview={this.setShowPreview.bind(this)}
                    deletePageBg={this.deletePageBg.bind(this)}
                  />
                );
              }
            }
          })}
        </Panel>
      </Collapse>
    );
  }
}
