/*
 * @Author: your name
 * @Date: 2020-01-06 12:08:04
 * @LastEditTime: 2020-03-27 19:25:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \layout\src\utils\chart.js
 */
import store from '../redux/store';
import { getSpecify, getMapDataWFS, getRecursionMap, getSpecifyGeojson } from '../api/api';
import { addCptOptionsList, editCptOptionsList } from '../redux/actions/showLayerDatas';
import $ from 'jquery';
import { getDefaultLayerData } from './globalAPI';
import index from "styled-components/dist/styled-components-macro.esm";
import React from "react";
import { isGetAccessor } from 'typescript';
import { configConsumerProps } from 'antd/lib/config-provider';
import typeObj from '../router/type';
let chartTestData = require('../datasource/chartTestData.json');
const chartData = require('../datasource/chartDatas.json');

/**
 * @description: 创建一个对应的图表
 * @param  {String} chartName 图标的拼音首字母小写
 * @param  {Number} id 生成的图表对应的当前时间戳的id
 * @param  {Layout} _this  代表layout组件的this
 * @param  {String} chartState 代表当前图表是改变数据还是不改变数据   noUpdate不改变数据   update 改变数据
 * @return:  正常添加一个图表,否则就是移动位置改变大小，如果没有找到当前图表对应的接口id直接返回
 */
export function chartOption(chartName, timeKey, _this, chartState, otherObj) {
  var arr = window.arr
    ? window.arr
    : [];
  var mapObjArr = window.mapObjArr
    ? window.mapObjArr
    : [];
  var flag = false; //是否存在
  var addIndex = _this.state.cptChartIdList.length - 1;
  //如果存在进行更新大小或者替换数据,不存在请求数据加载图层
  if (arr) {
    arr
      .forEach(function (e, item) {
        if (e == timeKey) {
          flag = true;
          return false;
        }
      });
  }
  if (otherObj && otherObj.state === "leftAdd") {
    let layerObj = otherObj.data;
    if (!flag) {
      arr.push(timeKey);
      window.arr = arr;
      addChart(layerObj, timeKey, addIndex, _this);
    } else {
      let newOptions = store
        .getState()
        .showLayerDatas
        .cptOptionsList[_this.state.cptIndex]
        .layerOption;
      let tempThisObj = document.getElementById(timeKey);

      var thType = layerObj.thType;
      if ("0" === thType) { //图表
        var e_instance = tempThisObj.getAttribute("_echarts_instance_");
        if (chartState === "update") {
          new window.dmapgl.commonlyCharts(timeKey, { data: newOptions });
        } else {
          if (window.echarts.getInstanceById(e_instance)) {
            window
              .echarts
              .getInstanceById(e_instance)
              .resize();
          }
        }
      } else if ("1" === thType) { //wms或wfs
        let mapObj = mapObjArr[_this.state.cptIndex]
        if (mapObj && mapObj.layerId == timeKey) {
          if (chartState === "update") { } else {
            if (mapObj.layerMap) {
              mapObj
                .layerMap
                .resize();
            }
          }
        }
      }
    }
  } else if (otherObj && otherObj.state === "headerAdd") {
    let defaultCharts = ["chart", "map", "chartMap", "0", "1"]
    let layerType = "chart";
    let chartId = 101;
    chartData.map(item => {
      if (item.id === chartName) {
        layerType = item.layerType;
        chartId = item.chartId;
      }
    })
    if (!flag) {
      if (!defaultCharts.includes(layerType)) {
        arr.push(timeKey);
        mapObjArr.push({ layerId: timeKey, layerMap: {} });
        window.arr = arr;
        window.mapObjArr = mapObjArr;
        let tempSaveObj = getDefaultLayerData(layerType, chartName)
        store.dispatch(addCptOptionsList(chartId, tempSaveObj));
      } else {
        let tempIndex = Math.ceil(Math.random() * 3) - 1;
        var data = chartTestData[tempIndex];
        var a, map;
        if (layerType === "map" || layerType === "chartMap") {
          store.dispatch(addCptOptionsList(chartId, []))
          map = new window.dmapgl.Map({
            container: timeKey,
            zoom: 8,
            minZoom: 8,
            maxZoom: 20,
            fadeDuration: 0,
            center: [
              503428.7804260254, 345586.30670166016
            ],
            preserveDrawingBuffer: true,
            style: 'zyzx://vector_standard/styles/style.json',
            //style: 'http://172.24.254.94:8080/vector_blue/styles/root.json',
            // style : 'zyzx://zhengwu20181130/p12/resources/styles/root-'+theme+'.json',
            // //verctor_20180717   zhengwu_light  zhengwu_streets  zhengwu_dark
            // localIdeographFontFamily : ' "Microsoft YaHei Bold","Microsoft YaHei
            // Regular","SimSun,Regular"',
          });
          map.on('load', function () {
            addSKY(map);
            getSpecify(chartId).then(result => {
              let tempOptionObj = {
                cptIndex: addIndex,
                layerOption: result
              }
              store.dispatch(editCptOptionsList(tempOptionObj));
            }).catch(error => {
              console.info(error);
            });
          });
        } else if (layerType === "chart") {
          a = new window.dmapgl.commonlyCharts(timeKey, { data: data });
          store.dispatch(addCptOptionsList(chartId, data))
        }
        arr.push(timeKey);
        mapObjArr.push({ layerId: timeKey, layerMap: map });
        window.arr = arr;
        window.mapObjArr = mapObjArr;
      }
    } else {
      if (defaultCharts.includes(layerType)) {
        let newOptions = store
          .getState()
          .showLayerDatas
          .cptOptionsList[_this.state.cptIndex]
          .layerOption;
        let tempThisObj = document.getElementById(timeKey);
        if (layerType === "chart") {
          var e_instance = tempThisObj.getAttribute("_echarts_instance_");
          if (chartState === "update") {
            new window.dmapgl.commonlyCharts(timeKey, { data: newOptions });
          } else {
            if (window.echarts.getInstanceById(e_instance)) {
              window
                .echarts
                .getInstanceById(e_instance)
                .resize();
            }
          }
        } else if (layerType === "map" || layerType === "chartMap") {
          let mapObj = mapObjArr[_this.state.cptIndex]
          if (mapObj.layerId === timeKey) {
            if (chartState === "update") { } else {
              if (mapObj.layerMap) {
                mapObj
                  .layerMap
                  .resize();
              }
            }
          }
        }
      }
    }
  }
}


/**
 * @description: 打开当前页面的时候向后台请求到当前页面的数据后,对数据进行渲染.
 * @param {type}
 * @return:
 */
