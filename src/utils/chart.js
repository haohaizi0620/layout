/*
 * @Author: your name
 * @Date: 2020-01-06 12:08:04
 * @LastEditTime: 2020-03-27 19:25:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \layout\src\utils\chart.js
 */
import store from '../redux/store';
import {getSpecify, getMapDataWFS, getRecursionMap} from '../api/api';
import {addCptOptionsList, editCptOptionsList} from '../redux/actions/showLayerDatas';
import $ from 'jquery';
let chartTestData = require('../datasource/chartTestData.json');
let otherDefaultData = require('../datasource/otherDefaultData.json');
const chartData = require('../datasource/chartDatas.json');
const projectType = "/data/";// "/data/"
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
                    new window.dmapgl.commonlyCharts(timeKey, {data: newOptions});
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
                    if (chartState === "update") {} else {
                        if (mapObj.layerMap) {
                            mapObj
                                .layerMap
                                .resize();
                        }
                    }
                }
            }
        }
    } else if (otherObj && otherObj.state === "headerAdd"){
        let layerType = "chart";
        let chartId = 101;
        chartData.map(item => {
            if (item.id === chartName) {
                layerType = item.layerType;
                chartId = item.chartId;
            }
        })
        if (!flag) {
            if (layerType === "text" || layerType === "border" || layerType === "iframe"|| layerType === "decorate"||layerType === "table" || layerType === "image" ) {
                arr.push(timeKey);
                mapObjArr.push({layerId: timeKey, layerMap: {}});
                window.arr = arr;
                window.mapObjArr = mapObjArr;
                let tempSaveObj = {};
                if (layerType === "border") {
                    tempSaveObj = otherDefaultData.border;
                } else if (layerType === "text") {
                    let textCenterVal = "标题";
                    if (chartName === "multiLineText") {
                        textCenterVal = "这是一个可以换行的文本.......";
                    } else if (chartName === "moreRowText") {
                        textCenterVal = "";
                    }
                    let tempTextObj = otherDefaultData.text;
                    tempTextObj.textCenter.value = textCenterVal;
                    tempSaveObj = tempTextObj;
                } else if (layerType === "iframe") {
                    tempSaveObj = otherDefaultData.iframe;
                }else if (layerType === "table") {
                    tempSaveObj = otherDefaultData.table;
                }else if (layerType === "image") {
                    if(chartName === "singleImage"){
                        tempSaveObj = otherDefaultData.singleImage;
                    }
                } else if (layerType === "decorate"){
                    tempSaveObj = otherDefaultData.decorate;
                }
                store.dispatch(addCptOptionsList(chartId, tempSaveObj));
            } else if (layerType === "chart" || layerType === "map" || layerType === "chartMap") {
                let tempIndex = Math.ceil(Math.random() * 3) - 1;
                var data = chartTestData[tempIndex];
                var a,map;
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
                            style: 'zyzx://formal_blue/styles/style.json',
                            // style : 'zyzx://zhengwu20181130/p12/resources/styles/root-'+theme+'.json',
                            // //verctor_20180717   zhengwu_light  zhengwu_streets  zhengwu_dark
                            // localIdeographFontFamily : ' "Microsoft YaHei Bold","Microsoft YaHei
                            // Regular","SimSun,Regular"',
                        });
                    map.on('load', function () {
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
                    a = new window.dmapgl.commonlyCharts(timeKey, {data: data});
                    store.dispatch(addCptOptionsList(chartId, data))
                }
                arr.push(timeKey);
                mapObjArr.push({layerId: timeKey, layerMap: map});
                window.arr = arr;
                window.mapObjArr = mapObjArr;
            } 
        } else {
           if (layerType === "chart" || layerType === "map" || layerType === "chartMap") {
                let newOptions = store
                    .getState()
                    .showLayerDatas
                    .cptOptionsList[_this.state.cptIndex]
                    .layerOption;
                let tempThisObj = document.getElementById(timeKey);
                if (layerType === "chart") {
                    var e_instance = tempThisObj.getAttribute("_echarts_instance_");
                    if (chartState === "update") {
                        new window.dmapgl.commonlyCharts(timeKey, {data: newOptions});
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
                        if (chartState === "update") {} else {
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
export function showChartsOption(chartsList) {
    if (chartsList && chartsList[0]) {
        var arr = window.arr
            ? window.arr
            : [];
        var mapObjArr = window.mapObjArr
            ? window.mapObjArr
            : [];
        chartsList.map((item, index) => {
            let data = item.layerObj;
            let thType = item.thType;
            let chartId = item.chartId;
            let layerData = item.layerData;
            let timeKey = item
                .timeKey
                .toString();
            let map = {};
            store.dispatch(addCptOptionsList(chartId, []));
            if (thType === "0") {
                getSpecify(chartId).then(function (result) {
                    if (result.data) {
                        console.log("接口没有数据")
                    } else {
                        if (result && result[0]) {
                            new window.dmapgl.commonlyCharts(timeKey, {data: result});
                        }
                    }
                    let tempOptionObj = {
                        cptIndex: index,
                        layerOption: result
                    }
                    store.dispatch(editCptOptionsList(tempOptionObj));

                }).catch(e => console.log("error", e));
            } else if (thType === "1") {
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
                        style: 'zyzx://formal_blue/styles/style.json',
                        // style : 'zyzx://zhengwu20181130/p12/resources/styles/root-'+theme+'.json',
                        // //verctor_20180717   zhengwu_light  zhengwu_streets  zhengwu_dark
                        // localIdeographFontFamily : ' "Microsoft YaHei Bold","Microsoft YaHei
                        // Regular","SimSun,Regular"',
                    });
               
                map.on('load', function () {
                    let dataShowVal = data.show;
                    // let parentDom = window.parent.document;
                    // let dataShow = parentDom.getElementById("dataShow").contentWindow;
                    if (dataShowVal == "1") {
                        addLayerWFS(data, map);
                    } else if (dataShowVal == "2") {
                        addLayerWMS(data, map);
                    }
                    getSpecify(chartId).then(result => {
                        let tempOptionObj = {
                            cptIndex: index,
                            layerOption: result
                        }
                        store.dispatch(editCptOptionsList(tempOptionObj));
                    }).catch(error => {
                        console.info(error);
                    });
                });
            } else if (thType === "text" || thType === "border" || thType === "iframe"|| thType === "table") {
                let tempSaveObj = {};
                if (thType === "border") {
                    tempSaveObj = {
                        borderImage:layerData.borderImage,
                        borderWidth:layerData.borderWidth,
                    }
                } else if (thType === "text") {
                    tempSaveObj = {
                        textCenter: {
                            value:layerData.textCenter.value
                        },
                        fontFamily: layerData.fontFamily,
                        fontSize: layerData.fontSize,
                        fontColor: layerData.fontColor,
                        fontWeight: layerData.fontWeight,
                        textAlign: layerData.textAlign,
                        writingMode: layerData.writingMode,
                        hyperlinkCenter: layerData.hyperlinkCenter,
                        isNewWindow: layerData.isNewWindow
                    };
                } else if (thType === "iframe") {
                    tempSaveObj = {
                        iframeUrl: layerData.iframeUrl
                    }
                } else if (thType === "table") {
                    tempSaveObj = {
                        tableData: layerData.tableData,
                        tableColumns: layerData.tableColumns,
                    }
                } else if (thType === "image") {
                    let {backgroundImage,repeat,radius,urlConfig} = layerData;
                    let {url,ifBlank} = urlConfig;
                    tempSaveObj = {
                        backgroundImage: backgroundImage,
                        repeat: repeat,
                        radius: radius,
                        urlConfig: {
                            url: url,
                            ifBlank: ifBlank
                        }
                    };
                }
                let tempOptionObj = {
                    cptIndex: index,
                    layerOption: tempSaveObj
                }
                store.dispatch(editCptOptionsList(tempOptionObj));
            }
            arr.push(timeKey);
            mapObjArr.push({layerId: timeKey, layerMap: map});
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
    var thType = data.thType;
    var catalogId = data.id;
    var map = {};
    store.dispatch(addCptOptionsList(catalogId, []));
    if ("0" == thType) { //图表
        var type1 = data.type
            ? data.type
            : ''; //图表类型（饼、柱。。等）
        // if('THEMEPIE_CHART' == type1 ||'THEMERING_CHART' == type1 ){
        /*
			 * 一般图表
			 * THEMEPIE_CHART（一般饼状图）
			 * THEMERING_CHART（一般圆环图）
			 */
        getSpecify(catalogId).then(result => {
            var a = new window.dmapgl.commonlyCharts(timeId, {data: result});
            let tempOptionObj = {
                cptIndex: addIndex,
                layerOption: result
            }
            store.dispatch(editCptOptionsList(tempOptionObj));
        }).catch(error => {
            console.info(error);
        });
        // }
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
                style: 'zyzx://formal_blue/styles/style.json',
                // style : 'zyzx://zhengwu20181130/p12/resources/styles/root-'+theme+'.json',
                // //verctor_20180717   zhengwu_light  zhengwu_streets  zhengwu_dark
                // localIdeographFontFamily : ' "Microsoft YaHei Bold","Microsoft YaHei
                // Regular","SimSun,Regular"',
            });
        map.on('load', function () {
            if (data.show == "1") {
                addLayerWFS(data, map);
            } else if (data.show == "2") {
                addLayerWMS(data, map);
            }
            getSpecify(catalogId).then(result => {
                let tempOptionObj = {
                    cptIndex: addIndex,
                    layerOption: result
                }
                store.dispatch(editCptOptionsList(tempOptionObj));
            }).catch(error => {
                console.info(error);
            });
        });

    }
    var mapObjArr = window.mapObjArr
        ? window.mapObjArr
        : [];
    mapObjArr.push({layerId: timeId, layerMap: map});
    window.mapObjArr = mapObjArr;
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
        var url = projectType+'GIMSNEW?request=GetFeature&service=WFS&version=1.0.0&recbox=437442.469,257' +
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

            var url = projectType+'GIMSNEW?request=GetFeature&service=WFS&version=1.0.0&recbox=437442.469,257' +
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
            var icon = symbol.attr('icon');
            if (!map.hasImage(icon)) {
                map
                    .loadImage('../SymbolLib?request=icon&icon=symbollib/' + icon + '.png', function (error, image) {
                        map.addImage(icon, image);
                    });
            }
            var url = projectType+'GIMSNEW?request=GetFeature&service=WFS&version=1.0.0&recbox=437442.469,257' +
                    '025.703,582446.812,414679.125&searchType=recsearch&typename=' + layername;
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
                }
            });

        } else if ('一般线样式' == type) {
            var simplinesymbol = $(simplerenderer).find('SIMPLELINESYMBOL');
            var width = parseInt(simplinesymbol.attr('width'));
            var color = simplinesymbol.attr('color');

            var url = projectType+'GIMSNEW?request=GetFeature&service=WFS&version=1.0.0&recbox=437442.469,257' +
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

            var url = projectType+'GIMSNEW?request=GetFeature&service=WFS&version=1.0.0&recbox=437442.469,257' +
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
    }, 'drawLevel');
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
        var url = projectType+'GIMSNEW?request=GetFeature&service=WFS&version=1.0.0&recbox=437442.469,257' +
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

                if (fuhaokuName == '栅格图标') {
                    var icon = simplemarkersymbol.attr('icon');
                    if (!map.hasImage(icon)) {
                        map
                            .loadImage('../SymbolLib?request=icon&icon=symbollib/' + icon + '.png', function (error, image) {
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
        var url = projectType+'GIMSNEW?request=GetFeature&service=WFS&version=1.0.0&recbox=437442.469,257' +
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
                            .loadImage('../SymbolLib?request=icon&icon=symbollib/' + icon + '.png', function (error, image) {
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
        var url = projectType+'GIMSNEW?request=GetFeature&service=WFS&version=1.0.0&recbox=437442.469,257' +
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
        var url = projectType+'GIMSNEW?request=GetFeature&service=WFS&version=1.0.0&recbox=437442.469,257' +
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
        var url = projectType+'GIMSNEW?request=GetFeature&service=WFS&version=1.0.0&recbox=437442.469,257' +
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
        var url = projectType+'GIMSNEW?request=GetFeature&service=WFS&version=1.0.0&recbox=437442.469,257' +
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