export function showChartsOption(chartsList, keyList) {
  if (chartsList && chartsList[0]) {
    var arr = window.arr
      ? window.arr
      : [];
    var mapObjArr = window.mapObjArr ? window.mapObjArr : [];
    chartsList.map((item, index) => {
      //console.info(item);
      let cptKey = keyList[index];
      let layerId = cptKey.id;
      let data = item.layerObj;
      let layerType = item.thType;
      let chartId = item.chartId;
      let layerData = item.layerData;
      let type2 = item.layerObj.type2;
      let timeKey = item.timeKey.toString();
      //console.log(timeKey)
      let map = {};
      let scene = {};
      store.dispatch(addCptOptionsList(chartId, []));
      if (layerType === "0") {
        let type1 = item.layerObj.type;
        /*
         * 一般图表
         * THEMEPIE_CHART（一般饼状图）
         * THEMERADAR_CHART（一般雷达图）
         * THEMERING_CHART（一般圆环图）
         * THEMELINE_CHART（一般折线图）
         * THEMEHISTOGRAM（一般柱状图）
         * THEMEFUNNEL_CHART（漏斗图）
         * THEMEPYRAMID_CHART（金字塔图）
         * THEMEVERTBAR_SORT（一般叠加柱状图）
         * THEMEDASHBOARD (仪表盘）
         * THEMEHSANDIAN_CHART（散点图）
        */
        if ('THEMEPIE_CHART' == type1) {
          getSpecify(chartId).then(function (result) {
            if (result.data) {
              console.log("接口没有数据")
            } else {
              if (result && result[0]) {
                new window.Pie(timeKey, { data: result });
              }
            }
            let tempOptionObj = {
              cptIndex: index,
              layerOption: result
            }
            store.dispatch(editCptOptionsList(tempOptionObj));

          }).catch(e => console.log("error", e));
        }
        else if ('THEMERADAR_CHART' == type1) {
          getSpecify(chartId).then(function (result) {
            if (result.data) {
              console.log("接口没有数据")
            } else {
              if (result && result[0]) {
                new window.Radar(timeKey, { data: result });
              }
            }
            let tempOptionObj = {
              cptIndex: index,
              layerOption: result
            }
            store.dispatch(editCptOptionsList(tempOptionObj));

          }).catch(e => console.log("error", e));

        }
        else if ('THEMERING_CHART' == type1) {
          getSpecify(chartId).then(function (result) {
            if (result.data) {
              console.log("接口没有数据")
            } else {
              if (result && result[0]) {
                new window.Ring(timeKey, { data: result });
              }
            }
            let tempOptionObj = {
              cptIndex: index,
              layerOption: result
            }
            store.dispatch(editCptOptionsList(tempOptionObj));

          }).catch(e => console.log("error", e));

        }
        else if ('THEMELINE_CHART' == type1) {
          getSpecify(chartId).then(function (result) {
            if (result.data) {
              console.log("接口没有数据")
            } else {
              if (result && result[0]) {
                new window.Line(timeKey, { data: result });
              }
            }
            let tempOptionObj = {
              cptIndex: index,
              layerOption: result
            }
            store.dispatch(editCptOptionsList(tempOptionObj));

          }).catch(e => console.log("error", e));
        }
        else if ('THEMEHISTOGRAM' == type1||
                 'xiangxingzhutu' ==type1||
                 'dongtaizhutu'==type1) {
          getSpecify(chartId).then(function (result) {
            if (result.data) {
              console.log("接口没有数据")
            } else {
              if (result && result[0]) {
                new window.Bar(timeKey, { data: result });
              }
            }
            let tempOptionObj = {
              cptIndex: index,
              layerOption: result
            }
            store.dispatch(editCptOptionsList(tempOptionObj));

          }).catch(e => console.log("error", e));
        }
        else if ('THEMEFUNNEL_CHART' == type1) {
          getSpecify(chartId).then(function (result) {
            if (result.data) {
              console.log("接口没有数据")
            } else {
              if (result && result[0]) {
                new window.Funnel(timeKey, { data: result });
              }
            }
            let tempOptionObj = {
              cptIndex: index,
              layerOption: result
            }
            store.dispatch(editCptOptionsList(tempOptionObj));

          }).catch(e => console.log("error", e));
        }
        else if ('THEMEPYRAMID_CHART' == type1) {
          getSpecify(chartId).then(function (result) {
            if (result.data) {
              console.log("接口没有数据")
            } else {
              if (result && result[0]) {
                new window.Funnel(timeKey, { data: result });
              }
            }
            let tempOptionObj = {
              cptIndex: index,
              layerOption: result
            }
            store.dispatch(editCptOptionsList(tempOptionObj));

          }).catch(e => console.log("error", e));
        }
        else if ('THEMEDASHBOARD' == type1) {
          getSpecify(chartId).then(function (result) {
            if (result.data) {
              console.log("接口没有数据")
            } else {
              if (result && result[0]) {
                new window.Gauge(timeKey, { data: result });
              }
            }
            let tempOptionObj = {
              cptIndex: index,
              layerOption: result
            }
            store.dispatch(editCptOptionsList(tempOptionObj));

          }).catch(e => console.log("error", e));
        }
        else if ('THEMEHSANDIAN_CHART' == type1) {

          getSpecify(chartId).then(function (result) {
            if (result.data) {
              console.log("接口没有数据")
            } else {
              if (result && result[0]) {
                new window.Scatter(timeKey, { data: result });
              }
            }
            let tempOptionObj = {
              cptIndex: index,
              layerOption: result
            }
            store.dispatch(editCptOptionsList(tempOptionObj));

          }).catch(e => console.log("error", e));
        }
        else if ('THEMEPIE' == type1 ||
          'THEMEBAR' == type1 ||
          'THEMECIRCULAR' == type1 ||
          'THEMECIRCLE' == type1 ||
          'THEMEHALFCIRCLE' == type1 ||
          'THEMEFAN' == type1 ||
          'THEMEGRID' == type1 ||
          'THEMEFANGW' == type1 ||
          'THEMEHALFCIRCLEGW' == type1 ||
          'THEMECIRCLEGW' == type1 ||
          'THEMESCATTER' == type1 ||
          'THEMEOD' == type1 ||
          'RLTLayer' == type1) {
          /*
           * 专题地图图表
           * THEMEPIE（饼状图）
           * THEMEBAR（柱状图）
           * THEMECIRCULAR（圆环图）
           * THEMECIRCLE（圆形图）
           * THEMEHALFCIRCLE（半圆图）
           * THEMEFAN（扇形图）
           * THEMEGRID（数据格网图）
           * THEMEFANGW（网格扇形图）
           * THEMEHALFCIRCLEGW（网格半圆图）
           * THEMECIRCLEGW（网格圆形图）
           * THEMESCATTER（散点图）
           * THEMEOD（OD图）
           * RLTLayer（数据热点图）
           */


          getSpecify(chartId).then(function (result) {
            if (result.data) {
              console.log("接口没有数据")
            } else {
              var mapType = ""
              var style = "zyzx://vector_standard/styles/style.json";
              if (result && result[0]) {
                mapType = result[0].myLegend.result[0].itemStyle.maptype;
              }
              style = "zyzx://" + mapType + "/styles/style.json";
              map = new window.dmapgl.Map({
                container: timeKey,
                zoom: 8,
                minZoom: 8,
                maxZoom: 20,
                fadeDuration: 0,
                center: [503428.7804260254, 345586.30670166016],
                preserveDrawingBuffer: true,
                style: style,
              });

              map.on('load', function () {
                addSKY(map);
                if (result.data) {
                  console.log("接口没有数据")
                } else {
                  if (result && result[0]) {
                    new window.dmapgl.EchartsTool(result[0], map);
                  }
                }
                let tempOptionObj = {
                  cptIndex: index,
                  layerOption: result
                }
                store.dispatch(editCptOptionsList(tempOptionObj));
              });
            }
          }).catch(e => console.log("error", e));


        } else if ('RESULTMAP' == type1) {//复合图
          getSpecify(chartId).then(function (result) {
            if (result.data) {
              console.log("接口没有数据")
            } else {
              var mapType = ""
              var style = "zyzx://vector_standard/styles/style.json";
              if (result && result[0]) {
                mapType = result[0].myLegend.result[0].itemStyle.maptype;
              }
              style = "zyzx://" + mapType + "/styles/style.json";

              map = new window.dmapgl.Map({
                container: timeKey,
                zoom: 8,
                minZoom: 8,
                maxZoom: 20,
                center: [503428.7804260254, 345586.30670166016],
                preserveDrawingBuffer: true,
                style: style,
              });

              map.on('load', function () {
                addSKY(map);
                if (result && result[0]) {
                  new window.dmapgl.EchartsTool(result[0], map);
                }
                addLayerWFS(data, map);
              });

            }
            let tempOptionObj = {
              cptIndex: index,
              layerOption: result
            }
            store.dispatch(editCptOptionsList(tempOptionObj));

          }).catch(e => console.log("error", e));

        } if ('3DLINES' == type1) {//炫光线
          getSpecifyGeojson(chartId).then(function (result) {
            if (result.data) {
              console.log("接口没有数据")
            } else {
              var mapType = ""
              var style = "zyzx://vector_standard/styles/style.json";
              if (result && result[0]) {
                mapType = result[0].myLegend.result[0].itemStyle.maptype;
              }
              style = "zyzx://" + mapType + "/styles/style.json";
              map = {
                container: timeKey,
                center: [503032.01163424924, 305592.6132906107],
                preserveDrawingBuffer: true,
                zoom: 6,
                pitch: 1,
                bearing: 0,
                //   altitudeScale: 2,
                style: style,
                //  shading:'color',
                postEffect: {
                  enable: true,
                  screenSpaceAmbientOcclusion: {
                    enable: true,
                    intensity: 1.2,
                    radius: 6,
                    quality: 'high'
                  },
                  screenSpaceReflection: {
                    enable: true
                  }
                },
                light: {
                  main: {
                    intensity: 1,
                    shadow: true,
                    shadowQuality: 'high'
                  },
                  ambient: {
                    intensity: 0.
                  }
                }
              };

              if (result && result[0]) {
                new window.dmapgl.Line(result[0], map);
              }
            }
            let tempOptionObj = {
              cptIndex: index,
              layerOption: result
            }
            store.dispatch(editCptOptionsList(tempOptionObj));

          }).catch(e => console.log("error", e));
        }
        else if ('3DBAR' == type1 ||
          'GRID' == type1 ||
          'COLORSCALE' == type1) {//3D柱、网格、等级颜色

          getSpecifyGeojson(chartId).then(function (result) {
            console.log(result)
            if (result.data) {
              console.log("接口没有数据")
            } else {
              var mapType = ""
              var style = "zyzx://vector_standard/styles/style.json";
              if (result && result[0]) {
                mapType = result[0].myLegend.result[0].itemStyle.maptype;
              }
              style = "zyzx://" + mapType + "/styles/style.json";
              console.log(style)
              map = new window.dmapgl.Map({
                container: timeKey,
                zoom: 8,
                minZoom: 8,
                maxZoom: 20,
                fadeDuration: 0,
                center: [503428.7804260254, 345586.30670166016],
                preserveDrawingBuffer: true,
                style: style,
              });
              console.log(map)
              map.on('load', function () {
                addSKY(map);
                if (result && result[0]) {
                  if ('3DBAR' == type1) {
                    new window.dmapgl.Bar(result[0], map, timeKey);
                  } else if ('GRID' == type1) {
                    new window.dmapgl.Grid(result[0], map, timeKey);
                  } else if ('COLORSCALE' == type1) {
                    new window.dmapgl.Grade(result[0], map, timeKey);
                    console.log(new window.dmapgl.Grade(result[0], map, timeKey))
                  }
                }
              });

            }
            let tempOptionObj = {
              cptIndex: index,
              layerOption: result
            }
            store.dispatch(editCptOptionsList(tempOptionObj));

          }).catch(e => console.log("error", e));

        } else if ('PointRLLayer' == type1) {
          getSpecifyGeojson(chartId).then(function (result) {
            if (result.data) {
              console.log("接口没有数据")
            } else {
              var mapType = ""
              var style = "zyzx://vector_standard/styles/style.json";
              if (result && result[0]) {
                mapType = result[0].myLegend.result[0].itemStyle.maptype;
              }
              style = "zyzx://" + mapType + "/styles/style.json";
              map = new window.dmapgl.Map({
                container: timeKey,
                zoom: 8,
                minZoom: 8,
                maxZoom: 20,
                fadeDuration: 0,
                center: [503428.7804260254, 345586.30670166016],
                preserveDrawingBuffer: true,
                style: style,
              });
              map.on('load', function () {
                addSKY(map);
                if (result && result[0]) {
                  new window.dmapgl.EchartsTool(result[0], map);
                }
              });

            }
            let tempOptionObj = {
              cptIndex: index,
              layerOption: result
            }
            store.dispatch(editCptOptionsList(tempOptionObj));

          }).catch(e => console.log("error", e));

        } else if (type1 == "3Dheatmap") {
          getSpecifyGeojson(chartId).then(function (result) {
            if (result.data) {
              console.log("接口没有数据")
            } else {
              var mapType = ""
              var style = "zyzx://vector_standard/styles/style.json";
              if (result && result[0]) {
                mapType = result[0].myLegend.result[0].itemStyle.maptype;
              }
              style = "zyzx://" + mapType + "/styles/style.json";
              map = new window.dmapgl.Map({
                container: timeKey,
                zoom: 8,
                minZoom: 8,
                maxZoom: 20,
                fadeDuration: 0,
                pitch: 60,
                center: [503428.7804260254, 345586.30670166016],
                preserveDrawingBuffer: true,
                style: style
              });

              scene = new window.L7.Scene({
                id: timeKey,
                logoVisible: false,
                preserveDrawingBuffer: true,
                map: new window.L7.Mapbox({
                  mapInstance: map,
                }),
              });

              var data = result;
              scene.on('loaded', function () {
                var sourcedata = data[0].myMapTable;
                var field = data[0].myLegend.result[0].fieldName;

                var radius = data[0].myLegend.result[0].itemStyle.radius;
                var opacity = data[0].myLegend.result[0].itemStyle.opacity;
                var shape = data[0].myLegend.result[0].itemStyle.shape;
                var type = data[0].myLegend.result[0].itemStyle.type;
                var showfield = data[0].myLegend.result[0].itemStyle.showfield;
                var showfieldarr = showfield.split(",");
                var mouseevent = data[0].myLegend.result[0].itemStyle.mouseevent;
                var fontsize = data[0].myLegend.result[0].itemStyle.legendFontSize;
                var fontcolor = data[0].myLegend.result[0].itemStyle.legendColor;

                const layer = new window.L7.HeatmapLayer({});
                // var times = [];
                // var groupfield = data[0].myLegend.result[0].itemStyle.groupfield;
                // var timelidertime = data[0].myLegend.result[0].itemStyle.timelidertime;
                // data.features = data[0].myMapTable.features.map(function (d) {
                //   times.push(d.properties.时间);
                //   return d;
                // });
                if ("classicHeatType" == type) {//经典热力图
                  var intensity = data[0].myLegend.result[0].itemStyle.intensity;
                  var colorarr = data[0].myLegend.result[0].itemStyle.tubysfa.split(",");
                  layer.source(sourcedata)
                    .size(field, [0, 1])
                    .shape(shape)
                    .style({
                      intensity: parseInt(intensity),
                      radius: parseInt(radius),
                      opacity: parseInt(opacity),
                      rampColors: {
                        colors: colorarr,
                        positions: [0.0, 0.1, 0.3, 0.5, 0.7, 1.0]
                      }
                    });
                  // layer.filter(groupfield, (time) => {
                  //   if (time === "2021") {
                  //     return true; // 显示数据
                  //   } else {
                  //     return false; // 过滤掉
                  //   }
                  // })
                  scene.addLayer(layer);
                  var str = '<div style="height: 30px;background-image: linear-gradient(to right,' + data[0].myLegend.result[0].itemStyle.tubysfa + ');"></div>'
                  $("#tulidiv").append(str);
                } else if ("honeycombHeatType" == type) {//蜂窝热力图
                  var coverage = data[0].myLegend.result[0].itemStyle.coverage;
                  var angle = data[0].myLegend.result[0].itemStyle.angle;
                  var valandcolors = data[0].myLegend.result[0].itemStyle.color;
                  layer.source(sourcedata, {
                    transforms: [
                      {
                        type: 'hexagon',
                        size: parseInt(radius),
                        field: field,
                        method: 'sum'
                      }
                    ]
                  }).size('sum', function (v) {
                    v = Math.log(v + 1);
                    return v * 1000;
                  })
                    .shape(shape)
                    .style({
                      coverage: parseInt(coverage),
                      angle: parseInt(angle),
                      opacity: parseInt(opacity)
                    })
                    .color(
                      'sum',
                      function (v) {
                        var valandcolor = valandcolors.split(",");
                        for (var i = 0; i < valandcolor.length; i++) {
                          var minval = valandcolor[i].split("-")[0];
                          var maxval = valandcolor[i].split("-")[1];
                          var color = valandcolor[i].split("-")[2];
                          if (v > minval && v <= maxval) {
                            return color;
                          } else if (v == maxval) {
                            return color;
                          }
                        }
                      }
                    );
                  var legendShow = data[0].myLegend.result[0].itemStyle.legendShow;
                  var legendOpacity = data[0].myLegend.result[0].itemStyle.legendOpacity;
                  var legendBackgroundColor = data[0].myLegend.result[0].itemStyle.legendBackgroundColor;
                  var legendPosition = data[0].myLegend.result[0].itemStyle.legendPosition;
                  //图例
                  layer.on(mouseevent, (ev) => {//alert("鼠标左键点击图层事件");
                    if (ev.feature == 'null') {
                      return false;
                    }
                    var ddhtml = "<div class=\"popudiv\"><table class=\"poputable\">"
                    for (var i = 0; i < showfieldarr.length; i++) {
                      ddhtml += "<tr><th class = \"tdcolumnName\">" + showfieldarr[i] + ":</th>"
                        + "<td><span class=\"popu_span\">" + ev.feature.properties.rawData[0][showfieldarr[i]] + "</span>"
                        + "</td></tr>";
                    }
                    ddhtml += "</table></div>";
                    const popup = new window.L7.Popup({
                      offsets: [0, 0],
                      closeButton: false
                    })
                      .setLnglat(ev.lngLat)
                      .setHTML(ddhtml);
                    scene.addPopup(popup);
                  });
                  scene.addLayer(layer);
                } else if ("gridHeatType" == type) {//网格热力图
                  var coverage = data[0].myLegend.result[0].itemStyle.coverage;
                  var angle = data[0].myLegend.result[0].itemStyle.angle;
                  var valandcolors = data[0].myLegend.result[0].itemStyle.color;
                  layer.source(sourcedata, {
                    transforms: [
                      {
                        type: 'hexagon',
                        size: parseInt(radius),
                        field: field,
                        method: 'sum'
                      }
                    ]
                  })
                    // .size('sum', [ 0, 600 ])
                    .size('sum', function (v) {
                      v = Math.log(v + 1);
                      console.log(v);
                      return v * 1000;
                    })
                    .shape(shape)
                    .style({
                      coverage: parseInt(coverage),
                      angle: parseInt(angle)
                    })
                    .color(
                      'sum',
                      //colorarr
                      function (v) {
                        var valandcolor = valandcolors.split(",");
                        for (var i = 0; i < valandcolor.length; i++) {
                          var minval = valandcolor[i].split("-")[0];
                          var maxval = valandcolor[i].split("-")[1];
                          var color = valandcolor[i].split("-")[2];
                          if (v >= minval && v < maxval) {
                            return color;
                          } else if (v == maxval) {
                            return color;
                          }
                        }
                      }
                    );
                  var legendShow = data[0].myLegend.result[0].itemStyle.legendShow;
                  var legendOpacity = data[0].myLegend.result[0].itemStyle.legendOpacity;
                  var legendBackgroundColor = data[0].myLegend.result[0].itemStyle.legendBackgroundColor;
                  var legendPosition = data[0].myLegend.result[0].itemStyle.legendPosition;
                  //图例
                  layer.on(mouseevent, (ev) => {//alert("鼠标左键点击图层事件");
                    if (ev.feature == 'null') {
                      return false;
                    }
                    var ddhtml = "<div class=\"popudiv\"><table class=\"poputable\">"
                    for (var i = 0; i < showfieldarr.length; i++) {
                      ddhtml += "<tr><th class = \"tdcolumnName\">" + showfieldarr[i] + ":</th>"
                        + "<td><span class=\"popu_span\">" + ev.feature.properties.rawData[0][showfieldarr[i]] + "</span>"
                        + "</td></tr>";
                    }
                    ddhtml += "</table></div>";
                    const popup = new window.L7.Popup({
                      offsets: [0, 0],
                      closeButton: false
                    })
                      .setLnglat(ev.lngLat)
                      .setHTML(ddhtml);
                    scene.addPopup(popup);
                  });
                  scene.addLayer(layer);
                }
              })
            }
            let tempOptionObj = {
              cptIndex: index,
              layerOption: result
            }
            store.dispatch(editCptOptionsList(tempOptionObj));
          }).catch(e => console.log("error", e));
        } else if (type1 == "qipao") {//气泡图
          getSpecifyGeojson(chartId).then(function (result) {
            if (result.data) {
              console.log("接口没有数据")
            } else {
              var mapType = ""
              var style = "zyzx://vector_standard/styles/style.json";
              if (result && result[0]) {
                mapType = result[0].myLegend.result[0].itemStyle.maptype;
              }
              style = "zyzx://" + mapType + "/styles/style.json";
              map = new window.dmapgl.Map({
                container: timeKey,
                zoom: 8,
                minZoom: 8,
                maxZoom: 20,
                fadeDuration: 0,
                pitch: 1,
                center: [503428.7804260254, 345586.30670166016],
                preserveDrawingBuffer: true,
                style: style
              });
              scene = new window.L7.Scene({
                id: timeKey,
                logoVisible: false,
                preserveDrawingBuffer: true,
                map: new window.L7.Mapbox({
                  mapInstance: map,
                }),
              });

              var data = result;
              scene.on('loaded', function () {
                var sourcedata = data[0].myMapTable;
                var field = data[0].myLegend.result[0].fieldName;

                var radius = data[0].myLegend.result[0].itemStyle.radius;
                var opacity = data[0].myLegend.result[0].itemStyle.opacity;
                var showfield = data[0].myLegend.result[0].itemStyle.showfield;
                var showfieldarr = showfield.split(",");
                var mouseevent = data[0].myLegend.result[0].itemStyle.mouseevent;
                var fontsize = data[0].myLegend.result[0].itemStyle.fontsize;
                var fontcolor = data[0].myLegend.result[0].itemStyle.fontcolor;
                var animate = data[0].myLegend.result[0].itemStyle.animate;
                var valandcolors = data[0].myLegend.result[0].itemStyle.color;
                if (animate == "true") {
                  animate = true;
                } else {
                  animate = false;
                }
                var colorarr = data[0].myLegend.result[0].itemStyle.tubysfa.split(",");
                const pointLayer = new window.L7.PointLayer({})
                  .source(sourcedata)
                  .shape('circle')
                  .size(field, [1, parseInt(radius)])
                  .color(field, function (v) {
                    var valandcolor = valandcolors.split(",");
                    for (var i = 0; i < valandcolor.length; i++) {
                      var minval = valandcolor[i].split("-")[0];
                      var maxval = valandcolor[i].split("-")[1];
                      var color = valandcolor[i].split("-")[2];
                      if (v >= minval && v < maxval) {
                        return color;
                      } else if (v == maxval) {
                        return color;
                      }
                    }
                  })
                  .active(true)
                  .animate(animate)
                  .style({
                    opacity: parseFloat(opacity)
                  });
                //图例
                pointLayer.on(mouseevent, (ev) => {//alert("鼠标左键点击图层事件");
                  var ddhtml = "<div class=\"popudiv\"><table class=\"poputable\">"
                  for (var i = 0; i < showfieldarr.length; i++) {
                    ddhtml += "<tr><th class = \"tdcolumnName\">" + showfieldarr[i] + ":</th>"
                      + "<td><span class=\"popu_span\">" + ev.feature.properties[showfieldarr[i]] + "</span>"
                      + "</td></tr>";
                  }
                  ddhtml += "</table></div>";
                  const popup = new window.L7.Popup({
                    offsets: [0, 0],
                    closeButton: false
                  })
                    .setLnglat(ev.lngLat)
                    .setHTML(ddhtml);
                  scene.addPopup(popup);
                });
                scene.addLayer(pointLayer);
              })
            }
            let tempOptionObj = {
              cptIndex: index,
              layerOption: result
            }
            store.dispatch(editCptOptionsList(tempOptionObj));

          }).catch(e => console.log("error", e));

        }
        else if (type1 == "juhe") {//聚合图
          getSpecifyGeojson(chartId).then(function (result) {
            if (result.data) {
              console.log("接口没有数据")
            } else {
              var mapType = ""
              var style = "zyzx://vector_standard/styles/style.json";
              if (result && result[0]) {
                mapType = result[0].myLegend.result[0].itemStyle.maptype;
              }
              style = "zyzx://" + mapType + "/styles/style.json";
              map = new window.dmapgl.Map({
                container: timeKey,
                zoom: 8,
                minZoom: 8,
                maxZoom: 20,
                fadeDuration: 0,
                pitch: 1,
                center: [503428.7804260254, 345586.30670166016],
                preserveDrawingBuffer: true,
                style: style
              });
              scene = new window.L7.Scene({
                id: timeKey,
                logoVisible: false,
                preserveDrawingBuffer: true,
                map: new window.L7.Mapbox({
                  mapInstance: map,
                }),
              });
              scene.on('loaded', function () {
                var data = result;
                var sourcedata = data[0].myMapTable;
                var valandcolors = data[0].myLegend.result[0].itemStyle.color;
                var radius = data[0].myLegend.result[0].itemStyle.radius;
                var opacity = data[0].myLegend.result[0].itemStyle.opacity;
                var strokewidth = data[0].myLegend.result[0].itemStyle.strokewidth;
                var shapetype = data[0].myLegend.result[0].itemStyle.shapetype;
                const pointLayer = new window.L7.PointLayer({})
                  .source(sourcedata, {
                    cluster: true,
                    clusterOption: {
                      radius: radius
                    }
                  })
                  .shape(shapetype)
                  .scale('point_count', {
                    type: 'quantile'
                  })
                  .size('point_count', [5, 10, 15, 20])
                  .active(true)
                  .color('point_count', function (v) {
                    var valandcolor = valandcolors.split(",");
                    for (var i = 0; i < valandcolor.length; i++) {
                      var minval = valandcolor[i].split("-")[0];
                      var maxval = valandcolor[i].split("-")[1];
                      var color = valandcolor[i].split("-")[2];
                      if (v >= minval && v < maxval) {
                        return color;
                      } else if (v == maxval) {
                        return color;
                      }
                    }
                  })
                  .style({
                    opacity: parseFloat(opacity),
                    strokeWidth: parseFloat(strokewidth),
                  });
                //图例
                var fontsize = data[0].myLegend.result[0].itemStyle.legendFontSize;
                var fontcolor = data[0].myLegend.result[0].itemStyle.legendFontColor;
                var legendShow = data[0].myLegend.result[0].itemStyle.legendShow;
                var legendOpacity = data[0].myLegend.result[0].itemStyle.legendOpacity;
                var legendBackgroundColor = data[0].myLegend.result[0].itemStyle.legendBackgroundColor;
                var legendPosition = data[0].myLegend.result[0].itemStyle.legendPosition;
                scene.addLayer(pointLayer);
              })
            }
            let tempOptionObj = {
              cptIndex: index,
              layerOption: result
            }
            store.dispatch(editCptOptionsList(tempOptionObj));
            mapObjArr.push({ layerId: timeKey, layerMap: map });
            window.mapObjArr = mapObjArr;
          }).catch(e => console.log("error", e));

        } else if ('3DARC' == type1) {//3D弧形图
          getSpecifyGeojson(chartId).then(function (result) {
            if (result.data) {
              console.log("接口没有数据")
            } else {
              var mapType = ""
              var style = "zyzx://vector_standard/styles/style.json";
              if (result && result[0]) {
                mapType = result[0].myLegend.result[0].itemStyle.maptype;
              }
              style = "zyzx://" + mapType + "/styles/style.json";
              map = new window.dmapgl.Map({
                container: timeKey,
                zoom: 8,
                minZoom: 8,
                maxZoom: 20,
                fadeDuration: 0,
                center: [503428.7804260254, 345586.30670166016],
                preserveDrawingBuffer: true,
                style: style
              });

              scene = new window.L7.Scene({
                id: timeKey,
                logoVisible: false,
                preserveDrawingBuffer: true,
                map: new window.L7.Mapbox({
                  mapInstance: map,
                }),
              });

              var data = result;
              scene.on('loaded', function () {
                //起始点坐标字段
                var startpointX = data[0].myLegend.result[0].legendPosition.split(";")[1];
                var startpointY = data[0].myLegend.result[0].legendPosition.split(";")[2];

                var endpointX = data[0].myLegend.result[0].titlePosition.split(";")[1];
                var endpointY = data[0].myLegend.result[0].titlePosition.split(";")[2];

                var myMapTableFeatures = data[0].myMapTable.features;
                var sourcedata = {};
                sourcedata.type = "FeatureCollection";
                var features = [];
                for (var i = 0; i < myMapTableFeatures.length; i++) {
                  var feature = {};
                  feature.type = myMapTableFeatures[i].type;
                  feature.properties = data[0].myMapTable.features[i].properties;
                  var geometry = {};
                  geometry.type = "LineString";
                  var coordinates = [];
                  var startcoordinates = [];
                  startcoordinates[0] = myMapTableFeatures[i].properties[startpointX];
                  startcoordinates[1] = myMapTableFeatures[i].properties[startpointY];
                  var endcoordinates = [];
                  endcoordinates[0] = myMapTableFeatures[i].properties[endpointX]
                  endcoordinates[1] = myMapTableFeatures[i].properties[endpointY];
                  coordinates.push(startcoordinates.map(Number));
                  coordinates.push(endcoordinates.map(Number));
                  geometry.coordinates = coordinates;
                  feature.geometry = geometry;
                  features.push(feature);
                }
                sourcedata.features = features;
                var color = data[0].myLegend.result[0].color;
                color = rgb2hex(color);
                var size = data[0].myLegend.result[0].itemStyle.size;
                var opacity = data[0].myLegend.result[0].itemStyle.opacity;
                var shape = data[0].myLegend.result[0].itemStyle.shape;
                var mouseevent = data[0].myLegend.result[0].itemStyle.mouseevent;
                var showfield = data[0].myLegend.result[0].itemStyle.showfield;
                var field = data[0].myLegend.result[0].legendPosition.split(";")[0];
                var showfieldarr = showfield.split(",");
                var animate = data[0].myLegend.result[0].itemStyle.animate;
								var flowgrap = data[0].myLegend.result[0].itemStyle.flowgrap;
                const layer = new window.L7.LineLayer({})
                  .source(sourcedata)
                  .size(parseInt(size))
                  .shape(shape)
                  .color(color)
                  .style({
                    opacity: parseInt(opacity)
                  });
                  if (animate == "true") {
                    var duration = data[0].myLegend.result[0].itemStyle.duration;
                    var interval = data[0].myLegend.result[0].itemStyle.interval;
                    var trailLength = data[0].myLegend.result[0].itemStyle.trailLength;
                    layer.animate({
                      interval : parseInt(interval),
                      trailLength : parseInt(trailLength),
                      duration : parseInt(duration)
                    });
                  } else {
                    layer.animate(false);
                  }
                layer.on(mouseevent, (ev) => {//alert("鼠标左键点击图层事件");
                  var ddhtml = "<div class=\"popudiv\"><table class=\"poputable\">"
                  for (var i = 0; i < showfieldarr.length; i++) {
                    ddhtml += "<tr><th class = \"tdcolumnName\">" + showfieldarr[i] + ":</th>"
                      + "<td><span class=\"popu_span\">" + ev.feature.properties[showfieldarr[i]] + "</span>"
                      + "</td></tr>";
                  }
                  ddhtml += "</table></div>";
                  const popup = new window.L7.Popup({
                    offsets: [0, 0],
                    closeButton: false
                  })
                    .setLnglat(ev.lngLat)
                    .setHTML(ddhtml);
                  scene.addPopup(popup);

                });
                scene.addLayer(layer);
                if(flowgrap=="true"){//流向图
									//点数据source
									var pointsourcedata = {};
									pointsourcedata.type = "FeatureCollection";
									var pointfeatures = [];
									for (var i = 0; i < myMapTableFeatures.length; i++) {
										var feature = {};
										feature.type = myMapTableFeatures[i].type;
										feature.properties = data[0].myMapTable.features[i].properties;
										var geometry = {};
										geometry.type = "Point";
										var coordinates = [];
										coordinates[0] = parseFloat(myMapTableFeatures[i].properties[endpointX])
										coordinates[1] = parseFloat(myMapTableFeatures[i].properties[endpointY]);
										geometry.coordinates = coordinates;
										feature.geometry = geometry;
										pointfeatures.push(feature);
									}
									pointsourcedata.features = pointfeatures;
									const pointlayer = new  window.L7.PointLayer({})
										.source(pointsourcedata)
										.shape("circle")
										.color(color)
										.animate(true)
										.size(40)
										.style({
											opacity:parseInt(opacity)
										});
									scene.addLayer(pointlayer);
								}
              })
            }
            let tempOptionObj = {
              cptIndex: index,
              layerOption: result
            }
            store.dispatch(editCptOptionsList(tempOptionObj));

          }).catch(e => console.log("error", e));
        } else if ('路径动画' == type1) {//路径动画
          getSpecifyGeojson(chartId).then(function (result) {
            if (result.data) {
              console.log("接口没有数据")
            } else {
              var mapType = ""
              var style = "zyzx://vector_standard/styles/style.json";
              if (result && result[0]) {
                mapType = result[0].myLegend.result[0].itemStyle.maptype;
              }
              style = "zyzx://" + mapType + "/styles/style.json";
              map = new window.dmapgl.Map({
                container: timeKey,
                zoom: 8,
                minZoom: 8,
                maxZoom: 20,
                fadeDuration: 0,
                center: [503428.7804260254, 345586.30670166016],
                preserveDrawingBuffer: true,
                style: style
              });

              scene = new window.L7.Scene({
                id: timeKey,
                logoVisible: false,
                preserveDrawingBuffer: true,
                map: new window.L7.Mapbox({
                  mapInstance: map,
                }),
              });

              var data = result;
              scene.on('loaded', function () {
                var data = result;
                var sourcedata = data[0].myMapTable;
                var field = data[0].myLegend.result[0].fieldName;

                var opacity = data[0].myLegend.result[0].itemStyle.opacity;
                var linewidth = data[0].myLegend.result[0].itemStyle.linewidth;
                var lineheight = data[0].myLegend.result[0].itemStyle.lineheight;
                var showfield = data[0].myLegend.result[0].itemStyle.showfield;
                var showfieldarr = showfield.split(",");
                var mouseevent = data[0].myLegend.result[0].itemStyle.mouseevent;
                var lineType = data[0].myLegend.result[0].itemStyle.lineType;
                var animate = data[0].myLegend.result[0].itemStyle.animate;
                var duration = data[0].myLegend.result[0].itemStyle.duration;
                var interval = data[0].myLegend.result[0].itemStyle.interval;
                var trailLength = data[0].myLegend.result[0].itemStyle.trailLength;
                //  var valandcolors = data[0].myLegend.result[0].itemStyle.color;

                var colorarr = data[0].myLegend.result[0].itemStyle.tubysfa.split(",");
                const layer = new window.L7.LineLayer()
                  .source(sourcedata)
                  .size([parseInt(linewidth), parseInt(lineheight)])
                  .shape('line')
                  .color(field, colorarr)
                  .style({
                    lineType: lineType,
                  })
                if (animate == "true") {
                  animate = true;
                  layer.animate({
                    interval: parseInt(interval), // 间隔
                    duration: parseInt(duration), // 持续时间，延时
                    trailLength: parseInt(trailLength) // 流线长度
                  })
                } else {
                  animate = false;
                }
                layer.on(mouseevent, ev => {
                  if (ev.feature == 'null') {
                    return false;
                  }
                  var ddhtml = "<div class=\"popudiv\"><table class=\"poputable\">"
                  for (var i = 0; i < showfieldarr.length; i++) {
                    ddhtml += "<tr><th class = \"tdcolumnName\">" + showfieldarr[i] + ":</th>"
                      + "<td><span class=\"popu_span\">" + ev.feature.properties[showfieldarr[i]] + "</span>"
                      + "</td></tr>";
                  }
                  ddhtml += "</table></div>";
                  const popup = new window.L7.Popup({
                    offsets: [0, 0],
                    closeButton: false
                  })
                    .setLnglat(ev.lngLat)
                    .setHTML(ddhtml);
                  scene.addPopup(popup);
                });
                //var legendShow = data[0].myLegend.result[0].itemStyle.legendShow;
                // var legendOpacity = data[0].myLegend.result[0].itemStyle.legendOpacity;
                // var legendBackgroundColor = data[0].myLegend.result[0].itemStyle.legendBackgroundColor;
                // var legendPosition = data[0].myLegend.result[0].itemStyle.legendPosition;
                scene.addLayer(layer);
              })
            }
            let tempOptionObj = {
              cptIndex: index,
              layerOption: result
            }
            store.dispatch(editCptOptionsList(tempOptionObj));

          }).catch(e => console.log("error", e));
        } else if ('等值线图' == type1) {//等值线图
          getSpecifyGeojson(chartId).then(function (result) {
            if (result.data) {
              console.log("接口没有数据")
            } else {
              var mapType = ""
              var style = "zyzx://vector_standard/styles/style.json";
              if (result && result[0]) {
                mapType = result[0].myLegend.result[0].itemStyle.maptype;
              }
              style = "zyzx://" + mapType + "/styles/style.json";
              map = new window.dmapgl.Map({
                container: timeKey,
                zoom: 8,
                minZoom: 8,
                maxZoom: 20,
                fadeDuration: 0,
                center: [503428.7804260254, 345586.30670166016],
                preserveDrawingBuffer: true,
                style: style
              });

              scene = new window.L7.Scene({
                id: timeKey,
                logoVisible: false,
                preserveDrawingBuffer: true,
                map: new window.L7.Mapbox({
                  mapInstance: map,
                }),
              });

              var data = result;
              scene.on('loaded', function () {
                var data = result;
                var sourcedata = data[0].myMapTable;
                var field = data[0].myLegend.result[0].fieldName;

                var showfield = data[0].myLegend.result[0].itemStyle.showfield;
                var showfieldarr = showfield.split(",");
                var mouseevent = data[0].myLegend.result[0].itemStyle.mouseevent;
                var linewidth = data[0].myLegend.result[0].itemStyle.linewidth;
                var valandcolors = data[0].myLegend.result[0].itemStyle.color;
                var colorarr = data[0].myLegend.result[0].itemStyle.tubysfa.split(",");
                const layer = new window.L7.LineLayer()
                  .source(sourcedata)
                  .scale(field, {
                    type: 'quantile'
                  })
                  .size(field, h => {
                    var width = parseInt(linewidth);
                    var heigth = Math.sqrt(h);
                    return [width, heigth * 3];   //宽 高
                  })
                  .shape('line')
                  .color(field, (v) => {
                    var valandcolor = valandcolors.split(",");
                    for (var i = 0; i < valandcolor.length; i++) {
                      var minval = valandcolor[i].split("-")[0];
                      var maxval = valandcolor[i].split("-")[1];
                      var color = valandcolor[i].split("-")[2];
                      if (v > minval && v <= maxval) {
                        return color;
                      } else if (v == maxval) {
                        return color;
                      }
                    }
                  });
                layer.on(mouseevent, ev => {
                  if (ev.feature == 'null') {
                    return false;
                  }
                  var ddhtml = "<div class=\"popudiv\"><table class=\"poputable\">"
                  for (var i = 0; i < showfieldarr.length; i++) {
                    ddhtml += "<tr><th class = \"tdcolumnName\">" + showfieldarr[i] + ":</th>"
                      + "<td><span class=\"popu_span\">" + ev.feature.properties[showfieldarr[i]] + "</span>"
                      + "</td></tr>";
                  }
                  ddhtml += "</table></div>";
                  const popup = new window.L7.Popup({
                    offsets: [0, 0],
                    closeButton: false
                  })
                    .setLnglat(ev.lngLat)
                    .setHTML(ddhtml);
                  scene.addPopup(popup);
                });

                scene.addLayer(layer);
                /*var legendShow = data[0].myLegend.result[0].itemStyle.legendShow;
                var legendOpacity = data[0].myLegend.result[0].itemStyle.legendOpacity;
                var legendBackgroundColor = data[0].myLegend.result[0].itemStyle.legendBackgroundColor;
                var legendPosition = data[0].myLegend.result[0].itemStyle.legendPosition;
                var legendFontSize = data[0].myLegend.result[0].itemStyle.legendFontSize;
                var legendFontColor = data[0].myLegend.result[0].itemStyle.legendFontColor;*/
                //addDengzhixianLegends(values, colors,legendFontSize, legendFontColor, legendShow, legendOpacity, legendBackgroundColor, legendPosition);
              })
            }
            let tempOptionObj = {
              cptIndex: index,
              layerOption: result
            }
            store.dispatch(editCptOptionsList(tempOptionObj));

          }).catch(e => console.log("error", e));
        } else if (type1 == "liangdutu") {
          getSpecifyGeojson(chartId).then(function (result) {
            if (result.data) {
              console.log("接口没有数据")
            } else {
              var mapType = ""
              var style = "zyzx://vector_standard/styles/style.json";
              if (result && result[0]) {
                mapType = result[0].myLegend.result[0].itemStyle.maptype;
              }
              style = "zyzx://" + mapType + "/styles/style.json"
              map = new window.dmapgl.Map({
                container: timeKey,
                zoom: 8,
                minZoom: 3,
                maxZoom: 20,
                fadeDuration: 0,
                pitch: 1,
                center: [503428.7804260254, 345586.30670166016],
                preserveDrawingBuffer: true,
                style: style
              });

              var times = [];
              var groupfield = result[0].myLegend.result[0].itemStyle.groupfield;
              var timelidertime = result[0].myLegend.result[0].itemStyle.timelidertime;
              result.features = result[0].myMapTable.features.map(function (d) {
                /*times.push(d.properties.时间);*/
                times.push(d.properties[groupfield]);
                return d;
              });

              const scene = new window.L7.Scene({
                id: timeKey,
                logoVisible: false,
                preserveDrawingBuffer: true,
                map: new window.L7.Mapbox({
                  mapInstance: map,
                }),
              });

              scene.on('loaded', function () {
                var data = result;
                var sourcedata = data[0].myMapTable;
                var field = data[0].myLegend.result[0].fieldName;

                var radius = data[0].myLegend.result[0].itemStyle.radius;
                var opacity = data[0].myLegend.result[0].itemStyle.opacity;
                var showfield = data[0].myLegend.result[0].itemStyle.showfield;
                var showfieldarr = showfield.split(",");
                var mouseevent = data[0].myLegend.result[0].itemStyle.mouseevent;

                //  var animate = data[0].myLegend.result[0].itemStyle.animate;
                var valandcolors = data[0].myLegend.result[0].itemStyle.color;
                /* if (animate == "true") {
                     animate = true;
                 } else {
                     animate = false;
                 }*/
                var colorarr = data[0].myLegend.result[0].itemStyle.tubysfa.split(",");
                const layer = new window.L7.PointLayer({})
                  .source(sourcedata)
                  .shape('dot')
                  .size(field, [1, parseInt(radius)])
                  .color(field, function (v) {
                    // console.log("color" + v);
                    var valandcolor = valandcolors.split(",");
                    for (var i = 0; i < valandcolor.length; i++) {
                      var minval = valandcolor[i].split("-")[0];
                      var maxval = valandcolor[i].split("-")[1];
                      var color = valandcolor[i].split("-")[2];
                      if (v >= minval && v < maxval) {
                        return color;
                      } else if (v == maxval) {
                        return color;
                      }
                    }
                  })
                  .style({
                    opacity: parseFloat(opacity)
                  });

                layer.on(mouseevent, (ev) => {//alert("鼠标左键点击图层事件");
                  if (ev.feature == 'null') {
                    return false;
                  }
                  var ddhtml = "<div class=\"popudiv\"><table class=\"poputable\">"
                  for (var i = 0; i < showfieldarr.length; i++) {
                    ddhtml += "<tr><th class = \"tdcolumnName\">" + showfieldarr[i] + ":</th>"
                      + "<td><span class=\"popu_span\">" + ev.feature.properties.rawData[0][showfieldarr[i]] + "</span>"
                      + "</td></tr>";
                  }
                  ddhtml += "</table></div>";
                  const popup = new window.L7.Popup({
                    offsets: [0, 0],
                    closeButton: false
                  })
                    .setLnglat(ev.lngLat)
                    .setHTML(ddhtml);
                  scene.addPopup(popup);
                });
                scene.addLayer(layer);

              })
            }
            let tempOptionObj = {
              cptIndex: index,
              layerOption: result
            }
            store.dispatch(editCptOptionsList(tempOptionObj));
          }).catch(e => console.log("error", e));
        } else if (type1 == "timeslider") {
          getSpecifyGeojson(chartId).then(function (result) {
            if (result.data) {
              console.log("接口没有数据")
            } else {
              var mapType = ""
              var style = "zyzx://vector_standard/styles/style.json";
              if (result && result[0]) {
                mapType = result[0].myLegend.result[0].itemStyle.maptype;
              }
              style = "zyzx://" + mapType + "/styles/style.json"
              var mapType = ""
              var style = "zyzx://vector_standard/styles/style.json";
              if (result && result[0]) {
                mapType = result[0].myLegend.result[0].itemStyle.maptype;
              }
              style = "zyzx://" + mapType + "/styles/style.json"
              map = new window.dmapgl.Map({
                container: timeKey,
                zoom: 8,
                minZoom: 3,
                maxZoom: 20,
                fadeDuration: 0,
                pitch: 1,
                center: [503428.7804260254, 345586.30670166016],
                preserveDrawingBuffer: true,
                style: style
              });
              map.on('load', function () {
                addSKY(map);
                var data = result;
                var sourcedata = data[0].myMapTable;
                var field = data[0].myLegend.result[0].fieldName;

                var radius = data[0].myLegend.result[0].itemStyle.radius;
                var opacity = data[0].myLegend.result[0].itemStyle.opacity;
                var showfield = data[0].myLegend.result[0].itemStyle.showfield;
                var mouseevent = data[0].myLegend.result[0].itemStyle.mouseevent;

                var valandcolors = data[0].myLegend.result[0].itemStyle.color;
                var colorarr = data[0].myLegend.result[0].itemStyle.tubysfa.split(",");
                var times = [];

                data.features = data[0].myMapTable.features.map(function (d) {
                  times.push(d.properties.区县);
                  return d;
                });
                map.addSource('timeslider', {
                  'type': 'geojson',
                  data: data[0].myMapTable
                });
                $("#small").append('<div <div class="map-overlay top" style="margin-top: 10px;">'
                  + ' <img alt="" src="img/header/play.png" id="playpause"  width="30" height="30" style="float: left;" onclick="play()"/>'
                  + '<ul  id="timeline"  class="scroll" onclick="timelineSelect()"></ul>'
                  + '</div>');
                map.addLayer({
                  'id': 'timeslider-circles',
                  'type': 'circle',
                  'source': 'timeslider',
                  'paint': {
                    'circle-color': [
                      'interpolate',
                      ['linear'],
                      ['get', '数量'], //颜色
                      10, 'green',
                      20, 'purple',
                      30, 'red',
                      40, 'yellow',
                      50, 'blue'
                    ],
                    'circle-opacity': parseInt(opacity),
                    'circle-radius': [
                      'interpolate',
                      ['linear'],
                      ['get', '数量'], //大小
                      10, 10,
                      20, 20,
                      30, 30,
                      40, 40,
                      50, 50
                    ]
                  }
                });

                map.addLayer({
                  'id': 'timeslider-labels',
                  'type': 'symbol',
                  'source': 'timeslider',
                  'layout': {
                    'text-field': [
                      'concat',
                      ['to-string', ['get', field]],  //显示字段
                      ''
                    ],
                    'text-font': [
                      'Open Sans Bold',
                      'Arial Unicode MS Bold'
                    ],
                    'text-size': 12
                  },
                  'paint': {
                    'text-color': 'rgba(0,0,0,0.5)'
                  }
                })
              })
            }
            let tempOptionObj = {
              cptIndex: index,
              layerOption: result
            }
            store.dispatch(editCptOptionsList(tempOptionObj));
          }).catch(e => console.log("error", e));
        }
      } else if (layerType === "1") {
        map = new window.dmapgl.Map({
          container: timeKey,
          zoom: 8,
          minZoom: 8,
          maxZoom: 20,
          fadeDuration: 0,
          center: [
            503428.7804260254, 345586.30670166016
          ],
          preserveDrawingBuffer: true,
          style: 'zyzx://vector_standard/styles/style.json',
        });

        map.on('load', function () {
          addSKY(map);
          let dataShowVal = data.show;
          // let parentDom = window.parent.document;
          // let dataShow = parentDom.getElementById("dataShow").contentWindow;
          if (dataShowVal == "1") {
            addLayerWFS(data, map);
          } else if (dataShowVal == "2") {
            addLayerWMS(data, map);
          }
          /*getSpecify(chartId).then(result => {
              let tempOptionObj = {
                  cptIndex: index,
                  layerOption: result
              }
              store.dispatch(editCptOptionsList(tempOptionObj));
          }).catch(error => {
              console.info(error);
          });*/
        });
      } else {
        let tempSaveObj = {};
        if (layerType === "text") {
          let { textCenter, fontFamily, fontSize, fontColor, fontWeight, textAlign, writingMode, hyperlinkCenter, isNewWindow } = layerData;
          let { dataSourceUrl, dataSourceUrlFlag, title, titleFlag, playSpeed, playFlag, precision, precisionFlag, prefix, prefixFlag, suffix, suffixFlag } = layerData;
          tempSaveObj = {
            textCenter: {
              value: textCenter.value
            },
            dataSourceUrl,
            dataSourceUrlFlag,
            fontFamily,
            fontSize,
            fontColor,
            fontWeight,
            textAlign,
            writingMode,
            hyperlinkCenter,
            isNewWindow,
            title,
            titleFlag,
            playSpeed,
            playFlag,
            precision,
            precisionFlag,
            prefix,
            prefixFlag,
            suffix,
            suffixFlag
          };
        } else if (layerType === "media") {
          if (layerId === "iframeCenter") {
            let { iframeUrl } = layerData;
            tempSaveObj = {
              iframeUrl
            }
          } else if (layerId === "singleImage") {
            let { backgroundImage, repeat, radius, urlConfig } = layerData;
            let { url, ifBlank } = urlConfig;
            tempSaveObj = {
              backgroundImage: backgroundImage,
              repeat: repeat,
              radius: radius,
              urlConfig: {
                url: url,
                ifBlank: ifBlank
              }
            };
          } else if (layerId === "singleVideo") {
            let { url, autoplay, loop, controls, muted } = layerData;
            tempSaveObj = {
              url: url,
              autoplay: autoplay,
              loop: loop,
              controls: controls,
              muted: muted
            };
          } else {

          }
        } else if (layerType === "table") {
          if (layerId === "baseTable") {
            let { data, columns, config } = layerData;
            tempSaveObj = {
              data,
              columns,
              config,
            }
          } else if (layerId === "carouselList") {
            let { data, url, playSpeed, playFlag, tableHeader, tableBody, border } = layerData;
            tempSaveObj = {
              data,
              url,
              playSpeed,
              playFlag,
              tableHeader,
              tableBody,
              border
            }
          } else if (layerId === "scrollRanking") {
            let { data, url, rowNum, waitTime, carousel, unit } = layerData;
            tempSaveObj = {
              data,
              url,
              rowNum,
              waitTime,
              carousel,
              unit
            }
          } else {
          }
        } else if (layerType === "interaction") {
          if (layerId === "fullScreen") {
            let { color, size } = layerData;
            tempSaveObj = {
              color, size
            }
          } else if (layerId === "button") {
            let { text, bgcolor, font, hyperlink } = layerData;
            const { family, color, size, weight, textAlign, writingMode } = font;
            const { url, ifBlank } = hyperlink;
            let { } = text
            tempSaveObj = {
              text,
              bgcolor,
              // font,
              // hyperlink
              font: {
                family,
                size,
                color,
                weight,
                textAlign,
                writingMode
              },
              hyperlink: {
                url,
                ifBlank
              }
            }
          } else {
          }
        } else if (layerType === "material") {
          if (layerId === "singleBorder") {
            let { borderImage, borderWidth } = layerData;
            tempSaveObj = {
              borderImage,
              borderWidth,
            }
          } else if (layerId === "singleDecorate") {
            let { decorateImage } = layerData;
            tempSaveObj = {
              decorateImage,
            }
          } else if (layerId == "singleIcon") {
            let { iconImage, iconColor } = layerData;
            tempSaveObj = {
              iconImage,
              iconColor
            }
          } else if (layerId == "singleLiquid") {
            let { textCenter, url, format, font, liquid } = layerData;
            let { size, color } = font;
            let { fill, stroke, lineWidth } = liquid;
            tempSaveObj = {
              textCenter: {
                value: textCenter.value
              },
              url,
              format,
              font: {
                size,
                color
              },
              liquid: {
                fill,
                stroke,
                lineWidth
              }
            }
          } else if (layerId == "singleGauge") {
            let { textCenter, url, percent, font, gauge } = layerData;
            let { size, color } = font;
            let { beginColor, endColor } = gauge;
            tempSaveObj = {
              textCenter: {
                value: textCenter.value
              },
              url,
              font: {
                size,
                color
              },
              gauge: {
                beginColor,
                endColor
              }
            }
          } else if (layerId == "singleRingProgress") {
            let { textCenter, url, format, font, ringProgress } = layerData;
            let { size, color } = font;
            let { radius, innerRadius, fill, stroke, lineWidth } = ringProgress;
            tempSaveObj = {
              textCenter: {
                value: textCenter.value
              },
              url,
              format,
              font: {
                size,
                color
              },
              ringProgress: {
                radius,
                innerRadius,
                fill,
                stroke,
                lineWidth
              }
            }
          } else if (layerId == "singleBarProgress") {
            let { textCenter, url, barProgress } = layerData;
            let { status, strokeColor, strokeWidth } = barProgress;
            tempSaveObj = {
              textCenter: {
                value: textCenter.value
              },
              url,
              barProgress: {
                status,
                strokeColor,
                strokeWidth
              }
            }
          } else if (layerId == "singleRadialBar") {
            let { textCenter, url, radialBar } = layerData;
            let { type, radius, innerRadius, maxAngle, fill, stroke, lineWidth } = radialBar;
            tempSaveObj = {
              textCenter: {
                value: textCenter.value
              },
              url,
              radialBar: {
                type,
                radius,
                innerRadius,
                maxAngle,
                fill,
                stroke,
                lineWidth
              }
            }
          } else if (layerId == "singleRose") {
            let { textCenter, url, font, rose } = layerData;
            let { size, color } = font;
            let { radius, innerRadius, fill, stroke, lineWidth } = rose;
            tempSaveObj = {
              textCenter: {
                value: textCenter.value
              },
              url,
              font: {
                size,
                color
              },
              rose: {
                radius,
                innerRadius,
                fill,
                stroke,
                lineWidth
              }
            }
          } else if (layerId == "waterLevelPond") {
            let { textCenter, url, waterLevel } = layerData;
            tempSaveObj = {
              textCenter: {
                value: textCenter.value
              },
              url,
              waterLevel
            }
          }
        }
        let tempOptionObj = {
          cptIndex: index,
          layerOption: tempSaveObj
        }
        store.dispatch(editCptOptionsList(tempOptionObj));
      }
      arr.push(timeKey);
      mapObjArr.push({ layerId: timeKey, layerMap: map });
    })
    window.mapObjArr = mapObjArr;
    window.arr = arr;
  }
}

/**
 * 添加图表
 * @param data 图表数据
 * @param n 序号
 */
function addChart(data, timeId, addIndex, _this) {
  // let parentDom = window.parent.document;
  // let dataShow = parentDom.getElementById("dataShow").contentWindow;
  timeId = timeId.toString();
  var thType = data.thType;
  var type2 = data.type2;
  var catalogId = data.id;
  var map = {};
  var scene = {};
  var mapObjArr = window.mapObjArr ? window.mapObjArr : [];
  store.dispatch(addCptOptionsList(catalogId, []));
  if ("0" == thType) { //图表
    var type1 = data.type ? data.type : ''; //图表类型（饼、柱。。等）
    /*
     * 一般图表
     * THEMEPIE_CHART（一般饼状图）
     * THEMERADAR_CHART（一般雷达图）
     * THEMERING_CHART（一般圆环图）
     * THEMELINE_CHART（一般折线图）
     * THEMEHISTOGRAM（一般柱状图）
     * THEMEFUNNEL_CHART（漏斗图）
     * THEMEPYRAMID_CHART（金字塔图）
     * THEMEVERTBAR_SORT（一般叠加柱状图）
     * THEMEDASHBOARD (仪表盘）
     * THEMEHSANDIAN_CHART（散点图）
    */
    if ('THEMEPIE_CHART' == type1) {
      getSpecify(catalogId).then(function (result) {
        if (result.data) {
          console.log("接口没有数据")
        } else {
          if (result && result[0]) {
            new window.Pie(timeId, { data: result });
          }
        }
        let tempOptionObj = {
          cptIndex: addIndex,
          layerOption: result
        }
        store.dispatch(editCptOptionsList(tempOptionObj));

      }).catch(e => console.log("error", e));
    } else if ('THEMERADAR_CHART' == type1) {
      getSpecify(catalogId).then(function (result) {
        if (result.data) {
          console.log("接口没有数据")
        } else {
          if (result && result[0]) {
            new window.Radar(timeId, { data: result });
          }
        }
        let tempOptionObj = {
          cptIndex: addIndex,
          layerOption: result
        }
        store.dispatch(editCptOptionsList(tempOptionObj));

      }).catch(e => console.log("error", e));
    } else if ('THEMERING_CHART' == type1) {
      getSpecify(catalogId).then(function (result) {
        if (result.data) {
          console.log("接口没有数据")
        } else {
          if (result && result[0]) {
            new window.Ring(timeId, { data: result });
          }
        }
        let tempOptionObj = {
          cptIndex: addIndex,
          layerOption: result
        }
        store.dispatch(editCptOptionsList(tempOptionObj));

      }).catch(e => console.log("error", e));
    } else if ('THEMELINE_CHART' == type1) {
      getSpecify(catalogId).then(function (result) {
        if (result.data) {
          console.log("接口没有数据")
        } else {
          if (result && result[0]) {
            new window.Line(timeId, { data: result });
          }
        }
        let tempOptionObj = {
          cptIndex: addIndex,
          layerOption: result
        }
        store.dispatch(editCptOptionsList(tempOptionObj));

      }).catch(e => console.log("error", e));
    } else if ('THEMEHISTOGRAM' == type1 ||
              'xiangxingzhutu' ==type1||
              'dongtaizhutu'==type1) {
      getSpecify(catalogId).then(function (result) {
        if (result.data) {
          console.log("接口没有数据")
        } else {
          if (result && result[0]) {
            new window.Bar(timeId, { data: result });
          }
        }
        let tempOptionObj = {
          cptIndex: addIndex,
          layerOption: result
        }
        store.dispatch(editCptOptionsList(tempOptionObj));

      }).catch(e => console.log("error", e));
    } else if ('THEMEFUNNEL_CHART' == type1 ||
      'THEMEPYRAMID_CHART' == type1) {
      getSpecify(catalogId).then(function (result) {
        if (result.data) {
          console.log("接口没有数据")
        } else {
          if (result && result[0]) {
            new window.Funnel(timeId, { data: result });
          }
        }
        let tempOptionObj = {
          cptIndex: addIndex,
          layerOption: result
        }
        store.dispatch(editCptOptionsList(tempOptionObj));

      }).catch(e => console.log("error", e));
    } else if ('THEMEDASHBOARD' == type1) {
      getSpecify(catalogId).then(function (result) {
        if (result.data) {
          console.log("接口没有数据")
        } else {
          if (result && result[0]) {
            new window.Gauge(timeId, { data: result });
          }
        }
        let tempOptionObj = {
          cptIndex: addIndex,
          layerOption: result
        }
        store.dispatch(editCptOptionsList(tempOptionObj));

      }).catch(e => console.log("error", e));
    } else if ('THEMEHSANDIAN_CHART' == type1) {
      getSpecify(catalogId).then(function (result) {
        if (result.data) {
          console.log("接口没有数据")
        } else {
          if (result && result[0]) {
            new window.Scatter(timeId, { data: result });
          }
        }
        let tempOptionObj = {
          cptIndex: addIndex,
          layerOption: result
        }
        store.dispatch(editCptOptionsList(tempOptionObj));

      }).catch(e => console.log("error", e));
    }
    else if ('THEMEPIE' == type1 ||
      'THEMEBAR' == type1 ||
      'THEMECIRCULAR' == type1 ||
      'THEMECIRCLE' == type1 ||
      'THEMEHALFCIRCLE' == type1 ||
      'THEMEFAN' == type1 ||
      'THEMEGRID' == type1 ||
      'THEMEFANGW' == type1 ||
      'THEMEHALFCIRCLEGW' == type1 ||
      'THEMECIRCLEGW' == type1 ||
      'THEMESCATTER' == type1 ||
      'THEMEOD' == type1 ||
      'RLTLayer' == type1) {
      /*
       * 专题地图图表
       * THEMEPIE（饼状图）
       * THEMEBAR（柱状图）
       * THEMECIRCULAR（圆环图）
       * THEMECIRCLE（圆形图）
       * THEMEHALFCIRCLE（半圆图）
       * THEMEFAN（扇形图）
       * THEMEGRID（数据格网图）
       * THEMEFANGW（网格扇形图）
       * THEMEHALFCIRCLEGW（网格半圆图）
       * THEMECIRCLEGW（网格圆形图）
       * THEMESCATTER（散点图）
       * THEMEOD（OD图）
       * RLTLayer（数据热点图）
       */

      getSpecify(catalogId).then(function (result) {
        if (result.data) {
          console.log("接口没有数据")
        } else {
          var mapType = ""
          var style = "zyzx://vector_standard/styles/style.json";
          if (result && result[0]) {
            mapType = result[0].myLegend.result[0].itemStyle.maptype;
          }
          style = "zyzx://" + mapType + "/styles/style.json";
          map = new window.dmapgl.Map({
            container: timeId,
            zoom: 8,
            minZoom: 8,
            maxZoom: 20,
            fadeDuration: 0,
            center: [503428.7804260254, 345586.30670166016],
            preserveDrawingBuffer: true,
            style: style,
          });

          map.on('load', function () {
            addSKY(map);
            if (result && result[0]) {
              new window.dmapgl.EchartsTool(result[0], map);
            }
          });

        }
        let tempOptionObj = {
          cptIndex: addIndex,
          layerOption: result
        }
        store.dispatch(editCptOptionsList(tempOptionObj));
        mapObjArr.push({ layerId: timeId, layerMap: map });
        window.mapObjArr = mapObjArr;

      }).catch(e => console.log("error", e));
    } else if ('RESULTMAP' == type1) {//复合图
      getSpecify(catalogId).then(function (result) {
        if (result.data) {
          console.log("接口没有数据")
        } else {
          var mapType = ""
          var style = "zyzx://vector_standard/styles/style.json";
          if (result && result[0]) {
            mapType = result[0].myLegend.result[0].itemStyle.maptype;
          }
          style = "zyzx://" + mapType + "/styles/style.json";
          map = new window.dmapgl.Map({
            container: timeId,
            zoom: 8,
            minZoom: 8,
            maxZoom: 20,
            center: [503428.7804260254, 345586.30670166016],
            preserveDrawingBuffer: true,
            style: style,
          });

          map.on('load', function () {
            addSKY(map);
            if (result && result[0]) {
              new window.dmapgl.EchartsTool(result[0], map);
            }
            addLayerWFS(data, map);
          });
        }
        let tempOptionObj = {
          cptIndex: addIndex,
          layerOption: result
        }
        store.dispatch(editCptOptionsList(tempOptionObj));
        mapObjArr.push({ layerId: timeId, layerMap: map });
        window.mapObjArr = mapObjArr;
      }).catch(e => console.log("error", e));

    } if ('3DLINES' == type1) {//炫光线
      getSpecifyGeojson(catalogId).then(function (result) {
        if (result.data) {
          console.log("接口没有数据")
        } else {
          var mapType = ""
          var style = "zyzx://vector_standard/styles/style.json";
          if (result && result[0]) {
            mapType = result[0].myLegend.result[0].itemStyle.maptype;
          }
          style = "zyzx://" + mapType + "/styles/style.json";
          map = {
            container: timeId,
            center: [503032.01163424924, 305592.6132906107],
            preserveDrawingBuffer: true,
            zoom: 6,
            pitch: 1,
            bearing: 0,
            //   altitudeScale: 2,
            style: style,
            //  shading:'color',
            postEffect: {
              enable: true,
              screenSpaceAmbientOcclusion: {
                enable: true,
                intensity: 1.2,
                radius: 6,
                quality: 'high'
              },
              screenSpaceReflection: {
                enable: true
              }
            },
            light: {
              main: {
                intensity: 1,
                shadow: true,
                shadowQuality: 'high'
              },
              ambient: {
                intensity: 0.
              }
            }
          };
          if (result && result[0]) {
            new window.dmapgl.Line(result[0], map);
          }
        }
        let tempOptionObj = {
          cptIndex: addIndex,
          layerOption: result
        }
        store.dispatch(editCptOptionsList(tempOptionObj));
        mapObjArr.push({ layerId: timeId, layerMap: map });
        window.mapObjArr = mapObjArr;
      }).catch(e => console.log("error", e));
    }
    else if ('3DBAR' == type1 ||
      'GRID' == type1 ||
      'COLORSCALE' == type1) {//3D柱、网格、等级颜色
      getSpecifyGeojson(catalogId).then(function (result) {
        console.log(result)
        if (result.data) {
          console.log("接口没有数据")
        } else {
          var mapType = ""
          var style = "zyzx://vector_standard/styles/style.json";
          if (result && result[0]) {
            mapType = result[0].myLegend.result[0].itemStyle.maptype;
          }
          style = "zyzx://" + mapType + "/styles/style.json";
          console.log(style)
          map = new window.dmapgl.Map({
            container: timeId,
            zoom: 8,
            minZoom: 8,
            maxZoom: 20,
            fadeDuration: 0,
            center: [503428.7804260254, 345586.30670166016],
            preserveDrawingBuffer: true,
            style: style
          });
console.log(map)
          map.on('load', function () {
            addSKY(map);
            if (result && result[0]) {
              if ('3DBAR' == type1) {
                var s = new window.dmapgl.Bar(result[0], map, timeId);
              } else if ('GRID' == type1) {
                var s = new window.dmapgl.Grid(result[0], map, timeId);
              } else if ('COLORSCALE' == type1) {
                var s = new window.dmapgl.Grade(result[0], map, timeId);
                console.log(new window.dmapgl.Grade(result[0], map, timeId))
              }
            }
          });
        }
        let tempOptionObj = {
          cptIndex: addIndex,
          layerOption: result
        }
        store.dispatch(editCptOptionsList(tempOptionObj));
        mapObjArr.push({ layerId: timeId, layerMap: map });
        window.mapObjArr = mapObjArr;
      }).catch(e => console.log("error", e));

    } else if ('PointRLLayer' == type1) {
      getSpecifyGeojson(catalogId).then(function (result) {
        if (result.data) {
          console.log("接口没有数据")
        } else {
          var mapType = ""
          var style = "zyzx://vector_standard/styles/style.json";
          if (result && result[0]) {
            mapType = result[0].myLegend.result[0].itemStyle.maptype;
          }
          style = "zyzx://" + mapType + "/styles/style.json";
          map = new window.dmapgl.Map({
            container: timeId,
            zoom: 8,
            minZoom: 8,
            maxZoom: 20,
            fadeDuration: 0,
            center: [503428.7804260254, 345586.30670166016],
            preserveDrawingBuffer: true,
            style: style
          });
          map.on('load', function () {
            addSKY(map);
            if (result && result[0]) {
              new window.dmapgl.EchartsTool(result[0], map);
            }
          });
        }
        let tempOptionObj = {
          cptIndex: addIndex,
          layerOption: result
        }
        store.dispatch(editCptOptionsList(tempOptionObj));
        mapObjArr.push({ layerId: timeId, layerMap: map });
        window.mapObjArr = mapObjArr;
      }).catch(e => console.log("error", e));

    } else if (type1 == "3Dheatmap") {
      getSpecifyGeojson(catalogId).then(function (result) {
        if (result.data) {
          console.log("接口没有数据")
        } else {
          var mapType = ""
          var style = "zyzx://vector_standard/styles/style.json";
          if (result && result[0]) {
            mapType = result[0].myLegend.result[0].itemStyle.maptype;
          }
          style = "zyzx://" + mapType + "/styles/style.json";
          map = new window.dmapgl.Map({
            container: timeId,
            zoom: 8,
            minZoom: 8,
            maxZoom: 20,
            fadeDuration: 0,
            pitch: 60,
            center: [503428.7804260254, 345586.30670166016],
            preserveDrawingBuffer: true,
            style: style
          });

          scene = new window.L7.Scene({
            id: timeId,
            logoVisible: false,
            preserveDrawingBuffer: true,
            map: new window.L7.Mapbox({
              mapInstance: map,
            }),
          });

          var data = result;
          scene.on('loaded', function () {
            var sourcedata = data[0].myMapTable;
            var field = data[0].myLegend.result[0].fieldName;

            var radius = data[0].myLegend.result[0].itemStyle.radius;
            var opacity = data[0].myLegend.result[0].itemStyle.opacity;
            var shape = data[0].myLegend.result[0].itemStyle.shape;
            var type = data[0].myLegend.result[0].itemStyle.type;
            var showfield = data[0].myLegend.result[0].itemStyle.showfield;
            var showfieldarr = showfield.split(",");
            var mouseevent = data[0].myLegend.result[0].itemStyle.mouseevent;
            var fontsize = data[0].myLegend.result[0].itemStyle.fontsize;
            var fontcolor = data[0].myLegend.result[0].itemStyle.fontcolor;

            const layer = new window.L7.HeatmapLayer({});
            // var times = [];
            // var groupfield = data[0].myLegend.result[0].itemStyle.groupfield;
            // var timelidertime = data[0].myLegend.result[0].itemStyle.timelidertime;
            // data.features = data[0].myMapTable.features.map(function (d) {
            //   times.push(d.properties.时间);
            //   return d;
            // });
            if ("classicHeatType" == type) {//经典热力图
              var intensity = data[0].myLegend.result[0].itemStyle.intensity;
              var colorarr = data[0].myLegend.result[0].itemStyle.tubysfa.split(",");
              layer.source(sourcedata)
                .size(field, [0, 1])
                .shape(shape)
                .style({
                  intensity: parseInt(intensity),
                  radius: parseInt(radius),
                  opacity: parseInt(opacity),
                  rampColors: {
                    colors: colorarr,
                    positions: [0.0, 0.1, 0.3, 0.5, 0.7, 1.0]
                  }
                });
              // layer.filter(groupfield, (time) => {
              //   if (time === "2021") {
              //     return true; // 显示数据
              //   } else {
              //     return false; // 过滤掉
              //   }
              // })
              scene.addLayer(layer);
              var str = '<div style="height: 30px;background-image: linear-gradient(to right,' + data[0].myLegend.result[0].itemStyle.tubysfa + ');"></div>'
              $("#tulidiv").append(str);
            } else if ("honeycombHeatType" == type) {//蜂窝热力图
              var coverage = data[0].myLegend.result[0].itemStyle.coverage;
              var angle = data[0].myLegend.result[0].itemStyle.angle;
              var valandcolors = data[0].myLegend.result[0].itemStyle.color;
              layer.source(sourcedata, {
                transforms: [
                  {
                    type: 'hexagon',
                    size: parseInt(radius),
                    field: field,
                    method: 'sum'
                  }
                ]
              })
                .size('sum', function (v) {
                  v = Math.log(v + 1);
                  return v * 1000;
                })
                .shape(shape)
                .style({
                  coverage: parseInt(coverage),
                  angle: parseInt(angle),
                  opacity: parseInt(opacity)
                })
                .color(
                  'sum',
                  function (v) {
                    var valandcolor = valandcolors.split(",");
                    for (var i = 0; i < valandcolor.length; i++) {
                      var minval = valandcolor[i].split("-")[0];
                      var maxval = valandcolor[i].split("-")[1];
                      var color = valandcolor[i].split("-")[2];
                      if (v > minval && v <= maxval) {
                        return color;
                      } else if (v == maxval) {
                        return color;
                      }
                    }
                  }
                );
              var legendShow = data[0].myLegend.result[0].itemStyle.legendShow;
              var legendOpacity = data[0].myLegend.result[0].itemStyle.legendOpacity;
              var legendBackgroundColor = data[0].myLegend.result[0].itemStyle.legendBackgroundColor;
              var legendPosition = data[0].myLegend.result[0].itemStyle.legendPosition;
              //图例
              layer.on(mouseevent, (ev) => {//alert("鼠标左键点击图层事件");
                if (ev.feature == 'null') {
                  return false;
                }
                var ddhtml = "<div class=\"popudiv\"><table class=\"poputable\">"
                for (var i = 0; i < showfieldarr.length; i++) {
                  ddhtml += "<tr><th class = \"tdcolumnName\">" + showfieldarr[i] + ":</th>"
                    + "<td><span class=\"popu_span\">" + ev.feature.properties.rawData[0][showfieldarr[i]] + "</span>"
                    + "</td></tr>";
                }
                ddhtml += "</table></div>";
                const popup = new window.L7.Popup({
                  offsets: [0, 0],
                  closeButton: false
                })
                  .setLnglat(ev.lngLat)
                  .setHTML(ddhtml);
                scene.addPopup(popup);
              });
              scene.addLayer(layer);
            } else if ("gridHeatType" == type) {//网格热力图
              var coverage = data[0].myLegend.result[0].itemStyle.coverage;
              var angle = data[0].myLegend.result[0].itemStyle.angle;
              var valandcolors = data[0].myLegend.result[0].itemStyle.color;
              layer.source(sourcedata, {
                transforms: [
                  {
                    type: 'hexagon',
                    size: parseInt(radius),
                    field: field,
                    method: 'sum'
                  }
                ]
              })
                // .size('sum', [ 0, 600 ])
                .size('sum', function (v) {
                  v = Math.log(v + 1);
                  console.log(v);
                  return v * 1000;
                })
                .shape(shape)
                .style({
                  coverage: parseInt(coverage),
                  angle: parseInt(angle)
                })
                .color(
                  'sum',
                  //colorarr
                  function (v) {
                    var valandcolor = valandcolors.split(",");
                    for (var i = 0; i < valandcolor.length; i++) {
                      var minval = valandcolor[i].split("-")[0];
                      var maxval = valandcolor[i].split("-")[1];
                      var color = valandcolor[i].split("-")[2];
                      if (v >= minval && v < maxval) {
                        return color;
                      } else if (v == maxval) {
                        return color;
                      }
                    }
                  }
                );
              //图例
              layer.on(mouseevent, (ev) => {//alert("鼠标左键点击图层事件");
                if (ev.feature == 'null') {
                  return false;
                }
                var ddhtml = "<div class=\"popudiv\"><table class=\"poputable\">"
                for (var i = 0; i < showfieldarr.length; i++) {
                  ddhtml += "<tr><th class = \"tdcolumnName\">" + showfieldarr[i] + ":</th>"
                    + "<td><span class=\"popu_span\">" + ev.feature.properties.rawData[0][showfieldarr[i]] + "</span>"
                    + "</td></tr>";
                }
                ddhtml += "</table></div>";
                const popup = new window.L7.Popup({
                  offsets: [0, 0],
                  closeButton: false
                })
                  .setLnglat(ev.lngLat)
                  .setHTML(ddhtml);
                scene.addPopup(popup);
              });
              scene.addLayer(layer);
            }
          })
        }
        let tempOptionObj = {
          cptIndex: addIndex,
          layerOption: result
        }
        store.dispatch(editCptOptionsList(tempOptionObj));
        mapObjArr.push({ layerId: timeId, layerMap: map });
        window.mapObjArr = mapObjArr;
      }).catch(e => console.log("error", e));
    } else if (type1 == "qipao") {//气泡图
      getSpecifyGeojson(catalogId).then(function (result) {
        if (result.data) {
          console.log("接口没有数据")
        } else {
          var mapType = ""
          var style = "zyzx://vector_standard/styles/style.json";
          if (result && result[0]) {
            mapType = result[0].myLegend.result[0].itemStyle.maptype;
          }
          style = "zyzx://" + mapType + "/styles/style.json";
          map = new window.dmapgl.Map({
            container: timeId,
            zoom: 8,
            minZoom: 8,
            maxZoom: 20,
            fadeDuration: 0,
            pitch: 1,
            center: [503428.7804260254, 345586.30670166016],
            preserveDrawingBuffer: true,
            style: style
          });
          scene = new window.L7.Scene({
            id: timeId,
            logoVisible: false,
            preserveDrawingBuffer: true,
            map: new window.L7.Mapbox({
              mapInstance: map,
            }),
          });

          var data = result;
          scene.on('loaded', function () {
            var sourcedata = data[0].myMapTable;
            var field = data[0].myLegend.result[0].fieldName;

            var radius = data[0].myLegend.result[0].itemStyle.radius;
            var opacity = data[0].myLegend.result[0].itemStyle.opacity;
            var showfield = data[0].myLegend.result[0].itemStyle.showfield;
            var showfieldarr = showfield.split(",");
            var mouseevent = data[0].myLegend.result[0].itemStyle.mouseevent;
            var fontsize = data[0].myLegend.result[0].itemStyle.fontsize;
            var fontcolor = data[0].myLegend.result[0].itemStyle.fontcolor;
            var animate = data[0].myLegend.result[0].itemStyle.animate;
            var valandcolors = data[0].myLegend.result[0].itemStyle.color;
            if (animate == "true") {
              animate = true;
            } else {
              animate = false;
            }
            var colorarr = data[0].myLegend.result[0].itemStyle.tubysfa.split(",");
            const pointLayer = new window.L7.PointLayer({})
              .source(sourcedata)
              .shape('circle')
              .size(field, [1, parseInt(radius)])
              .color(field, function (v) {
                var valandcolor = valandcolors.split(",");
                for (var i = 0; i < valandcolor.length; i++) {
                  var minval = valandcolor[i].split("-")[0];
                  var maxval = valandcolor[i].split("-")[1];
                  var color = valandcolor[i].split("-")[2];
                  if (v >= minval && v < maxval) {
                    return color;
                  } else if (v == maxval) {
                    return color;
                  }
                }
              })
              .active(true)
              .animate(animate)
              .style({
                opacity: parseFloat(opacity)
              });
            //图例
            pointLayer.on(mouseevent, (ev) => {//alert("鼠标左键点击图层事件");
              var ddhtml = "<div class=\"popudiv\"><table class=\"poputable\">"
              for (var i = 0; i < showfieldarr.length; i++) {
                ddhtml += "<tr><th class = \"tdcolumnName\">" + showfieldarr[i] + ":</th>"
                  + "<td><span class=\"popu_span\">" + ev.feature.properties[showfieldarr[i]] + "</span>"
                  + "</td></tr>";
              }
              ddhtml += "</table></div>";
              const popup = new window.L7.Popup({
                offsets: [0, 0],
                closeButton: false
              })
                .setLnglat(ev.lngLat)
                .setHTML(ddhtml);
              scene.addPopup(popup);
            });
            scene.addLayer(pointLayer);
          })
        }
        let tempOptionObj = {
          cptIndex: addIndex,
          layerOption: result
        }
        store.dispatch(editCptOptionsList(tempOptionObj));
        mapObjArr.push({ layerId: timeId, layerMap: map });
        window.mapObjArr = mapObjArr;
      }).catch(e => console.log("error", e));

    }
    else if (type1 == "juhe") {//聚合图
      getSpecifyGeojson(catalogId).then(function (result) {
        if (result.data) {
          console.log("接口没有数据")
        } else {
          var mapType = ""
          var style = "zyzx://vector_standard/styles/style.json";
          if (result && result[0]) {
            mapType = result[0].myLegend.result[0].itemStyle.maptype;
          }
          style = "zyzx://" + mapType + "/styles/style.json";
          map = new window.dmapgl.Map({
            container: timeId,
            zoom: 8,
            minZoom: 8,
            maxZoom: 20,
            fadeDuration: 0,
            pitch: 1,
            center: [503428.7804260254, 345586.30670166016],
            preserveDrawingBuffer: true,
            style: style
          });
          scene = new window.L7.Scene({
            id: timeId,
            logoVisible: false,
            preserveDrawingBuffer: true,
            map: new window.L7.Mapbox({
              mapInstance: map,
            }),
          });
          scene.on('loaded', function () {
            var data = result;
            var sourcedata = data[0].myMapTable;
            var valandcolors = data[0].myLegend.result[0].itemStyle.color;
            var radius = data[0].myLegend.result[0].itemStyle.radius;
            var opacity = data[0].myLegend.result[0].itemStyle.opacity;
            var strokewidth = data[0].myLegend.result[0].itemStyle.strokewidth;
            var shapetype = data[0].myLegend.result[0].itemStyle.shapetype;
            const pointLayer = new window.L7.PointLayer({})
              .source(sourcedata, {
                cluster: true,
                clusterOption: {
                  radius: radius
                }
              })
              .shape(shapetype)
              .scale('point_count', {
                type: 'quantile'
              })
              .size('point_count', [5, 10, 15, 20])
              .active(true)
              .color('point_count', function (v) {
                var valandcolor = valandcolors.split(",");
                for (var i = 0; i < valandcolor.length; i++) {
                  var minval = valandcolor[i].split("-")[0];
                  var maxval = valandcolor[i].split("-")[1];
                  var color = valandcolor[i].split("-")[2];
                  if (v >= minval && v < maxval) {
                    return color;
                  } else if (v == maxval) {
                    return color;
                  }
                }
              })
              .style({
                opacity: parseFloat(opacity),
                strokeWidth: parseFloat(strokewidth),
              });
            //图例
            var fontsize = data[0].myLegend.result[0].itemStyle.legendFontSize;
            var fontcolor = data[0].myLegend.result[0].itemStyle.legendFontColor;
            var legendShow = data[0].myLegend.result[0].itemStyle.legendShow;
            var legendOpacity = data[0].myLegend.result[0].itemStyle.legendOpacity;
            var legendBackgroundColor = data[0].myLegend.result[0].itemStyle.legendBackgroundColor;
            var legendPosition = data[0].myLegend.result[0].itemStyle.legendPosition;
            scene.addLayer(pointLayer);
          })
        }
        let tempOptionObj = {
          cptIndex: addIndex,
          layerOption: result
        }
        store.dispatch(editCptOptionsList(tempOptionObj));
        mapObjArr.push({ layerId: timeId, layerMap: map });
        window.mapObjArr = mapObjArr;
      }).catch(e => console.log("error", e));

    } else if ('3DARC' == type1) {//3D弧形图
      getSpecifyGeojson(catalogId).then(function (result) {
        if (result.data) {
          console.log("接口没有数据")
        } else {
          var mapType = ""
          var style = "zyzx://vector_standard/styles/style.json";
          if (result && result[0]) {
            mapType = result[0].myLegend.result[0].itemStyle.maptype;
          }
          style = "zyzx://" + mapType + "/styles/style.json";
          map = new window.dmapgl.Map({
            container: timeId,
            zoom: 8,
            minZoom: 8,
            maxZoom: 20,
            fadeDuration: 0,
            center: [503428.7804260254, 345586.30670166016],
            preserveDrawingBuffer: true,
            style: style
          });

          scene = new window.L7.Scene({
            id: timeId,
            logoVisible: false,
            preserveDrawingBuffer: true,
            map: new window.L7.Mapbox({
              mapInstance: map,
            }),
          });

          var data = result;
          scene.on('loaded', function () {
            //起始点坐标字段
            var startpointX = data[0].myLegend.result[0].legendPosition.split(";")[1];
            var startpointY = data[0].myLegend.result[0].legendPosition.split(";")[2];

            var endpointX = data[0].myLegend.result[0].titlePosition.split(";")[1];
            var endpointY = data[0].myLegend.result[0].titlePosition.split(";")[2];

            var myMapTableFeatures = data[0].myMapTable.features;
            var sourcedata = {};
            sourcedata.type = "FeatureCollection";
            var features = [];
            for (var i = 0; i < myMapTableFeatures.length; i++) {
              var feature = {};
              feature.type = myMapTableFeatures[i].type;
              feature.properties = data[0].myMapTable.features[i].properties;
              var geometry = {};
              geometry.type = "LineString";
              var coordinates = [];
              var startcoordinates = [];
              startcoordinates[0] = myMapTableFeatures[i].properties[startpointX];
              startcoordinates[1] = myMapTableFeatures[i].properties[startpointY];
              var endcoordinates = [];
              endcoordinates[0] = myMapTableFeatures[i].properties[endpointX]
              endcoordinates[1] = myMapTableFeatures[i].properties[endpointY];
              coordinates.push(startcoordinates.map(Number));
              coordinates.push(endcoordinates.map(Number));
              geometry.coordinates = coordinates;
              feature.geometry = geometry;
              features.push(feature);
            }
            sourcedata.features = features;
            var color = data[0].myLegend.result[0].color;
            color = rgb2hex(color);
            var size = data[0].myLegend.result[0].itemStyle.size;
            var opacity = data[0].myLegend.result[0].itemStyle.opacity;
            var shape = data[0].myLegend.result[0].itemStyle.shape;
            var mouseevent = data[0].myLegend.result[0].itemStyle.mouseevent;
            var showfield = data[0].myLegend.result[0].itemStyle.showfield;
            var field = data[0].myLegend.result[0].legendPosition.split(";")[0];
            var showfieldarr = showfield.split(",");
            var animate = data[0].myLegend.result[0].itemStyle.animate;
            var flowgrap = data[0].myLegend.result[0].itemStyle.flowgrap;
            const layer = new window.L7.LineLayer({})
              .source(sourcedata)
              .size(parseInt(size))
              .shape(shape)
              .color(color)
              .style({
                opacity: parseInt(opacity)
              });
              if (animate == "true") {
                var duration = data[0].myLegend.result[0].itemStyle.duration;
                var interval = data[0].myLegend.result[0].itemStyle.interval;
                var trailLength = data[0].myLegend.result[0].itemStyle.trailLength;
                layer.animate({
                  interval : parseInt(interval),
                  trailLength : parseInt(trailLength),
                  duration : parseInt(duration)
                });
              } else {
                layer.animate(false);
              }
            layer.on(mouseevent, (ev) => {//alert("鼠标左键点击图层事件");
              var ddhtml = "<div class=\"popudiv\"><table class=\"poputable\">"
              for (var i = 0; i < showfieldarr.length; i++) {
                ddhtml += "<tr><th class = \"tdcolumnName\">" + showfieldarr[i] + ":</th>"
                  + "<td><span class=\"popu_span\">" + ev.feature.properties[showfieldarr[i]] + "</span>"
                  + "</td></tr>";
              }
              ddhtml += "</table></div>";
              const popup = new window.L7.Popup({
                offsets: [0, 0],
                closeButton: false
              })
                .setLnglat(ev.lngLat)
                .setHTML(ddhtml);
              scene.addPopup(popup);

            });
            scene.addLayer(layer);
            if(flowgrap=="true"){//流向图
              //点数据source
              var pointsourcedata = {};
              pointsourcedata.type = "FeatureCollection";
              var pointfeatures = [];
              for (var i = 0; i < myMapTableFeatures.length; i++) {
                var feature = {};
                feature.type = myMapTableFeatures[i].type;
                feature.properties = data[0].myMapTable.features[i].properties;
                var geometry = {};
                geometry.type = "Point";
                var coordinates = [];
                coordinates[0] = parseFloat(myMapTableFeatures[i].properties[endpointX])
                coordinates[1] = parseFloat(myMapTableFeatures[i].properties[endpointY]);
                geometry.coordinates = coordinates;
                feature.geometry = geometry;
                pointfeatures.push(feature);
              }
              pointsourcedata.features = pointfeatures;
              const pointlayer = new  window.L7.PointLayer({})
                .source(pointsourcedata)
                .shape("circle")
                .color(color)
                .animate(true)
                .size(40)
                .style({
                  opacity:parseInt(opacity)
                });
              scene.addLayer(pointlayer);
            }
          })
        }
        let tempOptionObj = {
          cptIndex: addIndex,
          layerOption: result
        }
        store.dispatch(editCptOptionsList(tempOptionObj));
        mapObjArr.push({ layerId: timeId, layerMap: map });
        window.mapObjArr = mapObjArr;
      }).catch(e => console.log("error", e));
    } else if ('路径动画' == type1) {//路径动画
      getSpecifyGeojson(catalogId).then(function (result) {
        if (result.data) {
          console.log("接口没有数据")
        } else {
          var mapType = ""
          var style = "zyzx://vector_standard/styles/style.json";
          if (result && result[0]) {
            mapType = result[0].myLegend.result[0].itemStyle.maptype;
          }
          style = "zyzx://" + mapType + "/styles/style.json";
          map = new window.dmapgl.Map({
            container: timeId,
            zoom: 8,
            minZoom: 8,
            maxZoom: 20,
            fadeDuration: 0,
            center: [503428.7804260254, 345586.30670166016],
            preserveDrawingBuffer: true,
            style: style
          });

          scene = new window.L7.Scene({
            id: timeId,
            logoVisible: false,
            preserveDrawingBuffer: true,
            map: new window.L7.Mapbox({
              mapInstance: map,
            }),
          });

          var data = result;
          scene.on('loaded', function () {
            var data = result;
            var sourcedata = data[0].myMapTable;
            var opacity = data[0].myLegend.result[0].itemStyle.opacity;
            var field = data[0].myLegend.result[0].fieldName;
            var linewidth = data[0].myLegend.result[0].itemStyle.linewidth;
            var lineheight = data[0].myLegend.result[0].itemStyle.lineheight;
            var showfield = data[0].myLegend.result[0].itemStyle.showfield;
            var showfieldarr = showfield.split(",");
            var mouseevent = data[0].myLegend.result[0].itemStyle.mouseevent;
            var lineType = data[0].myLegend.result[0].itemStyle.lineType;
            var animate = data[0].myLegend.result[0].itemStyle.animate;
            var duration = data[0].myLegend.result[0].itemStyle.duration;
            var interval = data[0].myLegend.result[0].itemStyle.interval;
            var trailLength = data[0].myLegend.result[0].itemStyle.trailLength;
            var colorarr = data[0].myLegend.result[0].itemStyle.tubysfa.split(",");
            const layer = new window.L7.LineLayer()
              .source(sourcedata)
              .size([parseInt(linewidth), parseInt(lineheight)])
              .shape('line')
              .color(field, colorarr)
              .style({
                lineType: lineType,
              })
            if (animate == "true") {
              animate = true;
              layer.animate({
                interval: parseInt(interval), // 间隔
                duration: parseInt(duration), // 持续时间，延时
                trailLength: parseInt(trailLength) // 流线长度
              })
            } else {
              animate = false;
            }
            layer.on(mouseevent, ev => {
              if (ev.feature == 'null') {
                return false;
              }
              var ddhtml = "<div class=\"popudiv\"><table class=\"poputable\">"
              for (var i = 0; i < showfieldarr.length; i++) {
                ddhtml += "<tr><th class = \"tdcolumnName\">" + showfieldarr[i] + ":</th>"
                  + "<td><span class=\"popu_span\">" + ev.feature.properties[showfieldarr[i]] + "</span>"
                  + "</td></tr>";
              }
              ddhtml += "</table></div>";
              const popup = new window.L7.Popup({
                offsets: [0, 0],
                closeButton: false
              })
                .setLnglat(ev.lngLat)
                .setHTML(ddhtml);
              scene.addPopup(popup);
            });
            //var legendShow = data[0].myLegend.result[0].itemStyle.legendShow;
            // var legendOpacity = data[0].myLegend.result[0].itemStyle.legendOpacity;
            // var legendBackgroundColor = data[0].myLegend.result[0].itemStyle.legendBackgroundColor;
            // var legendPosition = data[0].myLegend.result[0].itemStyle.legendPosition;
            scene.addLayer(layer);
          })
        }
        let tempOptionObj = {
          cptIndex: addIndex,
          layerOption: result
        }
        store.dispatch(editCptOptionsList(tempOptionObj));
        mapObjArr.push({ layerId: timeId, layerMap: map });
        window.mapObjArr = mapObjArr;

      }).catch(e => console.log("error", e));
    } else if ('等值线图' == type1) {//等值线图
      getSpecifyGeojson(catalogId).then(function (result) {
        if (result.data) {
          console.log("接口没有数据")
        } else {
          var mapType = ""
          var style = "zyzx://vector_standard/styles/style.json";
          if (result && result[0]) {
            mapType = result[0].myLegend.result[0].itemStyle.maptype;
          }
          style = "zyzx://" + mapType + "/styles/style.json";
          map = new window.dmapgl.Map({
            container: timeId,
            zoom: 8,
            minZoom: 8,
            maxZoom: 20,
            fadeDuration: 0,
            center: [503428.7804260254, 345586.30670166016],
            preserveDrawingBuffer: true,
            style: style
          });

          scene = new window.L7.Scene({
            id: timeId,
            logoVisible: false,
            preserveDrawingBuffer: true,
            map: new window.L7.Mapbox({
              mapInstance: map,
            }),
          });


          scene.on('loaded', function () {
            var data = result;
            var sourcedata = data[0].myMapTable;
            var field = data[0].myLegend.result[0].fieldName;

            var showfield = data[0].myLegend.result[0].itemStyle.showfield;
            var showfieldarr = showfield.split(",");
            var mouseevent = data[0].myLegend.result[0].itemStyle.mouseevent;
            var linewidth = data[0].myLegend.result[0].itemStyle.linewidth;

            var valandcolors = data[0].myLegend.result[0].itemStyle.color;
            var colorarr = data[0].myLegend.result[0].itemStyle.tubysfa.split(",");
            const layer = new window.L7.LineLayer()
              .source(sourcedata)
              .scale(field, {
                type: 'quantile'
              })
              .size(field, h => {
                var width = parseInt(linewidth);
                var heigth = Math.sqrt(h);
                return [width, heigth * 3];   //宽 高
              })
              .shape('line')
              .color(field, (v) => {
                var valandcolor = valandcolors.split(",");
                for (var i = 0; i < valandcolor.length; i++) {
                  var minval = valandcolor[i].split("-")[0];
                  var maxval = valandcolor[i].split("-")[1];
                  var color = valandcolor[i].split("-")[2];
                  if (v > minval && v <= maxval) {
                    return color;
                  } else if (v == maxval) {
                    return color;
                  }
                }
              });
            // .color(
            //   field,
            //   colorarr.reverse()
            // );
            layer.on(mouseevent, ev => {
              if (ev.feature == 'null') {
                return false;
              }
              var ddhtml = "<div class=\"popudiv\"><table class=\"poputable\">"
              for (var i = 0; i < showfieldarr.length; i++) {
                ddhtml += "<tr><th class = \"tdcolumnName\">" + showfieldarr[i] + ":</th>"
                  + "<td><span class=\"popu_span\">" + ev.feature.properties[showfieldarr[i]] + "</span>"
                  + "</td></tr>";
              }
              ddhtml += "</table></div>";
              const popup = new window.L7.Popup({
                offsets: [0, 0],
                closeButton: false
              })
                .setLnglat(ev.lngLat)
                .setHTML(ddhtml);
              scene.addPopup(popup);
            });
            scene.addLayer(layer);
            /*var legendShow = data[0].myLegend.result[0].itemStyle.legendShow;
            var legendOpacity = data[0].myLegend.result[0].itemStyle.legendOpacity;
            var legendBackgroundColor = data[0].myLegend.result[0].itemStyle.legendBackgroundColor;
            var legendPosition = data[0].myLegend.result[0].itemStyle.legendPosition;
            var legendFontSize = data[0].myLegend.result[0].itemStyle.legendFontSize;
            var legendFontColor = data[0].myLegend.result[0].itemStyle.legendFontColor;*/
            //addDengzhixianLegends(values, colors,legendFontSize, legendFontColor, legendShow, legendOpacity, legendBackgroundColor, legendPosition);
          })
        }
        let tempOptionObj = {
          cptIndex: addIndex,
          layerOption: result
        }
        store.dispatch(editCptOptionsList(tempOptionObj));
        mapObjArr.push({ layerId: timeId, layerMap: map });
        window.mapObjArr = mapObjArr;

      }).catch(e => console.log("error", e));
    } else if (type1 == "liangdutu") {
      getSpecifyGeojson(catalogId).then(function (result) {
        if (result.data) {
          console.log("接口没有数据")
        } else {
          var mapType = ""
          var style = "zyzx://vector_standard/styles/style.json";
          if (result && result[0]) {
            mapType = result[0].myLegend.result[0].itemStyle.maptype;
          }
          style = "zyzx://" + mapType + "/styles/style.json"
          map = new window.dmapgl.Map({
            container: timeId,
            zoom: 8,
            minZoom: 3,
            maxZoom: 20,
            fadeDuration: 0,
            pitch: 1,
            center: [503428.7804260254, 345586.30670166016],
            preserveDrawingBuffer: true,
            style: style
          });

          var times = [];
          var groupfield = result[0].myLegend.result[0].itemStyle.groupfield;
          var timelidertime = result[0].myLegend.result[0].itemStyle.timelidertime;
          result.features = result[0].myMapTable.features.map(function (d) {
            /*times.push(d.properties.时间);*/
            times.push(d.properties[groupfield]);
            return d;
          });

          const scene = new window.L7.Scene({
            id: timeId,
            logoVisible: false,
            preserveDrawingBuffer: true,
            map: new window.L7.Mapbox({
              mapInstance: map,
            }),
          });

          scene.on('loaded', function () {
            var data = result;
            var sourcedata = data[0].myMapTable;
            var field = data[0].myLegend.result[0].fieldName;

            var radius = data[0].myLegend.result[0].itemStyle.radius;
            var opacity = data[0].myLegend.result[0].itemStyle.opacity;
            var showfield = data[0].myLegend.result[0].itemStyle.showfield;
            var showfieldarr = showfield.split(",");
            var mouseevent = data[0].myLegend.result[0].itemStyle.mouseevent;

            //  var animate = data[0].myLegend.result[0].itemStyle.animate;
            var valandcolors = data[0].myLegend.result[0].itemStyle.color;
            /* if (animate == "true") {
                 animate = true;
             } else {
                 animate = false;
             }*/
            var colorarr = data[0].myLegend.result[0].itemStyle.tubysfa.split(",");
            const layer = new window.L7.PointLayer({})
              .source(sourcedata)
              .shape('dot')
              .size(field, [1, parseInt(radius)])
              .color(field, function (v) {
                // console.log("color" + v);
                var valandcolor = valandcolors.split(",");
                for (var i = 0; i < valandcolor.length; i++) {
                  var minval = valandcolor[i].split("-")[0];
                  var maxval = valandcolor[i].split("-")[1];
                  var color = valandcolor[i].split("-")[2];
                  if (v >= minval && v < maxval) {
                    return color;
                  } else if (v == maxval) {
                    return color;
                  }
                }
              })
              .style({
                opacity: parseFloat(opacity)
              });

            layer.on(mouseevent, (ev) => {//alert("鼠标左键点击图层事件");
              if (ev.feature == 'null') {
                return false;
              }
              var ddhtml = "<div class=\"popudiv\"><table class=\"poputable\">"
              for (var i = 0; i < showfieldarr.length; i++) {
                ddhtml += "<tr><th class = \"tdcolumnName\">" + showfieldarr[i] + ":</th>"
                  + "<td><span class=\"popu_span\">" + ev.feature.properties.rawData[0][showfieldarr[i]] + "</span>"
                  + "</td></tr>";
              }
              ddhtml += "</table></div>";
              const popup = new window.L7.Popup({
                offsets: [0, 0],
                closeButton: false
              })
                .setLnglat(ev.lngLat)
                .setHTML(ddhtml);
              scene.addPopup(popup);
            });
            scene.addLayer(layer);

          })
        }
        let tempOptionObj = {
          cptIndex: index,
          layerOption: result
        }
        store.dispatch(editCptOptionsList(tempOptionObj));
        mapObjArr.push({ layerId: timeId, layerMap: map });
        window.mapObjArr = mapObjArr;
      }).catch(e => console.log("error", e));
    } else if (type1 == "timeslider") {
      getSpecifyGeojson(catalogId).then(function (result) {
        if (result.data) {
          console.log("接口没有数据")
        } else {
          var mapType = ""
          var style = "zyzx://vector_standard/styles/style.json";
          if (result && result[0]) {
            mapType = result[0].myLegend.result[0].itemStyle.maptype;
          }
          style = "zyzx://" + mapType + "/styles/style.json"
          var mapType = ""
          var style = "zyzx://vector_standard/styles/style.json";
          if (result && result[0]) {
            mapType = result[0].myLegend.result[0].itemStyle.maptype;
          }
          style = "zyzx://" + mapType + "/styles/style.json"
          map = new window.dmapgl.Map({
            container: timeId,
            zoom: 8,
            minZoom: 3,
            maxZoom: 20,
            fadeDuration: 0,
            pitch: 1,
            center: [503428.7804260254, 345586.30670166016],
            preserveDrawingBuffer: true,
            style: style
          });
          map.on('load', function () {
            addSKY(map);
            var data = result;
            var sourcedata = data[0].myMapTable;
            var field = data[0].myLegend.result[0].fieldName;

            var radius = data[0].myLegend.result[0].itemStyle.radius;
            var opacity = data[0].myLegend.result[0].itemStyle.opacity;
            var showfield = data[0].myLegend.result[0].itemStyle.showfield;
            var mouseevent = data[0].myLegend.result[0].itemStyle.mouseevent;

            var valandcolors = data[0].myLegend.result[0].itemStyle.color;
            var colorarr = data[0].myLegend.result[0].itemStyle.tubysfa.split(",");
            var times = [];

            data.features = data[0].myMapTable.features.map(function (d) {
              times.push(d.properties.区县);
              return d;
            });
            map.addSource('timeslider', {
              'type': 'geojson',
              data: data[0].myMapTable
            });
            $("#small").append('<div <div class="map-overlay top" style="margin-top: 10px;">'
              + ' <img alt="" src="img/header/play.png" id="playpause"  width="30" height="30" style="float: left;" onclick="play()"/>'
              + '<ul  id="timeline"  class="scroll" onclick="timelineSelect()"></ul>'
              + '</div>');
            map.addLayer({
              'id': 'timeslider-circles',
              'type': 'circle',
              'source': 'timeslider',
              'paint': {
                'circle-color': [
                  'interpolate',
                  ['linear'],
                  ['get', '数量'], //颜色
                  10, 'green',
                  20, 'purple',
                  30, 'red',
                  40, 'yellow',
                  50, 'blue'
                ],
                'circle-opacity': parseInt(opacity),
                'circle-radius': [
                  'interpolate',
                  ['linear'],
                  ['get', '数量'], //大小
                  10, 10,
                  20, 20,
                  30, 30,
                  40, 40,
                  50, 50
                ]
              }
            });

            map.addLayer({
              'id': 'timeslider-labels',
              'type': 'symbol',
              'source': 'timeslider',
              'layout': {
                'text-field': [
                  'concat',
                  ['to-string', ['get', field]],  //显示字段
                  ''
                ],
                'text-font': [
                  'Open Sans Bold',
                  'Arial Unicode MS Bold'
                ],
                'text-size': 12
              },
              'paint': {
                'text-color': 'rgba(0,0,0,0.5)'
              }
            })
          })
        }
        let tempOptionObj = {
          cptIndex: index,
          layerOption: result
        }
        store.dispatch(editCptOptionsList(tempOptionObj));
      }).catch(e => console.log("error", e));
    }

  } else if ("1" == thType) { //wms或wfs
    var service = data.service;
    var layername = data.layername;
    var name = data.name;
    var renderer = data.renderer
      ? data.renderer
      : ''; //wms样式
    map = new window.dmapgl.Map({
      container: timeId,
      zoom: 8,
      minZoom: 8,
      maxZoom: 20,
      fadeDuration: 0,
      center: [
        503428.7804260254, 345586.30670166016
      ],
      preserveDrawingBuffer: true,
      style: 'zyzx://vector_standard/styles/style.json',
    });
    map.on('load', function () {
      addSKY(map);
      if (data.show == "1") {
        addLayerWFS(data, map);
      } else if (data.show == "2") {
        addLayerWMS(data, map);
      }
      /*getSpecify(catalogId).then(result => {
          let tempOptionObj = {
              cptIndex: addIndex,
              layerOption: result
          }
          store.dispatch(editCptOptionsList(tempOptionObj));
      }).catch(error => {
          console.info(error);
      });*/
    });
    mapObjArr.push({ layerId: timeId, layerMap: map });
    window.mapObjArr = mapObjArr;

  }

  /*mapObjArr.push({layerId: timeId, layerMap: map});
  window.mapObjArr = mapObjArr;*/
}

/**
 * 添加一般、精准、范围点线面样式（实时加载）
 * @param renderer
 * @returns
 */
function addLayerWFS(obj, map) {
  var userName = getCookie("userName");
  var renderer = obj.renderer;
  console.info(renderer);
  var layername = userName + "." + obj.layername;
  var rxml = $.parseXML(renderer);
  var group1 = $(rxml).find('GROUPRENDERER');
  var tagName = group1[0].firstChild.tagName;

  //var group2 = $(group1).find('GROUPRENDERER');
  if ('GROUPRENDERER' == tagName) { //字体符号库
    var truettypemarkersymbol = $(group1).find('TRUETYPEMARKERSYMBOL');
    var url = typeObj.project + 'GIMSNEW?request=GetFeature&service=WFS&version=1.0.0&recbox=437442.469,257' +
      '025.703,582446.812,414679.125&searchType=recsearch&typename=' + layername;
    $.ajax({
      type: "GET",
      url: url,
      async: false,
      success: function (data) {
        var img = truettypemarkersymbol.attr('img');
        map.loadImage(img, (error, data) => {
          map.addImage(layername, data);
        });

        var listElements = $(data).find('gml\\:featureMember');
        var json = '[';
        if (listElements.length > 0) {
          $(listElements)
            .each(function () {
              var id = $($(this).find('esri\\:OBJECTID')[0]).text();
              var coord = $($(this).find('gml\\:coordinates')[0]).text();
              var coord1 = coord
                .split(' ')
                .join(',');
              json += '{"type":"Feature","geometry":{"type":"Point","coordinates":[' + coord1 + ']},"properties":{"icon":" point-h"}},';
            });
          json = json.substring(0, json.length - 1);
        }

        json += ']';
        var fatures = JSON.parse(json);

        map.addLayer({
          "id": layername,
          "type": "symbol",
          "source": {
            "type": "geojson",
            "data": {
              "type": "FeatureCollection",
              "features": fatures
            }
          },
          "layout": {
            'icon-image': layername,
            'icon-size': 1,
            'icon-allow-overlap': true
          }
        });
      }
    });
  } else {
    var simplerenderer = $(group1).find('SIMPLERENDERER');
    var type = simplerenderer.attr('name');
    if ('一般点样式' == type) {
      var grouperenderer = $(simplerenderer).find('GROUPRENDERER');
      var styleName = grouperenderer.attr('styleName');
      var fuhaokuName = grouperenderer.attr('fuhaokuName');
      var simplemarkersymbol = $(grouperenderer).find('SIMPLEMARKERSYMBOL');

      var url = typeObj.project + 'GIMSNEW?request=GetFeature&service=WFS&version=1.0.0&recbox=437442.469,257' +
        '025.703,582446.812,414679.125&searchType=recsearch&typename=' + layername;
      $.ajax({
        type: "GET",
        url: url,
        async: false,
        success: function (data) {
          var color = simplemarkersymbol.attr('color');
          var width = parseInt(simplemarkersymbol.attr('width'));
          var carr = color.split(',');

          var bytesPerPixel = 4; // Each pixel is represented by 4 bytes: red, green, blue, and alpha.
          var imgData = new Uint8Array(width * width * bytesPerPixel);

          if (styleName == 'square') { //正方形
            for (var x = 0; x < width; x++) {
              for (var y = 0; y < width; y++) {
                var offset = (y * width + x) * bytesPerPixel;
                imgData[offset + 0] = parseInt(carr[0]); // red
                imgData[offset + 1] = parseInt(carr[1]); // green
                imgData[offset + 2] = parseInt(carr[2]); // blue
                imgData[offset + 3] = 255; // alpha
              }
            }
          } else if (styleName == 'cross') { //十字
            var half = Math.floor(width / 2);
            for (var x = 0; x < width; x++) {
              for (var y = 0; y < width; y++) {
                if (x == half || y == half) {
                  var offset = (y * width + x) * bytesPerPixel;
                  imgData[offset + 0] = parseInt(carr[0]); // red
                  imgData[offset + 1] = parseInt(carr[1]); // green
                  imgData[offset + 2] = parseInt(carr[2]); // blue
                  imgData[offset + 3] = 255; // alpha
                }
              }
            }
          }

          if (!map.hasImage(layername)) {
            map.addImage(layername, {
              width: width,
              height: width,
              data: imgData
            });
          }

          var listElements = $(data).find('gml\\:featureMember');
          var json = '[';
          if (listElements.length > 0) {
            $(listElements)
              .each(function () {
                var id = $($(this).find('esri\\:OBJECTID')[0]).text();
                var coord = $($(this).find('gml\\:coordinates')[0]).text();
                var coord1 = coord
                  .split(' ')
                  .join(',');
                json += '{"type":"Feature","geometry":{"type":"Point","coordinates":[' + coord1 + ']},"properties":{"icon":" point-h"}},';
              });
            json = json.substring(0, json.length - 1);
          }

          json += ']';
          var fatures = JSON.parse(json);

          map.addLayer({
            "id": layername,
            "type": "symbol",
            "source": {
              "type": "geojson",
              "data": {
                "type": "FeatureCollection",
                "features": fatures
              }
            },
            "layout": {
              'icon-image': layername/*,
						    'icon-size' : 1,
						    'icon-allow-overlap' : true*/
            }
          });
        }
      });

    } else if ('精准点样式' == type) {
      var valuemaprenderer = $(simplerenderer).find('VALUEMAPRENDERER');
      var lookupfield = $(valuemaprenderer).attr('lookupfield');
      var exacts = $(valuemaprenderer).find('EXACT');
      recursionJZFW(type, layername, map, exacts, lookupfield, 0);
    } else if ('范围点样式' == type) {
      var valuemaprenderer = $(simplerenderer).find('VALUEMAPRENDERER');
      var lookupfield = $(valuemaprenderer).attr('lookupfield');
      var ranges = $(valuemaprenderer).find('RANGE');
      recursionJZFW(type, layername, map, ranges, lookupfield, 0);
    } else if ('栅格点样式' == type) {
      var symbol = $(simplerenderer).find('SIMPLEMARKERSYMBOL');
      var sbsj=symbol.attr("sbsj");
      var sbsjzszd=symbol.attr("sbsjzszd").split(",");
      var icon = symbol.attr('icon');
      if (!map.hasImage(icon)) {
        map
            .loadImage(typeObj.project + 'SymbolLib?request=icon&icon=symbollib/' + icon + '.png', function (error, image) {
              map.addImage(icon, image);
            });
      }
      var url = typeObj.project + 'GIMSNEW?request=GetFeature&service=WFS&version=1.0.0&recbox=437442.469,257' +
          '025.703,582446.812,414679.125&searchType=recsearch&typename=' + layername;
      $.ajax({
        type: "GET",
        url: url,
        async: false,
        success: function (data) {

          var listElements = $(data).find("gml\\:featureMember");
          var json = "[";
          if (listElements.length > 0) {
            $(listElements).each(function () {
              var id = $($(this).find("esri\\:OBJECTID")[0]).text();
              var coord = $($(this).find("gml\\:coordinates")[0]).text();
              var coord1 = coord.split(" ").join(",");
              var sbsjzdarr=[]
              json += '{"type":"Feature","geometry":{"type":"Point","coordinates":[' +
                  coord1 +']},"properties":{';
              for (var i = 0; i < sbsjzszd.length; i++) {
                sbsjzdarr[i]=$($(this).find("esri\\:"+sbsjzszd[i])[0]).text()
                json += '"'+sbsjzszd[i]+'":"'+sbsjzdarr[i]+'",'
              }
              json.substring(0, json.lastIndexOf(','))
              json +=	'"icon":" point-h"}},';
            });

            json = json.substring(0, json.length - 1);
          }

          json += "]";
          var fatures = JSON.parse(json);

          map.addLayer({
            "id": layername,
            "type": "symbol",
            "source": {
              "type": "geojson",
              "data": {
                "type": "FeatureCollection",
                "features": fatures
              }
            },
            "layout": {
              'icon-image': icon,
              'icon-size': 1,
              'icon-allow-overlap': true
            }
          });
          map.on(sbsj,layername, function(e) {
            var coordinates = e.features[0].geometry.coordinates.slice();
            var properties = e.features[0].properties;
            console.log(properties)
            var sbtable='<div style="padding-top:10px"><table style="text-align: center;font-size:12px; table-layout:fixed">'
            var flag=0
            for (var i = 0; i < sbsjzszd.length; i++) {
              var sbsjzszdd=sbsjzszd[i]
              if(flag==0){
                flag=1;
                sbtable+='<tr><td width="120px" style="padding: 10px 0px;border: 1px solid #999;background-color: #f2f2f2;">'+sbsjzszd[i]+':'+'</td>'+'<td width="230px" style="border: 1px solid #999;background-color: #f2f2f2;">'+properties[sbsjzszdd]+'</td>'+'</tr>'
              }else{
                flag=0;
                sbtable+='<tr><td width="120px" style="padding: 10px 0px;border: 1px solid #999;background-color:#fff">'+sbsjzszd[i]+':'+'</td>'+'<td  width="230px" style="border: 1px solid #999;background-color: "#fff";>'+properties[sbsjzszdd]+'</td>'+'</tr>'
              }

            }
            sbtable+='</table></div>'
            new window.dmapgl.Popup()
                .setLngLat(coordinates)
                .setHTML(sbtable)
                .addTo(map)
          });
        }
      });

    } else if ('一般线样式' == type) {
      var simplinesymbol = $(simplerenderer).find('SIMPLELINESYMBOL');
      var width = parseInt(simplinesymbol.attr('width'));
      var color = simplinesymbol.attr('color');

      var url = typeObj.project + 'GIMSNEW?request=GetFeature&service=WFS&version=1.0.0&recbox=437442.469,257' +
        '025.703,582446.812,414679.125&searchType=recsearch&typename=' + layername;
      $.ajax({
        type: "GET",
        url: url,
        async: false,
        success: function (data) {

          var listElements = $(data).find('gml\\:featureMember');
          var json = '[';
          if (listElements.length > 0) {
            var listElements = $(data).find('gml\\:featureMember');
            $(listElements).each(function () {
              var id = $($(this).find('esri\\:OBJECTID')[0]).text();
              var coord = $($(this).find('gml\\:coordinates')[0]).text();
              var coordArr1 = coord.split(';');
              var cds = '[';
              for (var j = 0; j < coordArr1.length; j++) {
                var coodObj = coordArr1[j];
                var x = parseFloat(coodObj.split(' ')[0]);
                var y = parseFloat(coodObj.split(' ')[1]);
                cds += '[' + x + ',' + y + '],'
              }
              cds = cds.substring(0, cds.length - 1);
              cds += ']';
              json += '{"type":"Feature","geometry":{"type":"LineString","coordinates":' + cds + '},"properties":{"objectid":"' + id + '"}},';

            });
            json = json.substring(0, json.length - 1);
          }

          json += ']';
          var fatures = JSON.parse(json);

          map.addLayer({
            'id': layername,
            'type': 'line',
            'source': {
              "type": "geojson",
              "data": {
                "type": "FeatureCollection",
                "features": fatures
              }
            },
            'paint': {
              'line-color': 'rgb(' + color + ')',
              'line-width': width
            }
          });
        }
      });
    } else if ('精准线样式' == type) {
      var valuemaprenderer = $(simplerenderer).find('VALUEMAPRENDERER');
      var lookupfield = $(valuemaprenderer).attr('lookupfield');
      var exacts = $(valuemaprenderer).find('EXACT');
      recursionJZFW(type, layername, map, exacts, lookupfield, 0);
    } else if ('范围线样式' == type) {
      var valuemaprenderer = $(simplerenderer).find('VALUEMAPRENDERER');
      var lookupfield = $(valuemaprenderer).attr('lookupfield');
      var ranges = $(valuemaprenderer).find('RANGE');
      recursionJZFW(type, layername, map, ranges, lookupfield, 0);
    } else if ('一般面样式' == type) {
      var simplepolygonsymbol = $(simplerenderer).find('SIMPLEPOLYGONSYMBOL');
      //var width = parseInt(simplepolygonsymbol.attr('width'));
      var fillcolor = simplepolygonsymbol.attr('fillcolor');
      var boundarycolor = simplepolygonsymbol.attr('boundarycolor');
      var filltransparency = parseInt(simplepolygonsymbol.attr('filltransparency'));

      var url = typeObj.project + 'GIMSNEW?request=GetFeature&service=WFS&version=1.0.0&recbox=437442.469,257' +
        '025.703,582446.812,414679.125&searchType=recsearch&typename=' + layername;
      $.ajax({
        type: "GET",
        url: url,
        async: false,
        success: function (data) {

          var listElements = $(data).find('gml\\:featureMember');
          var json = '[';
          if (listElements.length > 0) {
            var listElements = $(data).find('gml\\:featureMember');
            $(listElements).each(function () {
              var id = $($(this).find('esri\\:OBJECTID')[0]).text();
              var coord = $($(this).find('gml\\:coordinates')[0]).text();
              var coordArr1 = coord.split(';');
              var cds = '[';
              for (var j = 0; j < coordArr1.length; j++) {
                var coodObj = coordArr1[j];
                var x = parseFloat(coodObj.split(' ')[0]);
                var y = parseFloat(coodObj.split(' ')[1]);
                cds += '[' + x + ',' + y + '],'
              }
              cds = cds.substring(0, cds.length - 1);
              cds += ']';
              json += '{"type":"Feature","geometry":{"type":"Polygon","coordinates":[' + cds + ']},"properties":{"objectid":"' + id + '"}},';

            });

            json = json.substring(0, json.length - 1);
          }

          json += ']';
          var fatures = JSON.parse(json);

          map.addLayer({
            'id': layername,
            'type': 'fill',
            'source': {
              "type": "geojson",
              "data": {
                "type": "FeatureCollection",
                "features": fatures
              }
            },
            'paint': {
              'fill-color': 'rgb(' + fillcolor + ')',
              'fill-opacity': 1,
              'fill-outline-color': 'rgb(' + boundarycolor + ')'
            }
          });
        }
      });
    } else if ('精准面样式' == type) {
      var valuemaprenderer = $(simplerenderer).find('VALUEMAPRENDERER');
      var lookupfield = $(valuemaprenderer).attr('lookupfield');
      var exacts = $(valuemaprenderer).find('EXACT');
      recursionJZFW(type, layername, map, exacts, lookupfield, 0);
    } else if ('范围面样式' == type) {
      var valuemaprenderer = $(simplerenderer).find('VALUEMAPRENDERER');
      var lookupfield = $(valuemaprenderer).attr('lookupfield');
      var ranges = $(valuemaprenderer).find('RANGE');
      recursionJZFW(type, layername, map, ranges, lookupfield, 0);
    }
  }

}

function addLayerWMS(obj, map) {
  var userName = getCookie("userName");
  var name = obj.name;
  var layername = userName + "." + obj.layername;
  var service = obj.service;
  var id = service + "-" + layername + "-" + name;
  map.addLayer({
    'id': id,
    'type': 'raster',
    'source': {
      'type': 'raster',
      'tiles': ['zyzx://GovEMap/wms?service=' + service + '&request=GetMap&version=1.1.1&layers=&styles=&format=image%2Fpng&transparent=tru' +
        'e&CapitalCharacter=false&crs=&height=256&width=256&layername=' + layername + '&name=' + name + '&continuousWorld=true&BBOX={bbox-epsg-3857}'],
      'tileSize': 256
    },
    'paint': {}
  });
}

/**
 * 递归加载精准、范围的点线面图层
 * @returns
 */
function recursionJZFW(type, layername, map, arr, field, index) {
  var obj = arr[index];
  if ('精准点样式' == type) {
    var value = $(obj).attr('value');
    var fuhaokuName = $(obj).attr('fuhaokuName');
    var simplemarkersymbol = $(obj).find('SIMPLEMARKERSYMBOL');
    var truettypemarkersymbol = $(obj).find('TRUETYPEMARKERSYMBOL');
    var url = typeObj.project + 'GIMSNEW?request=GetFeature&service=WFS&version=1.0.0&recbox=437442.469,257' +
      '025.703,582446.812,414679.125&searchType=recsearch&typename=' + layername + '&Filter=' + encodeURIComponent('<Filter><PropertyIsEqualTo><PropertyName>' + field + '</PropertyName><Literal>' + value + '</Literal></PropertyIsEqualTo></Filter>');
    $.ajax({
      type: "GET",
      url: url,
      async: false,
      success: function (data) {
        var listElements = $(data).find('gml\\:featureMember');
        var json = '[';
        if (listElements.length > 0) {
          $(listElements)
            .each(function () {
              var id = $($(this).find('esri\\:OBJECTID')[0]).text();
              var coord = $($(this).find('gml\\:coordinates')[0]).text();
              var coord1 = coord
                .split(' ')
                .join(',');
              json += '{"type":"Feature","geometry":{"type":"Point","coordinates":[' + coord1 + ']},"properties":{"icon":" point-h"}},';
            });
          json = json.substring(0, json.length - 1);
        }

        json += ']';
        var fatures = JSON.parse(json);

        if (fuhaokuName == "基础符号库") {
          var styleName = $(obj).attr("styleName");
          var grouperenderer = $(obj).find("GROUPRENDERER");
          var simplemarkersymbol = $(grouperenderer).find("SIMPLEMARKERSYMBOL");
          var color = simplemarkersymbol.attr("color");
          var width = parseInt(simplemarkersymbol.attr("width"));
          var carr = color.split(",");

          var bytesPerPixel = 4; // Each pixel is represented by 4 bytes: red, green, blue, and alpha.
          var imgData = new Uint8Array(width * width * bytesPerPixel);

          if (styleName == "square") {
            //正方形
            for (var x = 0; x < width; x++) {
              for (var y = 0; y < width; y++) {
                var offset = (y * width + x) * bytesPerPixel;
                imgData[offset + 0] = parseInt(carr[0]); // red
                imgData[offset + 1] = parseInt(carr[1]); // green
                imgData[offset + 2] = parseInt(carr[2]); // blue
                imgData[offset + 3] = 255; // alpha
              }
            }
          } else if (styleName == "cross") {
            //十字
            var half = Math.floor(width / 2);
            for (var x = 0; x < width; x++) {
              for (var y = 0; y < width; y++) {
                if (x == half || y == half) {
                  var offset = (y * width + x) * bytesPerPixel;
                  imgData[offset + 0] = parseInt(carr[0]); // red
                  imgData[offset + 1] = parseInt(carr[1]); // green
                  imgData[offset + 2] = parseInt(carr[2]); // blue
                  imgData[offset + 3] = 255; // alpha
                }
              }
            }
          }

          if (!map.hasImage(layername + index)) {
            map.addImage(layername + index, {
              width: width,
              height: width,
              data: imgData,
            });
          }

          map.addLayer({
            id: layername + index,
            type: "symbol",
            source: {
              type: "geojson",
              data: {
                type: "FeatureCollection",
                features: fatures,
              },
            },
            layout: {
              "icon-image": layername + index,
            },
          });
        } else if (fuhaokuName == '栅格图标') {
          var icon = simplemarkersymbol.attr('icon');
          if (!map.hasImage(icon)) {
            map
              .loadImage(typeObj.project + 'SymbolLib?request=icon&icon=symbollib/' + icon + '.png', function (error, image) {
                map.addImage(icon, image);
              });
          }
          map.addLayer({
            "id": layername + index,
            "type": "symbol",
            "source": {
              "type": "geojson",
              "data": {
                "type": "FeatureCollection",
                "features": fatures
              }
            },
            "layout": {
              'icon-image': icon,
              'icon-size': 1,
              'icon-allow-overlap': true
            }
          });
        } else if (fuhaokuName == '字体符号库') {
          var img = truettypemarkersymbol.attr('img');
          map.loadImage(img, (error, data) => {
            map.addImage(layername + index, data);
          });
          map.addLayer({
            "id": layername + index,
            "type": "symbol",
            "source": {
              "type": "geojson",
              "data": {
                "type": "FeatureCollection",
                "features": fatures
              }
            },
            "layout": {
              'icon-image': layername + index,
              'icon-size': 1,
              'icon-allow-overlap': true
            }
          });
        }
        index++;
        if (index < arr.length) {
          recursionJZFW(type, layername, map, arr, field, index);
        }
      }
    });
  } else if ('范围点样式' == type) {
    var lower = $(obj).attr('lower');
    var upper = $(obj).attr('upper');
    var fuhaokuName = $(obj).attr('fuhaokuName')
    var simplemarkersymbol = $(obj).find('SIMPLEMARKERSYMBOL');
    var truettypemarkersymbol = $(obj).find('TRUETYPEMARKERSYMBOL');
    var url = typeObj.project + 'GIMSNEW?request=GetFeature&service=WFS&version=1.0.0&recbox=437442.469,257' +
      '025.703,582446.812,414679.125&searchType=recsearch&typename=' + layername + '&Filter=' + encodeURIComponent('<ogc:Filter><PropertyIsBetween><PropertyName>' + field + '</PropertyName><LowerBoundary>' + lower + '</LowerBoundary><UpperBoundary>' + upper + '</UpperBoundary></PropertyIsBetween></ogc:Filter>');
    $.ajax({
      type: "GET",
      url: url,
      async: false,
      success: function (data) {
        var listElements = $(data).find('gml\\:featureMember');
        var json = '[';
        if (listElements.length > 0) {
          $(listElements)
            .each(function () {
              var id = $($(this).find('esri\\:OBJECTID')[0]).text();
              var coord = $($(this).find('gml\\:coordinates')[0]).text();
              var coord1 = coord
                .split(' ')
                .join(',');
              json += '{"type":"Feature","geometry":{"type":"Point","coordinates":[' + coord1 + ']},"properties":{"icon":" point-h"}},';
            });
          json = json.substring(0, json.length - 1);
        }

        json += ']';
        var fatures = JSON.parse(json);

        if (fuhaokuName == '栅格图标') {
          var icon = simplemarkersymbol.attr('icon');
          if (!map.hasImage(icon)) {
            map
              .loadImage(typeObj.project + 'SymbolLib?request=icon&icon=symbollib/' + icon + '.png', function (error, image) {
                map.addImage(icon, image);
              });
          }
          map.addLayer({
            "id": layername + index,
            "type": "symbol",
            "source": {
              "type": "geojson",
              "data": {
                "type": "FeatureCollection",
                "features": fatures
              }
            },
            "layout": {
              'icon-image': icon,
              'icon-size': 1,
              'icon-allow-overlap': true
            }
          });
        } else if (fuhaokuName == '字体符号库') {
          var img = truettypemarkersymbol.attr('img');
          map.loadImage(img, (error, data) => {
            map.addImage(layername + index, data);
          });
          map.addLayer({
            "id": layername + index,
            "type": "symbol",
            "source": {
              "type": "geojson",
              "data": {
                "type": "FeatureCollection",
                "features": fatures
              }
            },
            "layout": {
              'icon-image': layername + index,
              'icon-size': 1,
              'icon-allow-overlap': true
            }
          });
        }
        index++;
        if (index < arr.length) {
          recursionJZFW(type, layername, map, arr, field, index);
        }
      }
    });
  } else if ('精准线样式' == type) {
    var value = $(obj).attr('value');
    var simplelinesymbol = $(obj).find('SIMPLELINESYMBOL');
    var url = typeObj.project + 'GIMSNEW?request=GetFeature&service=WFS&version=1.0.0&recbox=437442.469,257' +
      '025.703,582446.812,414679.125&searchType=recsearch&typename=' + layername + '&Filter=' + encodeURIComponent('<Filter><PropertyIsEqualTo><PropertyName>' + field + '</PropertyName><Literal>' + value + '</Literal></PropertyIsEqualTo></Filter>');
    $.ajax({
      type: "GET",
      url: url,
      async: false,
      success: function (data) {
        var width = parseInt(simplelinesymbol.attr('width'));
        var color = simplelinesymbol.attr('color');

        var listElements = $(data).find('gml\\:featureMember');
        var json = '[';
        if (listElements.length > 0) {
          var listElements = $(data).find('gml\\:featureMember');
          $(listElements).each(function () {
            var id = $($(this).find('esri\\:OBJECTID')[0]).text();
            var coord = $($(this).find('gml\\:coordinates')[0]).text();
            var coordArr1 = coord.split(';');
            var cds = '[';
            for (var j = 0; j < coordArr1.length; j++) {
              var coodObj = coordArr1[j];
              var x = parseFloat(coodObj.split(' ')[0]);
              var y = parseFloat(coodObj.split(' ')[1]);
              cds += '[' + x + ',' + y + '],'
            }
            cds = cds.substring(0, cds.length - 1);
            cds += ']';
            json += '{"type":"Feature","geometry":{"type":"LineString","coordinates":' + cds + '},"properties":{"objectid":"' + id + '"}},';

          });
          json = json.substring(0, json.length - 1);
        }

        json += ']';
        var fatures = JSON.parse(json);

        map.addLayer({
          'id': layername + index,
          'type': 'line',
          'source': {
            "type": "geojson",
            "data": {
              "type": "FeatureCollection",
              "features": fatures
            }
          },
          'paint': {
            'line-color': 'rgb(' + color + ')',
            'line-width': width
          }
        });

        index++;
        if (index < arr.length) {
          recursionJZFW(type, layername, map, arr, field, index);
        }
      }
    });
  } else if ('范围线样式' == type) {
    var lower = $(obj).attr('lower');
    var upper = $(obj).attr('upper');
    var simplelinesymbol = $(obj).find('SIMPLELINESYMBOL');
    var url = typeObj.project + 'GIMSNEW?request=GetFeature&service=WFS&version=1.0.0&recbox=437442.469,257' +
      '025.703,582446.812,414679.125&searchType=recsearch&typename=' + layername + '&Filter=' + encodeURIComponent('<ogc:Filter><PropertyIsBetween><PropertyName>' + field + '</PropertyName><LowerBoundary>' + lower + '</LowerBoundary><UpperBoundary>' + upper + '</UpperBoundary></PropertyIsBetween></ogc:Filter>');
    $.ajax({
      type: "GET",
      url: url,
      async: false,
      success: function (data) {
        var width = parseInt(simplelinesymbol.attr('width'));
        var color = simplelinesymbol.attr('color');

        var listElements = $(data).find('gml\\:featureMember');
        var json = '[';
        if (listElements.length > 0) {
          var listElements = $(data).find('gml\\:featureMember');
          $(listElements).each(function () {
            var id = $($(this).find('esri\\:OBJECTID')[0]).text();
            var coord = $($(this).find('gml\\:coordinates')[0]).text();
            var coordArr1 = coord.split(';');
            var cds = '[';
            for (var j = 0; j < coordArr1.length; j++) {
              var coodObj = coordArr1[j];
              var x = parseFloat(coodObj.split(' ')[0]);
              var y = parseFloat(coodObj.split(' ')[1]);
              cds += '[' + x + ',' + y + '],'
            }
            cds = cds.substring(0, cds.length - 1);
            cds += ']';
            json += '{"type":"Feature","geometry":{"type":"LineString","coordinates":' + cds + '},"properties":{"objectid":"' + id + '"}},';

          });
          json = json.substring(0, json.length - 1);
        }

        json += ']';
        var fatures = JSON.parse(json);

        map.addLayer({
          'id': layername + index,
          'type': 'line',
          'source': {
            "type": "geojson",
            "data": {
              "type": "FeatureCollection",
              "features": fatures
            }
          },
          'paint': {
            'line-color': 'rgb(' + color + ')',
            'line-width': width
          }
        });

        index++;
        if (index < arr.length) {
          recursionJZFW(type, layername, map, arr, field, index);
        }
      }
    });
  } else if ('精准面样式' == type) {
    var value = $(obj).attr('value');
    var simplepolygonsymbol = $(obj).find('SIMPLEPOLYGONSYMBOL');
    var url = typeObj.project + 'GIMSNEW?request=GetFeature&service=WFS&version=1.0.0&recbox=437442.469,257' +
      '025.703,582446.812,414679.125&searchType=recsearch&typename=' + layername + '&Filter=' + encodeURIComponent('<Filter><PropertyIsEqualTo><PropertyName>' + field + '</PropertyName><Literal>' + value + '</Literal></PropertyIsEqualTo></Filter>');
    $.ajax({
      type: "GET",
      url: url,
      async: false,
      success: function (data) {
        var fillcolor = simplepolygonsymbol.attr('fillcolor');
        var boundarycolor = simplepolygonsymbol.attr('boundarycolor');
        var filltransparency = parseInt(simplepolygonsymbol.attr('filltransparency'));

        var listElements = $(data).find('gml\\:featureMember');
        var json = '[';
        if (listElements.length > 0) {
          var listElements = $(data).find('gml\\:featureMember');
          $(listElements).each(function () {
            var id = $($(this).find('esri\\:OBJECTID')[0]).text();
            var coord = $($(this).find('gml\\:coordinates')[0]).text();
            var coordArr1 = coord.split(';');
            var cds = '[';
            for (var j = 0; j < coordArr1.length; j++) {
              var coodObj = coordArr1[j];
              var x = parseFloat(coodObj.split(' ')[0]);
              var y = parseFloat(coodObj.split(' ')[1]);
              cds += '[' + x + ',' + y + '],'
            }
            cds = cds.substring(0, cds.length - 1);
            cds += ']';
            json += '{"type":"Feature","geometry":{"type":"Polygon","coordinates":[' + cds + ']},"properties":{"objectid":"' + id + '"}},';

          });

          json = json.substring(0, json.length - 1);
        }

        json += ']';
        var fatures = JSON.parse(json);

        map.addLayer({
          'id': layername + index,
          'type': 'fill',
          'source': {
            "type": "geojson",
            "data": {
              "type": "FeatureCollection",
              "features": fatures
            }
          },
          'paint': {
            'fill-color': 'rgb(' + fillcolor + ')',
            'fill-opacity': filltransparency,
            'fill-outline-color': 'rgb(' + boundarycolor + ')'
          }
        });

        index++;
        if (index < arr.length) {
          recursionJZFW(type, layername, map, arr, field, index);
        }
      }
    });
  } else if ('范围面样式' == type) {
    var lower = $(obj).attr('lower');
    var upper = $(obj).attr('upper');
    var simplepolygonsymbol = $(obj).find('SIMPLEPOLYGONSYMBOL');
    var url = typeObj.project + 'GIMSNEW?request=GetFeature&service=WFS&version=1.0.0&recbox=437442.469,257' +
      '025.703,582446.812,414679.125&searchType=recsearch&typename=' + layername + '&Filter=' + encodeURIComponent('<ogc:Filter><PropertyIsBetween><PropertyName>' + field + '</PropertyName><LowerBoundary>' + lower + '</LowerBoundary><UpperBoundary>' + upper + '</UpperBoundary></PropertyIsBetween></ogc:Filter>');
    $.ajax({
      type: "GET",
      url: url,
      async: false,
      success: function (data) {
        var fillcolor = simplepolygonsymbol.attr('fillcolor');
        var boundarycolor = simplepolygonsymbol.attr('boundarycolor');
        var filltransparency = parseInt(simplepolygonsymbol.attr('filltransparency'));

        var listElements = $(data).find('gml\\:featureMember');
        var json = '[';
        if (listElements.length > 0) {
          var listElements = $(data).find('gml\\:featureMember');
          $(listElements).each(function () {
            var id = $($(this).find('esri\\:OBJECTID')[0]).text();
            var coord = $($(this).find('gml\\:coordinates')[0]).text();
            var coordArr1 = coord.split(';');
            var cds = '[';
            for (var j = 0; j < coordArr1.length; j++) {
              var coodObj = coordArr1[j];
              var x = parseFloat(coodObj.split(' ')[0]);
              var y = parseFloat(coodObj.split(' ')[1]);
              cds += '[' + x + ',' + y + '],'
            }
            cds = cds.substring(0, cds.length - 1);
            cds += ']';
            json += '{"type":"Feature","geometry":{"type":"Polygon","coordinates":[' + cds + ']},"properties":{"objectid":"' + id + '"}},';

          });

          json = json.substring(0, json.length - 1);
        }

        json += ']';
        var fatures = JSON.parse(json);

        map.addLayer({
          'id': layername + index,
          'type': 'fill',
          'source': {
            "type": "geojson",
            "data": {
              "type": "FeatureCollection",
              "features": fatures
            }
          },
          'paint': {
            'fill-color': 'rgb(' + fillcolor + ')',
            'fill-opacity': filltransparency,
            'fill-outline-color': 'rgb(' + boundarycolor + ')'
          }
        });

        index++;
        if (index < arr.length) {
          recursionJZFW(type, layername, map, arr, field, index);
        }
      }
    });
  }
}

/**
 * 将地图加载完之后,加载地图上面的数据
 * @param map 地图对象
 * @param data 地图加载的数据
 */
function initMapData(map, data) {
  var userName = getCookie("userName");
  /* var renderer = data.renderer;
  var layername = userName+"."+data.layername;
var rxml = $.parseXML(renderer);
var group1 = $(rxml).find('GROUPRENDERER');
  var tagName = group1[0].firstChild.tagName;
  if('GROUPRENDERER' == tagName){

  }else{

  } */
}

//获取相应cookie的值
function getCookie(cookie_name) {
  var allcookies = document.cookie;
  var cookie_pos = allcookies.indexOf(cookie_name); //索引的长度
  // 如果找到了索引，就代表cookie存在， 反之，就说明不存在。
  if (cookie_pos != -1) {
    // 把cookie_pos放在值的开始，只要给值加1即可。
    cookie_pos += cookie_name.length + 1; //这里容易出问题，所以请大家参考的时候自己好好研究一下
    var cookie_end = allcookies.indexOf(";", cookie_pos);

    if (cookie_end == -1) {
      cookie_end = allcookies.length;
    }
    var value = unescape(allcookies.substring(cookie_pos, cookie_end)); //这里就可以得到你想要的cookie的值了。。。
  }
  return value;
}
function rgb2hex(rgb) {
  if (rgb.charAt(0) == '#')
    return rgb;
  var ds = rgb.split(/\D+/);
  var decimal = Number(ds[0]) * 65536 + Number(ds[1]) * 256 + Number(ds[2]);
  return "#" + zero_fill_hex(decimal, 6);
}
function zero_fill_hex(num, digits) {
  var s = num.toString(16);
  while (s.length < digits)
    s = "0" + s;
  return s;
}


function addSKY(map) {
  map.addLayer({
    'id' : 'sky',
    'type' : 'sky',
    'paint' : {
      // 设置天空图层，使用颜色梯度
      'sky-type' : 'gradient',
      //中央的天空最亮，向外移动天空就会变暗
      //这模拟了太阳在地平线以下的样子
      'sky-gradient' : [
        'interpolate',
        [ 'linear' ],
        [ 'sky-radial-progress' ],
        0.8,
        'rgba(135, 206, 235, 1.0)',
        1,
        'rgba(0,0,0,0.1)'
      ],
      'sky-gradient-center' : [ 0, 0 ],
      'sky-gradient-radius' : 90,
      'sky-opacity' : [
        'interpolate',
        [ 'exponential', 0.1 ],
        [ 'zoom' ],
        5,
        0,
        22,
        1
      ]
    }
  });
}
