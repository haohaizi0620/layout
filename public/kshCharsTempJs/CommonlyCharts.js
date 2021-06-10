/**
 * 饼状图
 */
 class Pie {
  constructor(Legenddiv, options) {
    var _data = options.data[0];
    for (var i in options) {
      if (options.hasOwnProperty(i) && i !== "data") {
        _data[i] = options[i];
      }
    }
    this.textColor = "#52F3F3";
    this._ThempieCharts(Legenddiv, _data);
  }

  _ThempieCharts(Legenddiv, options) {
    var seriesDataF = options.myLegend.result;
    var myChart = echarts.init(document.getElementById(Legenddiv)); // 初始化图表，注意这里不能用JQuery方式，否则会无法初始化
    //		//console.log(options)
    var myMapTable = options.myMapTable.result; // "地图上展示多少个图"
    var ColorTuli = [];
    var seriesName = options.mapInfor.result[0].NAME;
    var seriesData = [];
    var Name = [];
    var StatisticalType = [];
    var titlePosition = [];
    var sel = 0;
    var opacity = options.myLegend.result[0].itemStyle.opacity; //透明度
    var shadowblur = options.myLegend.result[0].itemStyle.shadowblur; //阴影面积
    //		var shadowcolor = options.myLegend.result[0].itemStyle.shadowcolor; //阴影颜色
    var borderradius = options.myLegend.result[0].itemStyle.borderradius; //圆角半径
    //		var radius1 = options.myLegend.result[0].itemStyle.radius1; //内圈半径
    //		var radius2 = options.myLegend.result[0].itemStyle.radius2; //外圈半径
    var rosetype = options.myLegend.result[0].itemStyle.rosetype; //玫瑰图效果
    
    if (opacity == "") {
    	opacity = 1
    }
    if (shadowblur == "") {
    	shadowblur = 0
    }
    if (borderradius == "") {
    	borderradius = 0
    }
    

    for (var reI = 0; reI < myMapTable.length; reI++) {
      var val = myMapTable[reI]; //myLegend
      for (var seriesNameI in val) {
        if (seriesDataF[0].legendPosition === seriesNameI) {
          StatisticalType[sel] = val[seriesNameI];
        }
        if (seriesDataF[0].titlePosition === seriesNameI) {
          titlePosition[sel] = val[seriesNameI];
        }
        if (titlePosition[sel] && StatisticalType[sel]) {
          if (seriesDataF[sel]) {
            ColorTuli[sel] = seriesDataF[sel].color.split(',');
          }
          sel++;
          continue;
        }
      }

    }
    for (var f = 0; f < seriesDataF.length; f++) {
      var StatisticalTypeSelcet = seriesDataF[f].fieldName; //数据字段名

      var StatisticalSelcet = seriesDataF[f].name; //别名
      Name[f] = StatisticalTypeSelcet;
      for (var t = 0; t < titlePosition.length; t++) {
        if (StatisticalTypeSelcet == StatisticalType[t]) {
          if (titlePosition) {
            if (StatisticalSelcet || StatisticalSelcet != StatisticalTypeSelcet) {
              Name[f] = StatisticalSelcet;
            }
            var seriesDataObj = {
              name : Name[f],
              value : Number(titlePosition[t]),
            };
            seriesData.push(seriesDataObj);
          }
        }
      }
    }
    var name = seriesDataF[0].titlePosition;
    var titleShow = true;
    if (seriesDataF[0].itemStyle.titleShow != false) {
      titleShow = true;
    } else {
      titleShow = false;
    }
    var titleColor = seriesDataF[0].itemStyle.titleColor ? seriesDataF[0].itemStyle.titleColor : this.textColor;
    var titleFontSize = seriesDataF[0].itemStyle.titleFontSize ? seriesDataF[0].itemStyle.titleFontSize : 18;
    var titleLeft,
      titleTop,
      titleRight,
      titleBottom;
    if (titleShow && seriesDataF[0].itemStyle.titlePosition) {
      titleLeft = seriesDataF[0].itemStyle.titlePosition.split(',')[0] ? seriesDataF[0].itemStyle.titlePosition.split(',')[0] : 'auto';
      titleTop = seriesDataF[0].itemStyle.titlePosition.split(',')[1] ? seriesDataF[0].itemStyle.titlePosition.split(',')[1] : 'auto';
      titleRight = seriesDataF[0].itemStyle.titlePosition.split(',')[2] ? seriesDataF[0].itemStyle.titlePosition.split(',')[2] : 'auto';
      titleBottom = seriesDataF[0].itemStyle.titlePosition.split(',')[3] ? seriesDataF[0].itemStyle.titlePosition.split(',')[3] : 'auto';
    } else {
      titleLeft = 'auto';
      titleTop = 'auto';
      titleRight = 'auto';
      titleBottom = 'auto';
    }
    var legendShow = true;
    if (seriesDataF[0].itemStyle.legendShow != false) {
      legendShow = true;
    } else {
      legendShow = false;
    }
    var legendOrient = seriesDataF[0].itemStyle.legendOrient ? seriesDataF[0].itemStyle.legendOrient : 'vertical';
    var legendLeft,
      legendTop,
      legendRight,
      legendBottom;
    if (legendShow && seriesDataF[0].itemStyle.legendPosition) {
      legendLeft = seriesDataF[0].itemStyle.legendPosition.split(',')[0] ? seriesDataF[0].itemStyle.legendPosition.split(',')[0] : '80%';
      legendTop = seriesDataF[0].itemStyle.legendPosition.split(',')[1] ? seriesDataF[0].itemStyle.legendPosition.split(',')[1] : '10%';
      legendRight = seriesDataF[0].itemStyle.legendPosition.split(',')[2] ? seriesDataF[0].itemStyle.legendPosition.split(',')[2] : 10;
      legendBottom = seriesDataF[0].itemStyle.legendPosition.split(',')[3] ? seriesDataF[0].itemStyle.legendPosition.split(',')[3] : 20;
    } else {
      legendLeft = '80%';
      legendTop = '10%';
      legendRight = 10;
      legendBottom = 20;
    }
    var legendColor = seriesDataF[0].itemStyle.legendColor ? seriesDataF[0].itemStyle.legendColor : this.textColor;
    var legendFontSize = seriesDataF[0].itemStyle.legendFontSize ? seriesDataF[0].itemStyle.legendFontSize : 14;
    legendFontSize = parseInt(legendFontSize);

    var seriesRadius = seriesDataF[0].itemStyle.seriesRadius ? seriesDataF[0].itemStyle.seriesRadius : '65%';
    var seriesCenter = seriesDataF[0].itemStyle.seriesCenter ? [ seriesDataF[0].itemStyle.seriesCenter.split(',')[0], seriesDataF[0].itemStyle.seriesCenter.split(',')[1] ] : [ '50%', '50%' ];
    ////console.log(ColorTuli)
    var ystoumingdu1 = options.myLegend.result[0].itemStyle.ystoumingdu1 //顶部颜色透明度
    var ystoumingdu2 = options.myLegend.result[0].itemStyle.ystoumingdu2 //底部颜色透明度
    if (ystoumingdu1 == "") {
      ystoumingdu1 = 1
    }
    if (ystoumingdu2 == "") {
      ystoumingdu2 = 1
    }
    

    if (ColorTuli[0].length > 1) {
      ColorTuli = ColorTuli[0]
    }
    var rpgaarr = []
    for (var i = 0; i < ColorTuli.length; i++) {
      rpgaarr[i] = [ HexToRgba(ColorTuli[i], Number(ystoumingdu1)), HexToRgba(ColorTuli[i], Number(ystoumingdu2)) ]
    }
    ////console.log(rpgaarr)

    var option = {
      title : {
        show : titleShow,
        text : seriesName,
        left : titleLeft,
        top : titleTop,
        right : titleRight,
        bottom : titleBottom,
        textStyle : {
          color : titleColor,
          fontSize : titleFontSize
        },
      },
      color : ColorTuli,

      toolbox : {
        show : false,
      },
      legend : {
        show : legendShow,
        type : 'scroll',
        orient : legendOrient,
        right : '5%',
        top : legendTop,
        bottom : legendBottom,
        left : '80%',
        itemWidth : legendFontSize,
        itemHeight : legendFontSize,
        data : Name,
        textStyle : {
          color : legendColor,
          fontSize : legendFontSize
        },
        formatter: function (param) {
          let name = param
          if(name.length<=4){
            return  name 
          }else {
            name = name.slice(0,4) + '...';
            return  name 
          }
      },
        tooltip : {
          show : true
        },
      },
      grid : {
      	right:'30%'
      },
      tooltip : {
        trigger : 'item',
      },
      series : [ {
        name : name,
        type : 'pie',
        center : seriesCenter,
        radius : seriesRadius,
        selectedMode : 'single',
        avoidLabelOverlap : false,
        minAngle : 1,
        itemStyle : {
          normal : {
            shadowBlur : Number(shadowblur),
            borderRadius : Number(borderradius),
            opacity : Number(opacity),
            color : function(params) { // 颜色定制显示（按顺序）
              let obj = {
                type : 'linear',
                x : 0,
                y : 0,
                x2 : 0,
                y2 : 1,

                colorStops : [ {
                  offset : 0,
                  color : rpgaarr[params.dataIndex][0] // 0% 处的颜色
                }, {
                  offset : 1,
                  color : rpgaarr[params.dataIndex][1] // 100% 处的颜色
                } ],
                global : false // 缺省为 false
              }
              ////console.log(obj)
              return obj

            }
          }
        },
        roseType : rosetype,
        label : {
          normal : {
            show : false,
            position : 'center'
          },
          emphasis : {
            show : false,
            textStyle : {
              fontSize : '18',
              fontWeight : 'bold'
            }
          }
        },
        labelLine : {
          normal : {
            show : false
          }
        },
        data : seriesData
      } ]
    };
    //				//console.log(option)
    myChart.setOption(option); // 最后加载图表
  }
}

/**
 * 雷达图
 */
class Radar {
  constructor(Legenddiv, options) {
    var _data = options.data[0];
    for (var i in options) {
      if (options.hasOwnProperty(i) && i !== "data") {
        _data[i] = options[i];
      }
    }
    this.textColor = "#52F3F3";
    this._ThemradarCharts(Legenddiv, _data);
  }

  _ThemradarCharts(Legenddiv, options) {
    var myChart = echarts.init(document.getElementById(Legenddiv)); // 初始化图表，注意这里不能用JQuery方式，否则会无法初始化
    var ColorTuli = [];
    var seriesName = options.mapInfor.result[0].NAME;
    var myMapTable = options.myMapTable.result; // "地图上展示多少个图"

    if (!seriesName) {
      seriesName = options.mapInfor.result[0].NAME;
    }
    var seriesData = [];
    var Data = []; //数据的数组
    var Name = [];
    var seriesDataF = options.myLegend.result;
    var StatisticalType = [];
    var indicator = [];
    var _maxs = [];
    var _maxOnly = 0;
    for (var reI = 0; reI < myMapTable.length; reI++) { //myLegend
      var _max = 0;
      for (var f = 0; f < seriesDataF.length; f++) {
        var sum = 0;
        var val = myMapTable[reI];
        for (var seriesNameI in val) {
          if (seriesDataF[f].fieldName === seriesNameI || seriesDataF[f].fieldName === seriesNameI.toUpperCase()) {
            sum = Number(val[seriesNameI]);
          }
        }
        if (sum) {
          if (sum > _max) {
            _max = sum;
          }
        }
      }
      if (seriesDataF.length == 1) {
        if (_maxOnly < _max) {
          _maxOnly = _max;
        }
      }
      _maxs[reI] = _max;
    }
    for (var f = 0; f < seriesDataF.length; f++) { //myLegend
      Data = [];
      for (var reI = 0; reI < myMapTable.length; reI++) {
        var val = myMapTable[reI];
        for (var seriesNameI in val) {
          if (seriesDataF[f].fieldName === seriesNameI || seriesDataF[f].fieldName === seriesNameI.toUpperCase()) {

            ColorTuli[f] = seriesDataF[f].color.split(','); //颜色
            Name[f] = seriesNameI;
            //别名
            if (seriesDataF[f].name || seriesDataF[f].name != Name[f]) {
              Name[f] = seriesDataF[f].name;
            }
            Data[reI] = Number(val[seriesNameI]);
          }

          if (seriesDataF[f].legendPosition === seriesNameI) {
            StatisticalType[reI] = val[seriesNameI];
            var _max = 0;
            if (seriesDataF.length == 1) {
              _max = _maxOnly;
            } else {
              _max = _maxs[reI];
            }
            var nameI=val[seriesNameI]
            if(nameI.length<=4){
                  nameI=nameI
            }else {
              nameI = nameI.slice(0,4) + '...';
             
            }
            indicator[reI] = {
              text : nameI,
              max : _max
            };
          }
        }
      }
      seriesData[f] = {
        value : Data,
        name : Name[f],
        areaStyle : {
          opacity : 0.6,
          color : ColorTuli[0][f]
        },
      }
    }

    var titleShow = true;
    if (seriesDataF[0].itemStyle.titleShow != false) {
      titleShow = true;
    } else {
      titleShow = false;
    }
    var titleColor = seriesDataF[0].itemStyle.titleColor ? seriesDataF[0].itemStyle.titleColor : this.textColor;
    var titleFontSize = seriesDataF[0].itemStyle.titleFontSize ? seriesDataF[0].itemStyle.titleFontSize : 18;
    var titleLeft,
      titleTop,
      titleRight,
      titleBottom;
    if (titleShow && seriesDataF[0].itemStyle.titlePosition) {
      titleLeft = seriesDataF[0].itemStyle.titlePosition.split(',')[0] ? seriesDataF[0].itemStyle.titlePosition.split(',')[0] : 'auto';
      titleTop = seriesDataF[0].itemStyle.titlePosition.split(',')[1] ? seriesDataF[0].itemStyle.titlePosition.split(',')[1] : 'auto';
      titleRight = seriesDataF[0].itemStyle.titlePosition.split(',')[2] ? seriesDataF[0].itemStyle.titlePosition.split(',')[2] : 'auto';
      titleBottom = seriesDataF[0].itemStyle.titlePosition.split(',')[3] ? seriesDataF[0].itemStyle.titlePosition.split(',')[3] : 'auto';
    } else {
      titleLeft = 'auto';
      titleTop = 'auto';
      titleRight = 'auto';
      titleBottom = 'auto';
    }

    var legendShow = true;
    if (seriesDataF[0].itemStyle.legendShow != false) {
      legendShow = true;
    } else {
      legendShow = false;
    }
    var legendOrient = seriesDataF[0].itemStyle.legendOrient ? seriesDataF[0].itemStyle.legendOrient : 'vertical';
    var legendLeft,
      legendTop,
      legendRight,
      legendBottom;
    if (legendShow && seriesDataF[0].itemStyle.legendPosition) {
      legendLeft = seriesDataF[0].itemStyle.legendPosition.split(',')[0] ? seriesDataF[0].itemStyle.legendPosition.split(',')[0] : '80%';
      legendTop = seriesDataF[0].itemStyle.legendPosition.split(',')[1] ? seriesDataF[0].itemStyle.legendPosition.split(',')[1] : '10%';
      legendRight = seriesDataF[0].itemStyle.legendPosition.split(',')[2] ? seriesDataF[0].itemStyle.legendPosition.split(',')[2] : 10;
      legendBottom = seriesDataF[0].itemStyle.legendPosition.split(',')[3] ? seriesDataF[0].itemStyle.legendPosition.split(',')[3] : 20;
    } else {
      legendLeft = '80%';
      legendTop = '10%';
//      legendRight = 10;
      legendBottom = 20;
    }
    var legendColor = seriesDataF[0].itemStyle.legendColor ? seriesDataF[0].itemStyle.legendColor : this.textColor;
    var legendFontSize = seriesDataF[0].itemStyle.legendFontSize ? seriesDataF[0].itemStyle.legendFontSize : 14;
    legendFontSize = parseInt(legendFontSize);

    var seriesRadius = seriesDataF[0].itemStyle.seriesRadius ? seriesDataF[0].itemStyle.seriesRadius : '65%';
    var seriesCenter = seriesDataF[0].itemStyle.seriesCenter ? [ seriesDataF[0].itemStyle.seriesCenter.split(',')[0], seriesDataF[0].itemStyle.seriesCenter.split(',')[1] ] : [ '50%', '50%' ];
    var textStyleColor = seriesDataF[0].itemStyle.textStyleColor ? seriesDataF[0].itemStyle.textStyleColor : this.textColor;
    var textStyleFontSize = seriesDataF[0].itemStyle.textStyleFontSize ? seriesDataF[0].itemStyle.textStyleFontSize : 14;
    ////console.log(ColorTuli)
    if (ColorTuli[0].length > 1) {
      ColorTuli = ColorTuli[0]
    }
    var option = {
      title : {
        show : titleShow,
        text : seriesName,
        left : titleLeft,
        right : titleRight,
        top : titleTop,
        bottom : titleBottom,
        textStyle : {
          color : titleColor,
          fontSize : titleFontSize
        }
      },
      tooltip : {
        trigger : 'item',
        backgroundColor : '#fff',
        confine : true,
      },
      toolbox : {
        show : false,
      },
      grid : {
      	right:'30%',
        containLabel:true
      },
      color : ColorTuli,
      textStyle : {
        color : textStyleColor,
        fontSize : textStyleFontSize
      },
      legend : {
        show : legendShow,
        type : 'scroll',
        orient : legendOrient,
        left :  '80%',
//        right : legendRight,
        top : legendTop,
        bottom : legendBottom,
        itemWidth : legendFontSize,
        itemHeight : legendFontSize,
        data : Name,
        formatter: function (param) {
          let name = param
             if(name.length<=4){
               return  name 
             }else {
               name = name.slice(0,4) + '...';
               return  name 
             }
         },
        tooltip : {
          show : true
        },
        textStyle : {
          color : legendColor,
          fontSize : legendFontSize
        },
      },
      polar : [
        {
          center : seriesCenter,
          radius : seriesRadius,
          indicator : indicator,
        }
      ],
      series : [
        {
          name : seriesName,
          type : 'radar',
          data : seriesData,
        }
      ]
    };
    myChart.setOption(option);

  }
}

/**
 * 圆环图
 */
class Ring {
  constructor(Legenddiv, options) {
    var _data = options.data[0];
    for (var i in options) {
      if (options.hasOwnProperty(i) && i !== "data") {
        _data[i] = options[i];
      }
    }
    this.textColor = "#52F3F3";
    this._ThemringCharts(Legenddiv, _data);
  }

  _ThemringCharts(Legenddiv, options) { //圆环图
//    //console.log(options)
    var seriesDataF = options.myLegend.result;
    var myChart = echarts.init(document.getElementById(Legenddiv)); // 初始化图表，注意这里不能用JQuery方式，否则会无法初始化
    var myMapTable = options.myMapTable.result; // "地图上展示多少个图"
    var ColorTuli = [];
    var seriesName = options.mapInfor.result[0].NAME;
    if (!seriesName) {
      seriesName = options.mapInfor.result[0].NAME;
    }
    var seriesData = [];
    var Name = [];
    var StatisticalType = [];
    var titlePosition = [];
    var sel = 0;
    var opacity = options.myLegend.result[0].itemStyle.opacity; //透明度
    var shadowblur = options.myLegend.result[0].itemStyle.shadowblur; //阴影面积
    //		var shadowcolor = options.myLegend.result[0].itemStyle.shadowcolor; //阴影颜色
    var borderradius = options.myLegend.result[0].itemStyle.borderradius; //圆角半径
    //		var radius1 = options.myLegend.result[0].itemStyle.radius1; //内圈半径
    //		var radius2 = options.myLegend.result[0].itemStyle.radius2; //外圈半径
    var rosetype = options.myLegend.result[0].itemStyle.rosetype; //玫瑰图效果
    var ystoumingdu1 = options.myLegend.result[0].itemStyle.ystoumingdu1 //顶部颜色透明度
    var ystoumingdu2 = options.myLegend.result[0].itemStyle.ystoumingdu2 //底部颜色透明度
    if (ystoumingdu1 == "") {
      ystoumingdu1 = 1
    }
    if (ystoumingdu2 == "") {
      ystoumingdu2 = 1
    }
    
    if (opacity == "") {
    	opacity = 1
    }
    if (shadowblur == "") {
    	shadowblur = 0
    }
    if (borderradius == "") {
    	borderradius = 0
    }
    
    for (var reI = 0; reI < myMapTable.length; reI++) {
      var val = myMapTable[reI]; //myLegend
      for (var seriesNameI in val) {
        if (seriesDataF[0].legendPosition === seriesNameI) {
          StatisticalType[sel] = val[seriesNameI];
        }
        if (seriesDataF[0].titlePosition === seriesNameI) {
          titlePosition[sel] = val[seriesNameI];
        }
        if (titlePosition[sel] && StatisticalType[sel]) {
          if (seriesDataF[sel]) {
            ColorTuli[sel] = seriesDataF[sel].color.split(',');
          }
          sel++;
          continue;
        }
      }
    }
    for (var f = 0; f < seriesDataF.length; f++) {
      var StatisticalTypeSelcet = seriesDataF[f].fieldName;
      for (var t = 0; t < titlePosition.length; t++) {
        if (StatisticalTypeSelcet == StatisticalType[t]) {
          Name[t] = StatisticalTypeSelcet;
          if (titlePosition) {
            var seriesDataObj = {
              name : StatisticalTypeSelcet,
              value : Number(titlePosition[t]),
              roseType : 'radius',
            };
            seriesData.push(seriesDataObj);
          }
        }
      }
    }

    if (ColorTuli[0].length > 1) {
      ColorTuli = ColorTuli[0]
    }
    var rpgaarr = []
    for (var i = 0; i < ColorTuli.length; i++) {
      rpgaarr[i] = [ HexToRgba(ColorTuli[i], Number(ystoumingdu1)), HexToRgba(ColorTuli[i], Number(ystoumingdu2)) ]
    }
    ////console.log(rpgaarr)
    var name = seriesDataF[0].titlePosition;

    var titleShow = true;
    if (seriesDataF[0].itemStyle.titleShow != false) {
      titleShow = true;
    } else {
      titleShow = false;
    }
    var titleColor = seriesDataF[0].itemStyle.titleColor ? seriesDataF[0].itemStyle.titleColor : this.textColor;
    var titleFontSize = seriesDataF[0].itemStyle.titleFontSize ? seriesDataF[0].itemStyle.titleFontSize : 18;
    var titleLeft,
      titleTop,
      titleRight,
      titleBottom;
    if (titleShow && seriesDataF[0].itemStyle.titlePosition) {
      titleLeft = seriesDataF[0].itemStyle.titlePosition.split(',')[0] ? seriesDataF[0].itemStyle.titlePosition.split(',')[0] : 'auto';
      titleTop = seriesDataF[0].itemStyle.titlePosition.split(',')[1] ? seriesDataF[0].itemStyle.titlePosition.split(',')[1] : 'auto';
      titleRight = seriesDataF[0].itemStyle.titlePosition.split(',')[2] ? seriesDataF[0].itemStyle.titlePosition.split(',')[2] : 'auto';
      titleBottom = seriesDataF[0].itemStyle.titlePosition.split(',')[3] ? seriesDataF[0].itemStyle.titlePosition.split(',')[3] : 'auto';
    } else {
      titleLeft = 'auto';
      titleTop = 'auto';
      titleRight = 'auto';
      titleBottom = 'auto';
    }

    var legendShow = true;
    if (seriesDataF[0].itemStyle.legendShow != false) {
      legendShow = true;
    } else {
      legendShow = false;
    }
    var legendOrient = seriesDataF[0].itemStyle.legendOrient ? seriesDataF[0].itemStyle.legendOrient : 'vertical';
    var legendLeft,
      legendTop,
      legendRight,
      legendBottom;
    if (legendShow && seriesDataF[0].itemStyle.legendPosition) {
      legendLeft = seriesDataF[0].itemStyle.legendPosition.split(',')[0] ? seriesDataF[0].itemStyle.legendPosition.split(',')[0] : 'auto';
      legendTop = seriesDataF[0].itemStyle.legendPosition.split(',')[1] ? seriesDataF[0].itemStyle.legendPosition.split(',')[1] : '10%';
      legendRight = seriesDataF[0].itemStyle.legendPosition.split(',')[2] ? seriesDataF[0].itemStyle.legendPosition.split(',')[2] : 10;
      legendBottom = seriesDataF[0].itemStyle.legendPosition.split(',')[3] ? seriesDataF[0].itemStyle.legendPosition.split(',')[3] : 20;
    } else {
      legendLeft = 'auto';
      legendTop = '10%';
      legendRight = 10;
      legendBottom = 20;
    }
    var legendColor = seriesDataF[0].itemStyle.legendColor ? seriesDataF[0].itemStyle.legendColor : this.textColor;
    var legendFontSize = seriesDataF[0].itemStyle.legendFontSize ? seriesDataF[0].itemStyle.legendFontSize : 14;
    legendFontSize = parseInt(legendFontSize);

    var seriesRadius = seriesDataF[0].itemStyle.seriesRadius ? [ seriesDataF[0].itemStyle.seriesRadius.split(',')[0], seriesDataF[0].itemStyle.seriesRadius.split(',')[1] ] : [ '20%', '70%' ];
    var seriesCenter = seriesDataF[0].itemStyle.seriesCenter ? [ seriesDataF[0].itemStyle.seriesCenter.split(',')[0], seriesDataF[0].itemStyle.seriesCenter.split(',')[1] ] : [ '50%', '50%' ];

    var option = {
      title : {
        show : titleShow,
        text : seriesName,
        left : titleLeft,
        right : titleRight,
        top : titleTop,
        bottom : titleBottom,
        textStyle : {
          color : titleColor,
          fontSize : titleFontSize
        },
      },
      color : ColorTuli,

      legend : {
        show : legendShow,
        type : 'scroll',
        orient : legendOrient,
        left : '80%',
        right : '5%',
        top : legendTop,
        bottom : legendBottom,
        itemWidth : legendFontSize,
        itemHeight : legendFontSize,
        formatter: function (param) {
          let name = param
             if(name.length<=4){
               return  name 
             }else {
               name = name.slice(0,4) + '...';
               return  name 
             }
         },
        tooltip : {
          show : true
        },
        data : Name,
        textStyle : {
          color : legendColor,
          fontSize : legendFontSize
        },
      },
      grid : {
      	righr:'30%'
      },
      tooltip : {
        trigger : 'item',
      },
      series : [ {
        name : name,
        type : 'pie',
        center : seriesCenter,
        radius : seriesRadius,

        selectedMode : 'single',
        minAngle : 1,
        itemStyle : {
          normal : {
            borderRadius : Number(borderradius),
            shadowBlur : Number(shadowblur),
            //					shadowColor : shadowcolor,
            opacity : Number(opacity),
            color : function(params) { // 颜色定制显示（按顺序）
              let obj = {
                type : 'linear',
                x : 1,
                y : 0,
                x2 : 0,
                y2 : 0,
                colorStops : [ {
                  offset : 0,
                  color : rpgaarr[params.dataIndex][0] // 0% 处的颜色
                }, {
                  offset : 1,
                  color : rpgaarr[params.dataIndex][1] // 100% 处的颜色
                } ],
                global : false // 缺省为 false
              }
              ////console.log(obj)
              return obj
            }
          }
        },
        roseType : rosetype,
        label : {
          normal : {
            show : false,
            position : 'center'
          },
          emphasis : {
            show : false,
            textStyle : {
              fontSize : '18',
              fontWeight : 'bold'
            }
          }
        },
        labelLine : {
          normal : {
            show : false
          }
        },
        data : seriesData
      } ]
    };
    //		////console.log(option)
    myChart.setOption(option); // 最后加载图表
  }
}

/**
 * 折线图
 */
class Line {
  constructor(Legenddiv, options) {
    var _data = options.data[0];
    for (var i in options) {
      if (options.hasOwnProperty(i) && i !== "data") {
        _data[i] = options[i];
      }
    }
    this.textColor = "#52F3F3";
    this._ThemlineCharts(Legenddiv, _data);
  }

  _ThemlineCharts(Legenddiv, options) {
    var myChart = echarts.init(document.getElementById(Legenddiv)); // 初始化图表，注意这里不能用JQuery方式，否则会无法初始化
    var ColorTuli = [];
    var seriesData = [];
    var seriesName = options.mapInfor.result[0].NAME;
    var myMapTable = options.myMapTable.result; // "地图上展示多少个图"

    var xianxing = options.myLegend.result[0].itemStyle.xianxing
    var duidie = options.myLegend.result[0].itemStyle.duidie
    var mianjitu = options.myLegend.result[0].itemStyle.mianjitu
    var ystoumingdu1 = options.myLegend.result[0].itemStyle.ystoumingdu1 //顶部颜色透明度
    var ystoumingdu2 = options.myLegend.result[0].itemStyle.ystoumingdu2 //底部颜色透明度
    if (ystoumingdu1 == "") {
      ystoumingdu1 = 1
    }
    if (ystoumingdu2 == "") {
      ystoumingdu2 = 1
    }
    var color1 = []
    for (var i = 0; i < options.myLegend.result.length; i++) {
      color1[i] = options.myLegend.result[i].color.split(',')
    }
    if (color1[0][1] != undefined) {
      color1 = color1[0]
    }
    xianxing = JSON.parse(xianxing)

    if (!seriesName) {
      seriesName = options.mapInfor.result[0].NAME;
    }
    var Name = [];
    var seriesDataF = options.myLegend.result;
    var StatisticalType = [];
    for (var f = 0; f < seriesDataF.length; f++) { //myLegend
      var Data = [];
      for (var reI = 0; reI < myMapTable.length; reI++) {
        var val = myMapTable[reI];
        for (var seriesNameI in val) {
          if (seriesDataF[f].fieldName === seriesNameI || seriesDataF[f].fieldName === seriesNameI.toUpperCase()) {
            ColorTuli[f] = color1[f]; //颜色

            Name[f] = seriesNameI;
            if (seriesDataF[f].name || seriesDataF[f].name != Name[f]) {
              Name[f] = seriesDataF[f].name;
            }
            Data[reI] = Number(val[seriesNameI]);
          }

          if (seriesDataF[f].legendPosition === seriesNameI) {
            StatisticalType[reI] = val[seriesNameI];
          }
        }
      }
      if (duidie == "true") {
        if (mianjitu == "true") {
          seriesData[f] = {
            name : Name[f],
            type : 'line',
            smooth : xianxing,
            stack : '总量',
            itemStyle : {
              normal : {
                color : {
                  type : 'linear',
                  x : 0,
                  y : 0,
                  x2 : 0,
                  y2 : 1,
                  colorStops : [ {
                    offset : 0,
                    color : HexToRgba(color1[f], Number(ystoumingdu1)) //  0%  处的颜色
                  },


                    {
                      offset : 1,
                      color : HexToRgba(color1[f], Number(ystoumingdu2)) //  100%  处的颜色
                    }
                  ],
                }
              }
            },
            areaStyle : {
              color : {
                type : 'linear',
                x : 0,
                y : 0,
                x2 : 0,
                y2 : 1,
                colorStops : [ {
                  offset : 0,
                  color : HexToRgba(color1[f], Number(ystoumingdu1)) //  0%  处的颜色
                },


                  {
                    offset : 1,
                    color : HexToRgba(color1[f], Number(ystoumingdu2)) //  100%  处的颜色
                  }
                ],
              }
            },
            data : Data,
          }
        } else {
          seriesData[f] = {
            name : Name[f],
            type : 'line',
            smooth : xianxing,
            stack : '总量',
            itemStyle : {
              normal : {
                color : {
                  type : 'linear',
                  x : 0,
                  y : 0,
                  x2 : 1,
                  y2 : 0,
                  colorStops : [ {
                    offset : 0,
                    color : HexToRgba(color1[f], Number(ystoumingdu1)) //  0%  处的颜色
                  },


                    {
                      offset : 1,
                      color : HexToRgba(color1[f], Number(ystoumingdu2)) //  100%  处的颜色
                    }
                  ],
                }
              }
            },
            data : Data,
          }
        }

      } else {
        seriesData[f] = {
          name : Name[f],
          type : 'line',
          smooth : xianxing,
          itemStyle : {
            normal : {
              color : {
                type : 'linear',
                x : 0,
                y : 0,
                x2 : 1,
                y2 : 0,
                colorStops : [ {
                  offset : 0,
                  color : HexToRgba(color1[f], Number(ystoumingdu1)) //  0%  处的颜色
                },


                  {
                    offset : 1,
                    color : HexToRgba(color1[f], Number(ystoumingdu2)) //  100%  处的颜色
                  }
                ],
              }
            }
          },
          data : Data,
        }
      }
    }
    var dataZoomtrue = options.dataZoomtrue;
    var dataZoom = [];
    if (dataZoomtrue) {
      dataZoom = [
        {
          type : 'slider',
          show : false,
        },
        {
          type : 'inside',
        } ];
    }

    var titleShow = true;
    if (seriesDataF[0].itemStyle.titleShow != false) {
      titleShow = true;
    } else {
      titleShow = false;
    }
    var titleColor = seriesDataF[0].itemStyle.titleColor ? seriesDataF[0].itemStyle.titleColor : this.textColor;
    var titleFontSize = seriesDataF[0].itemStyle.titleFontSize ? seriesDataF[0].itemStyle.titleFontSize : 18;
    var titleLeft,
      titleTop,
      titleRight,
      titleBottom;
    if (titleShow && seriesDataF[0].itemStyle.titlePosition) {
      titleLeft = seriesDataF[0].itemStyle.titlePosition.split(',')[0] ? seriesDataF[0].itemStyle.titlePosition.split(',')[0] : 'auto';
      titleTop = seriesDataF[0].itemStyle.titlePosition.split(',')[1] ? seriesDataF[0].itemStyle.titlePosition.split(',')[1] : 'auto';
      titleRight = seriesDataF[0].itemStyle.titlePosition.split(',')[2] ? seriesDataF[0].itemStyle.titlePosition.split(',')[2] : 'auto';
      titleBottom = seriesDataF[0].itemStyle.titlePosition.split(',')[3] ? seriesDataF[0].itemStyle.titlePosition.split(',')[3] : 'auto';
    } else {
      titleLeft = 'auto';
      titleTop = 'auto';
      titleRight = 'auto';
      titleBottom = 'auto';
    }

    var legendShow = true;
    if (seriesDataF[0].itemStyle.legendShow != false) {
      legendShow = true;
    } else {
      legendShow = false;
    }
    var legendOrient = seriesDataF[0].itemStyle.legendOrient ? seriesDataF[0].itemStyle.legendOrient : 'vertical';
    var legendLeft,
      legendTop,
      legendRight,
      legendBottom;
    if (legendShow && seriesDataF[0].itemStyle.legendPosition) {
      legendLeft = seriesDataF[0].itemStyle.legendPosition.split(',')[0] ? seriesDataF[0].itemStyle.legendPosition.split(',')[0] : 'auto';
      legendTop = seriesDataF[0].itemStyle.legendPosition.split(',')[1] ? seriesDataF[0].itemStyle.legendPosition.split(',')[1] : '10%';
      legendRight = seriesDataF[0].itemStyle.legendPosition.split(',')[2] ? seriesDataF[0].itemStyle.legendPosition.split(',')[2] : 10;
      legendBottom = seriesDataF[0].itemStyle.legendPosition.split(',')[3] ? seriesDataF[0].itemStyle.legendPosition.split(',')[3] : 20;
    } else {
      legendLeft = 'auto';
      legendTop = '10%';
      legendRight = 10;
      legendBottom = 20;
    }
    var legendColor = seriesDataF[0].itemStyle.legendColor ? seriesDataF[0].itemStyle.legendColor : this.textColor;
    var legendFontSize = seriesDataF[0].itemStyle.legendFontSize ? seriesDataF[0].itemStyle.legendFontSize : 14;
    legendFontSize = parseInt(legendFontSize);

    var gridLeft,
      gridTop,
      gridRight,
      gridBottom;
    if (seriesDataF[0].itemStyle.gridPosition) {
      gridLeft = seriesDataF[0].itemStyle.gridPosition.split(',')[0] ? seriesDataF[0].itemStyle.gridPosition.split(',')[0] : '10%';
      gridTop = seriesDataF[0].itemStyle.gridPosition.split(',')[1] ? seriesDataF[0].itemStyle.gridPosition.split(',')[1] : '15%';
      gridRight = seriesDataF[0].itemStyle.gridPosition.split(',')[2] ? seriesDataF[0].itemStyle.gridPosition.split(',')[2] : '22%';
      gridBottom = seriesDataF[0].itemStyle.gridPosition.split(',')[3] ? seriesDataF[0].itemStyle.gridPosition.split(',')[3] : '15%';
    } else {
      gridLeft = '10%';
      gridTop = '15%';
      gridRight = '22%';
      gridBottom = '15%';
    }

    var xAxisColor = seriesDataF[0].itemStyle.xAxisColor ? seriesDataF[0].itemStyle.xAxisColor : this.textColor;
    var xAxisFontSize = seriesDataF[0].itemStyle.xAxisFontSize ? seriesDataF[0].itemStyle.xAxisFontSize : 14;
    var xAxisRotate = seriesDataF[0].itemStyle.xAxisRotate ? seriesDataF[0].itemStyle.xAxisRotate : 10;

    var yAxisColor = seriesDataF[0].itemStyle.yAxisColor ? seriesDataF[0].itemStyle.yAxisColor : this.textColor;
    var yAxisFontSize = seriesDataF[0].itemStyle.yAxisFontSize ? seriesDataF[0].itemStyle.yAxisFontSize : 14;
    var yAxisRotate = seriesDataF[0].itemStyle.yAxisRotate ? seriesDataF[0].itemStyle.yAxisRotate : 0;



    var option = {
      title : {
        show : titleShow,
        text : seriesName,
        left : titleLeft,
        top : titleTop,
        right : titleRight,
        bottom : titleBottom,
        textStyle : {
          color : titleColor,
          fontSize : titleFontSize
        },
      },
      tooltip : {
        trigger : 'axis',
        formatter : function(params) {
          var list = params[0].name + "<br/>";
          for (var i = 0; i < params.length; i++) {
            list += params[i].seriesName + "：" + params[i].data + "<br/>";
          }
          return list;
        }
      },
      toolbox : {
        show : false,
      },
      color : ColorTuli,
      legend : {
        show : legendShow,
        type : 'scroll',
        orient : legendOrient,
        top : legendTop,
        right : legendRight,
        left : legendLeft,
        bottom : legendBottom,
        itemWidth : legendFontSize,
        itemHeight : legendFontSize,
        data : Name,
        textStyle : {
          color : legendColor,
          fontSize : legendFontSize
        },
        formatter: function (param) {
          let name = param
             if(name.length<=4){
               return  name 
             }else {
               name = name.slice(0,4) + '...';
               return  name 
             }
         },
        tooltip : {
          show : true
        },
      },
      dataZoom : dataZoom,
      grid : {
        left : gridLeft,
        top : gridTop,
        bottom : gridBottom,
        right : gridRight,
      },
      xAxis : [
        {
          type : 'category',
          boundaryGap : false,
          handle : {
            show : true,
          },
          axisLabel : {
            textStyle : {
              color : xAxisColor,
              fontSize : xAxisFontSize
            },
            interval : 'auto',
            rotate : xAxisRotate,
            formatter: function (param) {
              let name = param
              if(name.length<=4){
                return  name 
              }else {
                name = name.slice(0,4) + '...';
                return  name 
              }
            }
          },
          data : StatisticalType
        }
      ],
      yAxis : [
        {
          axisLabel : {
            textStyle : {
              color : yAxisColor,
              fontSize : yAxisFontSize
            },
            interval : 'auto',
            rotate : yAxisRotate
          },
          type : 'value'
        }
      ],
      series : seriesData
    };
    ////console.log(option)
    myChart.setOption(option); // 最后加载图表

  }
}

/**
 * 柱状图、堆叠柱状图
 */
class Bar {
  constructor(Legenddiv, options) {
//  	//console.log(options)
    var _seriesType = options.data[0].mapInfor.result[0].TYPE;
    var _data = options.data[0];
    for (var i in options) {
      if (options.hasOwnProperty(i) && i !== "data") {
        _data[i] = options[i];
      }
    }
    this.textColor = "#52F3F3";
    if (_seriesType === "THEMEHISTOGRAM") { //一般统计  柱状   _ThembarCharts
      this._ThembarCharts(Legenddiv, _data, 0);
    } else if (_seriesType === "xiangxingzhutu") { //一般统计  象形柱图
      this._ThembarCharts(Legenddiv, _data, 2);
    } else if (_seriesType === "dongtaizhutu") { //一般统计  动态柱图
      this._ThembarCharts(Legenddiv, _data, 3);
    }
  }

  _ThembarCharts(Legenddiv, options, type) {
    var myChart = echarts.init(document.getElementById(Legenddiv)); // 初始化图表，注意这里不能用JQuery方式，否则会无法初始化
    var myMapTable = options.myMapTable.result; // "地图上展示多少个图"
    var ColorTuli = [];
    var seriesName = options.mapInfor.result[0].NAME;
    if (!seriesName) {
      seriesName = options.mapInfor.result[0].NAME;
    }
    var chartPosition = options.myLegend.result[0].titlePosition; //柱状朝向
    var isAnimation = options.myLegend.result[0].isAnimation; //动画延迟
    var seriesData = [];
    var Name = [];
    var seriesDataF = options.myLegend.result;
    var opacity = options.myLegend.result[0].itemStyle.opacity;
    var symbol = options.myLegend.result[0].itemStyle.symbol;
    var barcategorygap = options.myLegend.result[0].itemStyle.barcategorygap;

    var borderradius = options.myLegend.result[0].itemStyle.borderradius;
    var shadowblur = options.myLegend.result[0].itemStyle.shadowblur;
    var countryColors = {};
    var inverse = options.myLegend.result[0].itemStyle.inverse //是否进行排序
    var maxnumber = options.myLegend.result[0].itemStyle.maxnumber //显示数据条数（n+1）
    var position = options.myLegend.result[0].itemStyle.position //标签位置 comobox(position.json)
    var fontsize = options.myLegend.result[0].itemStyle.fontsize //字体大小

    var timeaxis = options.myLegend.result[0].itemStyle.timeaxis
    var shujuziduan = options.myLegend.result[0].itemStyle.shujuziduan
    var yszd2 = options.myLegend.result[0].itemStyle.yszd2
    var duidie = options.myLegend.result[0].itemStyle.duidie
    var ystoumingdu1 = options.myLegend.result[0].itemStyle.ystoumingdu1 //顶部颜色透明度
    var ystoumingdu2 = options.myLegend.result[0].itemStyle.ystoumingdu2 //底部颜色透明度
    var color = []
    for(var i=0;i<options.myLegend.result.length;i++){
    	color[i]=options.myLegend.result[i].color.split(',')
    }
    if (ystoumingdu1 == "") {
      ystoumingdu1 = 1
    }
    if (ystoumingdu2 == "") {
      ystoumingdu2 = 1
    }
    if (borderradius == "") {
    	borderradius = 0
    }
    if (barcategorygap == "") {
    	barcategorygap = 0
    }
    if (fontsize == "") {
    	fontsize = 20
    }
    if (opacity == "") {
    	opacity = 1
    }
    var Timeaxis = []
    var numberdata = []
    var country = []
    var dongtaidata = []
    if (type == 0) {
      if (duidie == "true") {
        type = 1
      } else {
        type = 0
      }
    }
    if (type == 3) {
      if (color[0][1] != undefined) {
     color = color[0]
   }
      for (var i = 0; i < options.myMapTable.result.length; i++) {
        Timeaxis[i] = options.myMapTable.result[i][timeaxis];
        numberdata[i] = options.myMapTable.result[i][shujuziduan];
        country[i] = options.myMapTable.result[i][yszd2];
        dongtaidata[i] = [ numberdata[i], country[i], Timeaxis[i] ]
      }
      var country2 = []
      function dedupe(array) {
        return country2 = Array.from(new Set(array));
      }
      dedupe(country)
      for (var i = 0; i < color.length; i++) {
				countryColors[country2[i]] = color[i]
			}
      ////console.log(country2)
      var data = dongtaidata
      var updateFrequency = 300;
      var dimension = 0;
      ////console.log(Timeaxis)
      ////console.log(countryColors)
      if(maxnumber==""){
        maxnumber=country2.length
    }

    }
    var StatisticalType = [];
    for (var f = 0; f < seriesDataF.length; f++) { //myLegend
      var Data = [];
      for (var reI = 0; reI < myMapTable.length; reI++) {
        var val = myMapTable[reI];
        for (var seriesNameI in val) {
          if (seriesDataF[f].fieldName === seriesNameI || seriesDataF[f].fieldName === seriesNameI.toUpperCase()) {
            ColorTuli[f] = seriesDataF[f].color.split(','); //颜色
            Name[f] = seriesNameI;
            if (seriesDataF[f].name || seriesDataF[f].name != Name[f]) {
              Name[f] = seriesDataF[f].name;
            }
            Data[reI] = Number(val[seriesNameI]);
          }

          if (seriesDataF[f].legendPosition === seriesNameI) {
            StatisticalType[reI] = val[seriesNameI];
          }
        }
      }
      if (type == 0) {
        if (ColorTuli[f][f] == undefined) {
          seriesData[f] = {
            name : Name[f],
            type : 'bar',
            data : Data,
            itemStyle : {
              barBorderRadius : Number(borderradius),
              color : {
                type : 'linear',
                x : 0,
                y : 0,
                x2 : 0,
                y2 : 1,
                colorStops : [ {
                  offset : 0,
                  color : HexToRgba(ColorTuli[f], Number(ystoumingdu1)) //  0%  处的颜色
                },


                  {
                    offset : 1,
                    color : HexToRgba(ColorTuli[f], Number(ystoumingdu2)) //  100%  处的颜色
                  }
                ],
              }
            },
            animationDelay : function(idx) {
              //							////console.log(idx);
              return idx * 10 + 100;
            }
          }
        } else {
          seriesData[f] = {
            name : Name[f],
            type : 'bar',
            data : Data,
            itemStyle : {
              barBorderRadius : Number(borderradius),
              color : {
                type : 'linear',
                x : 0,
                y : 0,
                x2 : 0,
                y2 : 1,
                colorStops : [ {
                  offset : 0,
                  color : HexToRgba(ColorTuli[f][f], Number(ystoumingdu1)) //  0%  处的颜色
                },


                  {
                    offset : 1,
                    color : HexToRgba(ColorTuli[f][f], Number(ystoumingdu2)) //  100%  处的颜色
                  }
                ],
              }
            },
            animationDelay : function(idx) {
              //							////console.log(idx);
              return idx * 10 + 100;
            }
          }
        }

      } else if (type == 1) {
        if (ColorTuli[f][f] == undefined) {
          seriesData[f] = {
            name : Name[f],
            type : 'bar',
            stack : '总量',
            data : Data,
            itemStyle : {
              barBorderRadius : Number(borderradius),
              color : {
                type : 'linear',
                x : 0,
                y : 0,
                x2 : 0,
                y2 : 1,
                colorStops : [ {
                  offset : 0,
                  color : HexToRgba(ColorTuli[f], Number(ystoumingdu1)) //  0%  处的颜色
                },


                  {
                    offset : 1,
                    color : HexToRgba(ColorTuli[f], Number(ystoumingdu2)) //  100%  处的颜色
                  }
                ],
              }
            },
            animationDelay : function(idx) {
              //							////console.log(idx);
              return idx * 10 + 100;
            }
          }
        } else {
          seriesData[f] = {
            name : Name[f],
            type : 'bar',
            stack : '总量',
            data : Data,
            itemStyle : {
              barBorderRadius : Number(borderradius),
              color : {
                type : 'linear',
                x : 0,
                y : 0,
                x2 : 0,
                y2 : 1,
                colorStops : [ {
                  offset : 0,
                  color : HexToRgba(ColorTuli[f][f], Number(ystoumingdu1)) //  0%  处的颜色
                },


                  {
                    offset : 1,
                    color : HexToRgba(ColorTuli[f][f], Number(ystoumingdu2)) //  100%  处的颜色
                  }
                ],
              }
            },
            animationDelay : function(idx) {
              //							////console.log(idx);
              return idx * 10 + 100;
            }
          }
        }

      } else if (type == 2) {
        seriesData[f] = {
          name : Name[f],
          type : 'pictorialBar',
          symbol : symbol,
          barCategoryGap : Number("-" + barcategorygap) + "%",
          itemStyle : {
            normal : {
              opacity : Number(opacity),
              color : {
                type : 'linear',
                x : 0,
                y : 0,
                x2 : 0,
                y2 : 1,
                colorStops : [ {
                  offset : 0,
                  color : HexToRgba(ColorTuli[f][f], Number(ystoumingdu1)) //  0%  处的颜色
                },


                  {
                    offset : 1,
                    color : HexToRgba(ColorTuli[f][f], Number(ystoumingdu2)) //  100%  处的颜色
                  }
                ],
              }
            }
          },
          emphasis : {
            itemStyle : {
              opacity : 1
            }
          },
          data : Data,
          z : 10
        }
      }
    }

    var dataZoomtrue = options.dataZoomtrue;
    var dataZoom = [];
    if (dataZoomtrue) {
      dataZoom = [
        {
          type : 'slider',
          show : false,
        },
        {
          type : 'inside',
        } ];
    }

    var titleShow = true;
    if (seriesDataF[0].itemStyle.titleShow != false) {
      titleShow = true;
    } else {
      titleShow = false;
    }
    var titleColor = seriesDataF[0].itemStyle.titleColor ? seriesDataF[0].itemStyle.titleColor : this.textColor;
    var titleFontSize = seriesDataF[0].itemStyle.titleFontSize ? seriesDataF[0].itemStyle.titleFontSize : 18;
    var titleLeft,
      titleTop,
      titleRight,
      titleBottom;
    if (titleShow && seriesDataF[0].itemStyle.titlePosition) {
      titleLeft = seriesDataF[0].itemStyle.titlePosition.split(',')[0] ? seriesDataF[0].itemStyle.titlePosition.split(',')[0] : 'auto';
      titleTop = seriesDataF[0].itemStyle.titlePosition.split(',')[1] ? seriesDataF[0].itemStyle.titlePosition.split(',')[1] : 'auto';
      titleRight = seriesDataF[0].itemStyle.titlePosition.split(',')[2] ? seriesDataF[0].itemStyle.titlePosition.split(',')[2] : 'auto';
      titleBottom = seriesDataF[0].itemStyle.titlePosition.split(',')[3] ? seriesDataF[0].itemStyle.titlePosition.split(',')[3] : 'auto';
    } else {
      titleLeft = 'auto';
      titleTop = 'auto';
      titleRight = 'auto';
      titleBottom = 'auto';
    }

    var legendShow = true;
    if (seriesDataF[0].itemStyle.legendShow != false) {
      legendShow = true;
    } else {
      legendShow = false;
    }
    var legendOrient = seriesDataF[0].itemStyle.legendOrient ? seriesDataF[0].itemStyle.legendOrient : 'vertical';
    var legendLeft,
      legendTop,
      legendRight,
      legendBottom;
    if (legendShow && seriesDataF[0].itemStyle.legendPosition) {
      legendLeft = seriesDataF[0].itemStyle.legendPosition.split(',')[0] ? seriesDataF[0].itemStyle.legendPosition.split(',')[0] : 'auto';
      legendTop = seriesDataF[0].itemStyle.legendPosition.split(',')[1] ? seriesDataF[0].itemStyle.legendPosition.split(',')[1] : '10%';
      legendRight = seriesDataF[0].itemStyle.legendPosition.split(',')[2] ? seriesDataF[0].itemStyle.legendPosition.split(',')[2] : 10;
      legendBottom = seriesDataF[0].itemStyle.legendPosition.split(',')[3] ? seriesDataF[0].itemStyle.legendPosition.split(',')[3] : 20;
    } else {
      legendLeft = 'auto';
      legendTop = '10%';
      legendRight = 10;
      legendBottom = 20;
    }
    var legendColor = seriesDataF[0].itemStyle.legendColor ? seriesDataF[0].itemStyle.legendColor : this.textColor;
    var legendFontSize = seriesDataF[0].itemStyle.legendFontSize ? seriesDataF[0].itemStyle.legendFontSize : 14;
    legendFontSize = parseInt(legendFontSize);

    var gridLeft,
      gridTop,
      gridRight,
      gridBottom;
    if (seriesDataF[0].itemStyle.gridPosition) {
      gridLeft = seriesDataF[0].itemStyle.gridPosition.split(',')[0] ? seriesDataF[0].itemStyle.gridPosition.split(',')[0] : '10%';
      gridTop = seriesDataF[0].itemStyle.gridPosition.split(',')[1] ? seriesDataF[0].itemStyle.gridPosition.split(',')[1] : '15%';
      gridRight = seriesDataF[0].itemStyle.gridPosition.split(',')[2] ? seriesDataF[0].itemStyle.gridPosition.split(',')[2] : '22%';
      gridBottom = seriesDataF[0].itemStyle.gridPosition.split(',')[3] ? seriesDataF[0].itemStyle.gridPosition.split(',')[3] : '15%';
    } else {
      gridLeft = '10%';
      gridTop = '15%';
      gridRight = '22%';
      gridBottom = '15%';
    }

    var xAxisColor = seriesDataF[0].itemStyle.xAxisColor ? seriesDataF[0].itemStyle.xAxisColor : this.textColor;
    var xAxisFontSize = seriesDataF[0].itemStyle.xAxisFontSize ? seriesDataF[0].itemStyle.xAxisFontSize : 14;
    var xAxisRotate = seriesDataF[0].itemStyle.xAxisRotate ? seriesDataF[0].itemStyle.xAxisRotate : 10;

    var yAxisColor = seriesDataF[0].itemStyle.yAxisColor ? seriesDataF[0].itemStyle.yAxisColor : this.textColor;
    var yAxisFontSize = seriesDataF[0].itemStyle.yAxisFontSize ? seriesDataF[0].itemStyle.yAxisFontSize : 14;
    var yAxisRotate = seriesDataF[0].itemStyle.yAxisRotate ? seriesDataF[0].itemStyle.yAxisRotate : 0;
    if (type == 3) {

    } else {
      if (ColorTuli[0].length > 1) {
        ColorTuli = ColorTuli[0]
      }
    }

    if (type == 2) {
      var xAxis = [
        {
          axisLabel : {
            textStyle : {
              color : xAxisColor,
              fontSize : xAxisFontSize
            },
            interval : 'auto',
            rotate : xAxisRotate,
            formatter: function (param) {
              let name = param
              if(name.length<=4){
                return  name 
              }else {
                name = name.slice(0,4) + '...';
                return  name 
              }
            }
          },
          axisTick : {
            show : false
          },
          axisLine : {
            show : true
          },
          data : StatisticalType
        } ];
      var yAxis = [
        {
          offset : 10,
          splitLine : {
            show : false
          },
          axisLine : {
            show : false
          },
          splitLine : {
            show : true
          },
          axisLabel : {
            textStyle : {
              color : yAxisColor,
              fontSize : yAxisFontSize
            },
            interval : 'auto',
            rotate : yAxisRotate,
          },
          axisTick : {
            show : false
          },
          type : 'value',
        }
      ];
    } else if (type == 3) {
      var xAxis = [
        {
          max : 'dataMax',
          label : {
            color : "#000000",
          },
          axisLabel : {
            textStyle : {
              color : xAxisColor,
              fontSize : xAxisFontSize
            },
          },
          splitLine:{
          	lineStyle:{
          		color:'#808080'
          	}  	
          }
        } ];
      var yAxis = [
        {
          type : 'category',
          inverse : inverse,
          max : Number(maxnumber) - 1,
          axisLabel : {
            show : true,
            textStyle : {
              color : yAxisColor,
              fontSize : yAxisFontSize
            },
            formatter: function (param) {
              let name = param
              if(name.length<=4){
                return  name 
              }else {
                name = name.slice(0,4) + '...';
                return  name 
              }
            }
          },
          animationDuration : 300,
          animationDurationUpdate : 300,
        }
      ];
    } else {
      var xAxis = [
        {
          type : 'category',
          axisLabel : {
            textStyle : {
              color : xAxisColor,
              fontSize : xAxisFontSize
            },
            interval : 'auto',
            rotate : xAxisRotate,
            formatter: function (param) {
              let name = param
              if(name.length<=4){
                return  name 
              }else {
                name = name.slice(0,4) + '...';
                return  name 
              }
            }
          },
          axisTick : {
            alignWithLabel : true
          },
          data : StatisticalType
        } ];
      var yAxis = [
        {
          axisLabel : {
            textStyle : {
              color : yAxisColor,
              fontSize : yAxisFontSize,
              size : 20
            },
            interval : 'auto',
            rotate : yAxisRotate
          },
          axisTick : {
            alignWithLabel : true
          },
          type : 'value',
        }
      ];
    }


    if (type == 3) {
      var option = { 
        title : {
          show : titleShow,
          text : seriesName,
          left : titleLeft,
          top : titleTop,
          right : titleRight,
          bottom : titleBottom,
          textStyle : {
            color : titleColor,
            fontSize : titleFontSize
          },
        },
        legend : {
          show : legendShow,
          type : 'scroll',
          orient : legendOrient,
          top : legendTop,
          right : legendRight,
          left : legendLeft,
          bottom : legendBottom,
          itemWidth : legendFontSize,
          itemHeight : legendFontSize,
          data : Name,
          textStyle : {
            color : legendColor,
            fontSize : legendFontSize
          },
          formatter : function(name) {
            if (name.length > 4) {
              return name.substr(0, 4) + "...";
            } else {
              return name;
            }
          },
          tooltip: {
          	trigger: 'axis',
          	axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          					type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          		}
          },
        },
        grid : {
          left : gridLeft,
          top : gridTop,
          bottom : gridBottom,
          right : gridRight,
        },
        dataset : {
          source : data.slice(1).filter(function(d) {
            return d[2] === startYear;

          })
        },
        xAxis : xAxis,
        yAxis : yAxis,
        series : [ {
          realtimeSort : true,
          seriesLayoutBy : 'column',
          type : 'bar',
					itemStyle : {
						normal : {
							borderRadius : Number(borderradius),
							shadowBlur : Number(shadowblur),
							opacity : Number(opacity),
							color : function(param) {
								return countryColors[param.value[1]] || '#5470c6';
							}
						}
					},
          encode: {
            x: 0,
            y: 3
        },
          label : {
            show : true,
            precision : 'auto',
            fontSize : fontsize,
            opacity : 0.9,
            position : position,
            valueAnimation : true,
            fontFamily : 'monospace',
            color:xAxisColor
          }
        } ],
        animationDuration : 2000,
        animationDurationUpdate : 2000,
        animationEasing : 'linear',
        animationEasingUpdate : 'linear',
        graphic : {
          elements : [ {
            type : 'text',
            right : 20,
            bottom : 60,
            style : {
              text : startYear,
              font : 'bolder 40px monospace',
              fill : 'rgba(108,80,243, 0.9)'
            },
            z : 100
          } ]
        }
      };
      var years = []
      for (var i = 0; i < dongtaidata.length; ++i) {
        if (years.length === 0 || years[years.length - 1] !== data[i][1]) {
          years.push(data[i][2]);
        }
      }
      ////console.log(years)

      var startIndex = 0;
      var startYear = years[startIndex];
      for (var i = startIndex; i < years.length -1; ++i) {
        (function(i) {
          setTimeout(function() {
            updateYear(years[i + 1]);
          }, (i - startIndex) * 600);
        })(i);
      }

      function updateYear(year) {
        var source = dongtaidata.filter(function(d) {
          return d[2] === year;
        });
        //console.log(source)
        option.series[0].data = source;

        option.graphic.elements[0].style.text = year;
        myChart.setOption(option);
      }

      if (option && typeof option === 'object') {
        myChart.setOption(option);
      }



    } else {
      if (chartPosition == 'left') {
        xAxis = [
          {
            axisLabel : {
              textStyle : {
                color : yAxisColor,
                fontSize : yAxisFontSize
              },
              interval : 'auto',
              rotate : yAxisRotate
            },
            axisTick : {
              alignWithLabel : true
            },
            type : 'value',
          }
        ];

        yAxis = [
          {
            type : 'category',
            axisLabel : {
              textStyle : {
                color : xAxisColor,
                fontSize : xAxisFontSize
              },
              interval : 'auto',
              rotate : xAxisRotate
            },
            axisTick : {
              alignWithLabel : true
            },
            data : StatisticalType
          }
        ];
      }
      var option = {
        title : {
          show : titleShow,
          text : seriesName,
          left : titleLeft,
          top : titleTop,
          right : titleRight,
          bottom : titleBottom,
          textStyle : {
            color : titleColor,
            fontSize : titleFontSize
          },
        },
        tooltip : {
          trigger : 'axis',
          axisPointer : { // 坐标轴指示器，坐标轴触发有效
            type : 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter : function(params) {
            var list = params[0].name + "<br/>";
            for (var i = 0; i < params.length; i++) {
              list += params[i].seriesName + "：" + params[i].data + "<br/>";
            }
            return list;
          }
        },
        toolbox : {
          show : false,
        },
        //				color : ColorTuli,
        legend : {
          show : legendShow,
          type : 'scroll',
          orient : legendOrient,
          top : legendTop,
          right : legendRight,
          left : legendLeft,
          bottom : legendBottom,
          itemWidth : legendFontSize,
          itemHeight : legendFontSize,
          data : Name,
          textStyle : {
            color : legendColor,
            fontSize : legendFontSize
          },
          formatter: function (param) {
            let name = param
               if(name.length<=4){
                 return  name 
               }else {
                 name = name.slice(0,4) + '...';
                 return  name 
               }
           },
          tooltip : {
            show : true
          },
        },
        grid : {
          left : gridLeft,
          top : gridTop,
          bottom : gridBottom,
          right : gridRight,
        },
        dataZoom : dataZoom,
        xAxis : xAxis,
        yAxis : yAxis,
        series : seriesData,
        animationEasing : 'elasticOut',
        animationDelayUpdate : function(idx) {
          return idx * 5;
        }
      };
    }
    //		////console.log(option)

    myChart.setOption(option); // 最后加载图表

  }
}

/**
 * 漏斗图、金字塔图
 */
class Funnel {
  constructor(Legenddiv, options) {
//    //console.log(options)
    var _seriesType = options.data[0].mapInfor.result[0].TYPE;
    var _data = options.data[0];
    for (var i in options) {
      if (options.hasOwnProperty(i) && i !== "data") {
        _data[i] = options[i];
      }
    }
    this.textColor = "#52F3F3";
    if (_seriesType === "THEMEPYRAMID_CHART") { //一般统计 金字塔  THEMEPYRAMID_CHART
      var seriesDataF = _data.myLegend.result;
      //			////console.log(seriesDataF[0].titlePosition)
      //			////console.log(seriesDataF[0].titlePosition.indexOf(","))
      if (seriesDataF[0].titlePosition.indexOf(",") > -1) {
        this._ThefunnelCharts2(Legenddiv, _data, 0);
      } else {
        this._ThefunnelCharts(Legenddiv, _data, 0);
      }
    } else if (_seriesType === "THEMEFUNNEL_CHART") { //一般统计 漏斗图  THEMEFUNNEL_CHART
      var seriesDataF = _data.myLegend.result;
      if (seriesDataF[0].titlePosition.indexOf(",") > -1) {
        this._ThefunnelCharts2(Legenddiv, _data, 1);
      } else {
        this._ThefunnelCharts(Legenddiv, _data, 1);
      }
    }
  }

  _ThefunnelCharts(Legenddiv, options, type) {

    var tilterLeft = options.tilterLeft;
    var tilterTop = options.tilterTop;
    var tilterRight = options.tilterRight;
    var tilterBottom = options.tilterBottom;
    if (!tilterLeft || !tilterTop || !tilterRight || !tilterBottom) {
      tilterTop = "top";
      tilterLeft = "left";
    }
    var seriesName = options.mapInfor.result[0].NAME;

    var myChart = echarts.init(document.getElementById(Legenddiv)); // 初始化图表，注意这里不能用JQuery方式，否则会无法初始化

    var ColorTuli = [];
    var myMapTable = options.myMapTable.result; // "地图上展示多少个图"

    if (!seriesName) {
      seriesName = options.mapInfor.result[0].NAME;
    }
    var seriesDatas = [];
    var seriesData;
    var Name = [];
    var StatisticalType;
    var SelectedName = [];
    var orient = options.myLegend.result[0].itemStyle.orient; //尖端朝向
    var shadowblur = options.myLegend.result[0].itemStyle.shadowblur; //阴影面积
    var opacity = options.myLegend.result[0].itemStyle.opacity; //透明度
    var gap = options.myLegend.result[0].itemStyle.gap; //间距
    var ystoumingdu1 = options.myLegend.result[0].itemStyle.ystoumingdu1 //顶部颜色透明度
    var ystoumingdu2 = options.myLegend.result[0].itemStyle.ystoumingdu2 //底部颜色透明度
    if (ystoumingdu1 == "") {
      ystoumingdu1 = 1
    }
    if (ystoumingdu2 == "") {
      ystoumingdu2 = 1
    }
    
    if (opacity == "") {
    	opacity = 1
    }
    if (shadowblur == "") {
    	shadowblur = 0
    }
    for (var reI = 0; reI < myMapTable.length; reI++) {
      var Data = [];
      var seriesDataF = options.myLegend.result;
      for (var f = 0; f < seriesDataF.length; f++) { //myLegend
        var val = myMapTable[reI];
        for (var seriesNameI in val) {
          Name[reI] = val[seriesDataF[f].legendPosition];
          SelectedName[f] = seriesDataF[f].fieldName;
          var valueNumber;
          if (seriesDataF[f].titlePosition === seriesNameI) {
            ColorTuli[f] = seriesDataF[f].color.split(',');
            StatisticalType = seriesNameI;
            valueNumber = Number(val[seriesNameI]);
          }
          if (SelectedName[f] == Name[reI]) {
            seriesDatas[f] = {
              value : valueNumber,
              name : Name[reI]
            };
          }
        }
      }
    }
    ////console.log(ColorTuli)
    if (ColorTuli[0].length > 1) {
      ColorTuli = ColorTuli[0]
    }
    var rpgaarr = []
    for (var i = 0; i < ColorTuli.length; i++) {
      rpgaarr[i] = [ HexToRgba(ColorTuli[i], Number(ystoumingdu1)), HexToRgba(ColorTuli[i], Number(ystoumingdu2)) ]
    }
    ////console.log(rpgaarr)
    var positionlabel = 'left';
    if (positionlabel == 'left') {
      positionlabel = {
        normal : {
          position : positionlabel,   
          formatter: function (param) {
            let name = param.data.name
               if(name.length<=3){
                 return  name 
               }else {
                 name = name.slice(0,3) + '...';
                 return  name 
               }
           },
        }
      };
    }

    var titleShow = true;
    if (seriesDataF[0].itemStyle.titleShow != false) {
      titleShow = true;
    } else {
      titleShow = false;
    }
    var titleColor = seriesDataF[0].itemStyle.titleColor ? seriesDataF[0].itemStyle.titleColor : this.textColor;
    var titleFontSize = seriesDataF[0].itemStyle.titleFontSize ? seriesDataF[0].itemStyle.titleFontSize : 18;
    var titleLeft,
      titleTop,
      titleRight,
      titleBottom;
    if (titleShow && seriesDataF[0].itemStyle.titlePosition) {
      titleLeft = seriesDataF[0].itemStyle.titlePosition.split(',')[0] ? seriesDataF[0].itemStyle.titlePosition.split(',')[0] : 'auto';
      titleTop = seriesDataF[0].itemStyle.titlePosition.split(',')[1] ? seriesDataF[0].itemStyle.titlePosition.split(',')[1] : 'auto';
      titleRight = seriesDataF[0].itemStyle.titlePosition.split(',')[2] ? seriesDataF[0].itemStyle.titlePosition.split(',')[2] : 'auto';
      titleBottom = seriesDataF[0].itemStyle.titlePosition.split(',')[3] ? seriesDataF[0].itemStyle.titlePosition.split(',')[3] : 'auto';
    } else {
      titleLeft = 'auto';
      titleTop = 'auto';
      titleRight = 'auto';
      titleBottom = 'auto';
    }

    var legendShow = true;
    if (seriesDataF[0].itemStyle.legendShow != false) {
      legendShow = true;
    } else {
      legendShow = false;
    }
    var legendOrient = seriesDataF[0].itemStyle.legendOrient ? seriesDataF[0].itemStyle.legendOrient : 'vertical';
    var legendLeft,
      legendTop,
      legendRight,
      legendBottom;
    if (legendShow && seriesDataF[0].itemStyle.legendPosition) {
      legendLeft = seriesDataF[0].itemStyle.legendPosition.split(',')[0] ? seriesDataF[0].itemStyle.legendPosition.split(',')[0] : 'auto';
      legendTop = seriesDataF[0].itemStyle.legendPosition.split(',')[1] ? seriesDataF[0].itemStyle.legendPosition.split(',')[1] : '10%';
      legendRight = seriesDataF[0].itemStyle.legendPosition.split(',')[2] ? seriesDataF[0].itemStyle.legendPosition.split(',')[2] : 10;
      legendBottom = seriesDataF[0].itemStyle.legendPosition.split(',')[3] ? seriesDataF[0].itemStyle.legendPosition.split(',')[3] : 20;
    } else {
      legendLeft = 'auto';
      legendTop = '10%';
      legendRight = 10;
      legendBottom = 20;
    }
    var legendColor = seriesDataF[0].itemStyle.legendColor ? seriesDataF[0].itemStyle.legendColor : this.textColor;
    var legendFontSize = seriesDataF[0].itemStyle.legendFontSize ? seriesDataF[0].itemStyle.legendFontSize : 14;
    legendFontSize = parseInt(legendFontSize);

    var gridLeft,
      gridTop,
      gridRight,
      gridBottom;
    if (seriesDataF[0].itemStyle.gridPosition) {
      gridLeft = seriesDataF[0].itemStyle.gridPosition.split(',')[0] ? seriesDataF[0].itemStyle.gridPosition.split(',')[0] : 80;
      gridTop = seriesDataF[0].itemStyle.gridPosition.split(',')[1] ? seriesDataF[0].itemStyle.gridPosition.split(',')[1] : 60;
      gridRight = seriesDataF[0].itemStyle.gridPosition.split(',')[2] ? seriesDataF[0].itemStyle.gridPosition.split(',')[2] : 100;
      gridBottom = seriesDataF[0].itemStyle.gridPosition.split(',')[3] ? seriesDataF[0].itemStyle.gridPosition.split(',')[3] : 40;
    } else {
      gridLeft = '10%';
      gridTop = '15%';
      gridRight = '22%';
      gridBottom = '15%';
    }

    if (type == 0) {

      seriesData = {
        name : StatisticalType,
        type : 'funnel',
        left : gridLeft,
        right :gridRight,
        top : gridTop,
        bottom : gridBottom,
        sort : 'ascending',
        gap : Number(gap),
        orient : orient,
        itemStyle : {
          normal : {
            opacity : Number(opacity),
            shadowBlur : Number(shadowblur),

            color : function(params) { // 颜色定制显示（按顺序）
              let obj = {
                type : 'linear',
                x : 0,
                y : 0,
                x2 : 0,
                y2 : 1,
                colorStops : [ {
                  offset : 0,
                  color : rpgaarr[params.dataIndex][0] // 0% 处的颜色
                }, {
                  offset : 1,
                  color : rpgaarr[params.dataIndex][1] // 100% 处的颜色
                } ],
                global : false // 缺省为 false
              }
              ////console.log(obj)
              return obj
            }
          }
        },
        label : positionlabel,
        data : seriesDatas,
      }
    } else if (type == 1) {
      seriesData = {
        name : StatisticalType,
        left : gridLeft,
        right : gridRight,
        top : gridTop,
        bottom : gridBottom,
        type : 'funnel',
        gap : Number(gap),
        orient : orient,
        itemStyle : {
          normal : {
            opacity : Number(opacity),
            shadowBlur : Number(shadowblur),

            color : function(params) { // 颜色定制显示（按顺序）
              let obj = {
                type : 'linear',
                x : 0,
                y : 0,
                x2 : 0,
                y2 : 1,
                colorStops : [ {
                  offset : 0,
                  color : rpgaarr[params.dataIndex][0] // 0% 处的颜色
                }, {
                  offset : 1,
                  color : rpgaarr[params.dataIndex][1] // 100% 处的颜色
                } ],
                global : false // 缺省为 false
              }
              ////console.log(obj)
              return obj
            }
          }
        },
        label : positionlabel,
        data : seriesDatas
      }
    }
    var option = {
      title : {
        show : titleShow,
        text : seriesName,
        left : titleLeft,
        right : titleRight,
        top : titleTop,
        bottom : titleBottom,
        textStyle : {
          color : titleColor,
          fontSize : titleFontSize
        },
      },
      tooltip : {
        trigger : 'item',
        formatter : "{a} <br/>{b} : {c}"
      },
      grid : {
        right:'30%'
      },
      toolbox : {},
      //			color : ColorTuli,
      legend : {
        show : legendShow,
        type : 'scroll',
        orient : legendOrient,
        left : '80%',
        top : legendTop,
        right : '5%',
        bottom : legendBottom,
        itemWidth : legendFontSize,
        itemHeight : legendFontSize,
        data : Name,
        textStyle : {
          color : legendColor,
          fontSize : legendFontSize
        },
        tooltip : {
          show : true
        },
        formatter: function (param) {
          let name = param
             if(name.length<=4){
               return  name 
             }else {
               name = name.slice(0,4) + '...';
               return  name 
             }
         },
      },
      calculable : true,
      series : seriesData
    };
    myChart.setOption(option); // 最后加载图表

  }

  _ThefunnelCharts2(Legenddiv, options, type) {
    var seriesName = options.mapInfor.result[0].NAME;
    var myChart = echarts.init(document.getElementById(Legenddiv)); // 初始化图表，注意这里不能用JQuery方式，否则会无法初始化

    var ColorTuli = [];
    var myMapTable = options.myMapTable.result; // "地图上展示多少个图"

    if (!seriesName) {
      seriesName = options.mapInfor.result[0].NAME;
    }
    var seriesDataslp = [];
    var Name = [];
    var seriesDataF = options.myLegend.result;
    var StatisticalType;
    var SelectedName = [];
    var orient = options.myLegend.result[0].itemStyle.orient; //尖端朝向
    var shadowblur = options.myLegend.result[0].itemStyle.shadowblur; //阴影面积
    var opacity = options.myLegend.result[0].itemStyle.opacity; //透明度
    var gap = options.myLegend.result[0].itemStyle.gap; //间距\		
    var ystoumingdu1 = options.myLegend.result[0].itemStyle.ystoumingdu1 //顶部颜色透明度
    var ystoumingdu2 = options.myLegend.result[0].itemStyle.ystoumingdu2 //底部颜色透明度
    if (ystoumingdu1 == "") {
      ystoumingdu1 = 1
    }
    if (ystoumingdu2 == "") {
      ystoumingdu2 = 1
    }
    var colorarrf = [];
    if (opacity == "") {
    	opacity = 1
    }
    if (shadowblur == "") {
    	shadowblur = 0
    }

    var titlePosition = seriesDataF[0].titlePosition.split(",");

    for (var l = 0; l < titlePosition.length; l++) {
      var seriesDatas1 = [];
      for (var reI = 0; reI < myMapTable.length; reI++) {

        for (var f = 0; f < seriesDataF.length; f++) { //myLegend
          var val = myMapTable[reI];
          for (var seriesNameI in val) {

            Name[reI] = val[seriesDataF[f].legendPosition];
            SelectedName[f] = seriesDataF[f].fieldName;
            var valueNumber;
            if (titlePosition[l] === seriesNameI) {
              ColorTuli[f] = seriesDataF[f].color;
              StatisticalType = seriesNameI;
              valueNumber = Number(val[seriesNameI]);

              if (SelectedName[f] == Name[reI]) {
                seriesDatas1[f] = {
                  value : valueNumber,
                  name : Name[reI]
                };
              }
            }
          }
        }
      }
      seriesDataslp[l] = seriesDatas1;
    }

    var seriesData = [];

    var titleShow = true;
    if (seriesDataF[0].itemStyle.titleShow != false) {
      titleShow = true;
    } else {
      titleShow = false;
    }
    var titleColor = seriesDataF[0].itemStyle.titleColor ? seriesDataF[0].itemStyle.titleColor : this.textColor;
    var titleFontSize = seriesDataF[0].itemStyle.titleFontSize ? seriesDataF[0].itemStyle.titleFontSize : 18;
    var titleLeft,
      titleTop,
      titleRight,
      titleBottom;
    if (titleShow && seriesDataF[0].itemStyle.titlePosition) {
      titleLeft = seriesDataF[0].itemStyle.titlePosition.split(',')[0] ? seriesDataF[0].itemStyle.titlePosition.split(',')[0] : 'auto';
      titleTop = seriesDataF[0].itemStyle.titlePosition.split(',')[1] ? seriesDataF[0].itemStyle.titlePosition.split(',')[1] : 'auto';
      titleRight = seriesDataF[0].itemStyle.titlePosition.split(',')[2] ? seriesDataF[0].itemStyle.titlePosition.split(',')[2] : 'auto';
      titleBottom = seriesDataF[0].itemStyle.titlePosition.split(',')[3] ? seriesDataF[0].itemStyle.titlePosition.split(',')[3] : 'auto';
    } else {
      titleLeft = 'auto';
      titleTop = 'auto';
      titleRight = 'auto';
      titleBottom = 'auto';
    }

    var legendShow = true;
    if (seriesDataF[0].itemStyle.legendShow != false) {
      legendShow = true;
    } else {
      legendShow = false;
    }
    var legendOrient = seriesDataF[0].itemStyle.legendOrient ? seriesDataF[0].itemStyle.legendOrient : 'vertical';
    var legendLeft,
      legendTop,
      legendRight,
      legendBottom;
    if (legendShow && seriesDataF[0].itemStyle.legendPosition) {
      legendLeft = seriesDataF[0].itemStyle.legendPosition.split(',')[0] ? seriesDataF[0].itemStyle.legendPosition.split(',')[0] : 'auto';
      legendTop = seriesDataF[0].itemStyle.legendPosition.split(',')[1] ? seriesDataF[0].itemStyle.legendPosition.split(',')[1] : '10%';
      legendRight = seriesDataF[0].itemStyle.legendPosition.split(',')[2] ? seriesDataF[0].itemStyle.legendPosition.split(',')[2] : 10;
      legendBottom = seriesDataF[0].itemStyle.legendPosition.split(',')[3] ? seriesDataF[0].itemStyle.legendPosition.split(',')[3] : 20;
    } else {
      legendLeft = 'auto';
      legendTop = '10%';
      legendRight = 10;
      legendBottom = 20;
    }
    var legendColor = seriesDataF[0].itemStyle.legendColor ? seriesDataF[0].itemStyle.legendColor : this.textColor;
    var legendFontSize = seriesDataF[0].itemStyle.legendFontSize ? seriesDataF[0].itemStyle.legendFontSize : 14;
    legendFontSize = parseInt(legendFontSize);

    var gridLeft,
      gridTop,
      gridRight,
      gridBottom;
    if (seriesDataF[0].itemStyle.gridPosition) {
      gridLeft = seriesDataF[0].itemStyle.gridPosition.split(',')[0] ? seriesDataF[0].itemStyle.gridPosition.split(',')[0] : 80;
      gridTop = seriesDataF[0].itemStyle.gridPosition.split(',')[1] ? seriesDataF[0].itemStyle.gridPosition.split(',')[1] : 60;
      gridRight = seriesDataF[0].itemStyle.gridPosition.split(',')[2] ? seriesDataF[0].itemStyle.gridPosition.split(',')[2] : 100;
      gridBottom = seriesDataF[0].itemStyle.gridPosition.split(',')[3] ? seriesDataF[0].itemStyle.gridPosition.split(',')[3] : 40;
    } else {
      gridLeft = 80;
      gridTop = 60;
      gridRight = 100;
      gridBottom = 40;
    }
    var rpgaarr = []
    if (ColorTuli[0].length > 1) {
      ColorTuli = ColorTuli[0]
    }
    for (var i = 0; i < ColorTuli.length; i++) {
      rpgaarr[i] = [ HexToRgba(ColorTuli[i], Number(ystoumingdu1)), HexToRgba(ColorTuli[i], Number(ystoumingdu2)) ]
    }
    ////console.log(rpgaarr)

    if (type == 0) {
      var t = {
        name : titlePosition[0],
        type : 'funnel',
        left : gridLeft,
        right : gridRight,
        top : gridTop,
        bottom : '50%',
        sort : 'ascending',
        orient : orient,
        gap : Number(gap),
        itemStyle : {
          normal : {
            opacity : Number(opacity),
            shadowBlur : Number(shadowblur),
            color : function(params) { // 颜色定制显示（按顺序）
              let obj = {
                type : 'linear',
                x : 0,
                y : 0,
                x2 : 0,
                y2 : 1,
                colorStops : [ {
                  offset : 0,
                  color : rpgaarr[params.dataIndex][0] // 0% 处的颜色
                }, {
                  offset : 1,
                  color : rpgaarr[params.dataIndex][1] // 100% 处的颜色
                } ],
                global : false // 缺省为 false
              }
              ////console.log(obj)
              return obj
            }
          }
        },
        data : seriesDataslp[0],
      };
      seriesData.push(t);

      var b = {
        name : titlePosition[1],
        type : 'funnel',
        orient : orient,
        gap : Number(gap),
        itemStyle : {
          normal : {
            opacity : Number(opacity),
            shadowBlur : Number(shadowblur),
            color : function(params) { // 颜色定制显示（按顺序）
              let obj = {
                type : 'linear',
                x : 0,
                y : 0,
                x2 : 0,
                y2 : 1,
                colorStops : [ {
                  offset : 0,
                  color : rpgaarr[params.dataIndex][0] // 0% 处的颜色
                }, {
                  offset : 1,
                  color : rpgaarr[params.dataIndex][1] // 100% 处的颜色
                } ],
                global : false // 缺省为 false
              }
              ////console.log(obj)
              return obj
            }
          }
        },
        left : gridLeft,
        right : gridRight,
        top : '50%',
        bottom : gridBottom,
        data : seriesDataslp[1],
      }
      seriesData.push(b);
    } else if (type == 1) {
      var t = {
        name : titlePosition[0],
        type : 'funnel',
        orient : orient,
        gap : Number(gap),
        itemStyle : {
          normal : {
            opacity : Number(opacity),
            shadowBlur : Number(shadowblur),
            color : function(params) { // 颜色定制显示（按顺序）
              let obj = {
                type : 'linear',
                x : 0,
                y : 0,
                x2 : 0,
                y2 : 1,
                colorStops : [ {
                  offset : 0,
                  color : rpgaarr[params.dataIndex][0] // 0% 处的颜色
                }, {
                  offset : 1,
                  color : rpgaarr[params.dataIndex][1] // 100% 处的颜色
                } ],
                global : false // 缺省为 false
              }
              ////console.log(obj)
              return obj
            }
          }
        },
        left : gridLeft,
        right : gridRight,
        top : gridTop,
        bottom : '50%',
        data : seriesDataslp[0],
      };
      seriesData.push(t);

      var b = {
        name : titlePosition[1],
        type : 'funnel',
        left : gridLeft,
        right : gridRight,
        top : '50%',
        bottom : gridBottom,
        sort : 'ascending',
        orient : orient,
        gap : Number(gap),
        itemStyle : {
          normal : {
            opacity : Number(opacity),
            shadowBlur : Number(shadowblur),
            color : function(params) { // 颜色定制显示（按顺序）
              let obj = {
                type : 'linear',
                x : 0,
                y : 0,
                x2 : 0,
                y2 : 1,
                colorStops : [ {
                  offset : 0,
                  color : rpgaarr[params.dataIndex][0] // 0% 处的颜色
                }, {
                  offset : 1,
                  color : rpgaarr[params.dataIndex][1] // 100% 处的颜色
                } ],
                global : false // 缺省为 false
              }
              ////console.log(obj)
              return obj
            }
          }
        },
        data : seriesDataslp[1],
      }
      seriesData.push(b);
    }
    var option = {
      title : {
        show : titleShow,
        text : seriesName,
        left : titleLeft,
        right : titleRight,
        top : titleTop,
        bottom : titleBottom,
        textStyle : {
          color : titleColor,
          fontSize : titleFontSize
        },
      },
      tooltip : {
        trigger : 'item',
        formatter : "{a} <br/>{b} : {c}"
      },
      grid : {
        right:'30%'
      },
      toolbox : {},
      //			color : ColorTuli,
      legend : {
        show : legendShow,
        type : 'scroll',
        orient : legendOrient,
        left : '80%',
        right : '5%',
        top : legendTop,
        bottom : legendBottom,
        data : Name,
        itemWidth : legendFontSize,
        itemHeight : legendFontSize,
        textStyle : {
          color : legendColor,
          fontSize : legendFontSize
        },
        tooltip : {
          show : true
        },
        formatter: function (param) {
          let name = param
             if(name.length<=4){
               return  name 
             }else {
               name = name.slice(0,4) + '...';
               return  name 
             }
         },
      },
      calculable : true,
      series : seriesData
    };
    //		////console.log(option)
    myChart.setOption(option); // 最后加载图表

  }
}

/**
 * 仪表盘
 */
 class Gauge {
	
  constructor(Legenddiv, options) {
    var _data = options.data[0];
//   console.log(options)
    for (var i in options) {
      if (options.hasOwnProperty(i) && i !== "data") {
        _data[i] = options[i];
      }
    }
    this.textColor = "#52F3F3";
    this._ThemdashboardCharts(Legenddiv, _data);
  //		console.log(options)
  }

  _ThemdashboardCharts(Legenddiv, options) {
    var myChart = echarts.init(document.getElementById(Legenddiv)); // 初始化图表，注意这里不能用JQuery方式，否则会无法初始化

    var seriesDataF = options.myLegend.result;
    var myMapTable = options.myMapTable.result; // "地图上展示多少个图"
    var dataone = options.myLegend.result[0].itemStyle.dataone;
    var datatwo = options.myLegend.result[0].itemStyle.datatwo;
    var datathree = options.myLegend.result[0].itemStyle.datathree;
    var yibiaopanshuliang = options.myLegend.result[0].itemStyle.yibiaopanshuliang;
    var mytype = options.myLegend.result[0].itemStyle.yibiaopanyangshi;
    var datayszd = options.myLegend.result[0].itemStyle.datayszd;

    var pointerlength = options.myLegend.result[0].itemStyle.pointerlength;
    var pointerwidth = options.myLegend.result[0].itemStyle.pointerwidth;
    var shadowblur = options.myLegend.result[0].itemStyle.shadowblur;
    var opacity = options.myLegend.result[0].itemStyle.opacity;
    var timespeed = options.myLegend.result[0].itemStyle.timespeed;
    var dataOne = [];
    var dataTwo = [];
    var dataThree = [];
    var dataName = [];
    if (opacity == "") {
    	opacity = 1
    }
    if (shadowblur == "") {
    	shadowblur = 0
    }

    for (var i = 0; i < options.myMapTable.result.length; i++) {
      dataOne[i] = options.myMapTable.result[i][dataone];
      dataTwo[i] = options.myMapTable.result[i][datatwo];
      dataThree[i] = options.myMapTable.result[i][datathree];
      dataName[i] = options.myMapTable.result[i][datayszd]
    }

    //console.log(dataOne, dataTwo, dataThree, dataName)
    var maxdataone = Math.max.apply(null, dataOne)
    var maxdatatwo = Math.max.apply(null, dataTwo)
    var maxdatathree = Math.max.apply(null, dataThree)

    var Name = [];
    var titlePosition = [];
    var sel = 0;
    var Data = [];
    var unit = [];
    var val = myMapTable[0];
    for (var sf in seriesDataF) {
      for (var seriesNameI in val) {
        if (seriesDataF[sf].fieldName === seriesNameI || seriesDataF[sf].fieldName === seriesNameI.toUpperCase()) {
          Name[sf] = seriesNameI;

          Data[sf] = Number(val[seriesNameI]);
          titlePosition[sf] = parseInt(seriesDataF[sf].maxval);
          unit[sf] = seriesDataF[sf].unit;
        }

      }
    }

    var Myseries = []
    if (mytype == "yangshione") {
      var myseries = {
        name : dataone,
        type : 'gauge',
        z : 3,
        min : 0,
        max : Number(maxdataone),
        splitNumber : 10,
        radius : '40%',
        axisLine : { // 坐标轴线
          lineStyle : { // 属性lineStyle控制线条样式
            width : 10,
            color : [
              [ 0.3, '#67e0e3' ],
              [ 0.7, '#37a2da' ],
              [ 1, '#fd666d' ]
            ]
          },
        },
        axisTick : { // 坐标轴小标记
          length : 15, // 属性length控制线长
          lineStyle : { // 属性lineStyle控制线条样式
            color : 'auto'
          }
        },
        splitLine : { // 分隔线
          length : 20, // 属性length控制线长
          lineStyle : { // 属性lineStyle（详见lineStyle）控制线条样式
            color : 'auto'
          }
        },
        title : {
          color : 'auto',
          fontSize : 15
        },
        axisLabel : {
          backgroundColor : 'auto',
          borderRadius : 2,
          color : '#eee',
          padding : 3,
          textShadowBlur : 2,
          textShadowOffsetX : 1,
          textShadowOffsetY : 1,
          textShadowColor : '#222'
        },
        title : {
          // 其余属性默认使用全局文本样式，详见TEXTSTYLE
          fontWeight : 'bolder',
          fontSize : 22,
          fontStyle : 'italic',
          color : 'auto',
          text : '仪表盘'
        },
        pointer : {
          length : Number(pointerlength) + '%',
          width : Number(pointerwidth) + '%'
        },
        itemStyle : {
          normal : {
            color : 'auto',
            shadowblur : Number(shadowblur),
            opacity : Number(opacity)
          }
        },
        detail : {
          // 其余属性默认使用全局文本样式，详见TEXTSTYLE
          formatter : function(value) {
            if (Number(value) < 100) {
              value = (value + '').split('.');
              value.length < 2 && (value.push('00'));
              return ('00' + value[0]).slice(-2)
                + '.' + (value[1] + '00').slice(0, 2);
            } else {
              return Number(Math.floor(value))
            }
          },
          color : 'auto',
//          fontWeight : 'bolder',
//          borderRadius : 3,
//          backgroundColor : '#444',
//          borderColor : '#aaa',
//          shadowBlur : 5,
//          shadowColor : '#333',
//          shadowOffsetX : 0,
//          shadowOffsetY : 3,
//          borderWidth : 2,
//          textBorderColor : '#000',
//          textBorderWidth : 2,
//          textShadowBlur : 2,
//          textShadowColor : '#fff',
//          textShadowOffsetX : 0,
//          textShadowOffsetY : 0,
//          fontFamily : 'Arial',
//          width : 100,
//          color : '#eee',
//          rich : {}
        },
        data : [ {
          value : dataOne[0],
          name : dataone
        } ]
      }
    } else if (mytype == "yangshitwo") {
      var myseries = {
        type : 'gauge',
        z : 3,
        min : 0,
        max : Number(maxdataone),
        radius : '40%',
        axisLine : {
          lineStyle : {
            width : 30,
            color : [
              [ 0.3, '#67e0e3' ],
              [ 0.7, '#37a2da' ],
              [ 1, '#fd666d' ]
            ]
          }
        },
        pointer : {
          icon : 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
          length : Number(pointerlength) + '%',
          width : Number(pointerwidth) + '%',
          offsetCenter : [ 0, '-50%' ],
          itemStyle : {
            color : '#A8FF24'
          }
        },
        title : {
          color : 'auto',
          fontSize : 10
        },
        axisTick : {
          distance : -30,
          length : 8,
          lineStyle : {
            color : '#fff',
            width : 2
          }
        },
        splitLine : {
          distance : -30,
          length : 30,
          lineStyle : {
            color : '#fff',
            width : 4
          }
        },
        axisLabel : {
          color : 'auto',
          distance : 40,
          fontSize : 20
        },
        detail : {
          // 其余属性默认使用全局文本样式，详见TEXTSTYLE
          formatter : function(value) {
            if (Number(value) < 100) {
              value = (value + '').split('.');
              value.length < 2 && (value.push('00'));
              return ('00' + value[0]).slice(-2)
                + '.' + (value[1] + '00').slice(0, 2);
            } else {
              return Number(Math.floor(value))
            }
          },
          color : 'auto',
//          fontWeight : 'bolder',
//          borderRadius : 3,
//          backgroundColor : '#444',
//          borderColor : '#aaa',
//          shadowBlur : 5,
//          shadowColor : '#333',
//          shadowOffsetX : 0,
//          shadowOffsetY : 3,
//          borderWidth : 2,
//          textBorderColor : '#000',
//          textBorderWidth : 2,
//          textShadowBlur : 2,
//          textShadowColor : '#fff',
//          textShadowOffsetX : 0,
//          textShadowOffsetY : 0,
//          fontFamily : 'Arial',
//          width : 100,
//          color : 'auto',
//          rich : {}
        },
        data : [ {
          value : dataOne[0],
          name : dataone
        } ]
      }
    } else if (mytype == "yangshithree") {
      var myseries = {
        name : 'hour',
        type : 'gauge',
        startAngle : 90,
        endAngle : -270,
        min : 0,
        max : Number(maxdataone),
        radius : '40%',
        splitNumber : 12,
        axisLine : {
          lineStyle : {
            width : 15,
            color : [
              [ 0.3, '#67e0e3' ],
              [ 0.7, '#37a2da' ],
              [ 1, '#fd666d' ]
            ],
            shadowColor : 'rgba(0, 0, 0, 0.5)',
            shadowBlur : 15
          }
        },
        splitLine : { // 分隔线
          length : 20, // 属性length控制线长
          lineStyle : { // 属性lineStyle（详见lineStyle）控制线条样式
            color : 'auto'
          }
        },
        axisLabel : {
          fontSize : 20,
          distance : 25,
          color : 'auto',
          formatter : function(value) {
            if (value === 0) {
              return '';
            }
            value = (value + '').split('.');
            value.length < 2 && (value.push('00'));
            return ('00' + value[0]).slice(-2)
              + '.' + (value[1] + '00').slice(0, 2);
          }
        },
        pointer : {
          icon : 'path://M2.9,0.7L2.9,0.7c1.4,0,2.6,1.2,2.6,2.6v115c0,1.4-1.2,2.6-2.6,2.6l0,0c-1.4,0-2.6-1.2-2.6-2.6V3.3C0.3,1.9,1.4,0.7,2.9,0.7z',
          length : Number(pointerlength) + '%',
          width : Number(pointerwidth) + '%',
          offsetCenter : [ 0, '8%' ],
          itemStyle : {
            color : 'auto',
            shadowColor : 'rgba(0, 0, 0, 0.3)',
            shadowBlur : 8,
            shadowOffsetX : 2,
            shadowOffsetY : 4
          }
        },
        title : {
          offsetCenter : [ 0, '-50%' ],
          color : 'auto',
          fontSize : 15
        },
        detail : {
          // 其余属性默认使用全局文本样式，详见TEXTSTYLE
          formatter : function(value) {
            if (Number(value) < 100) {
              value = (value + '').split('.');
              value.length < 2 && (value.push('00'));
              return ('00' + value[0]).slice(-2)
                + '.' + (value[1] + '00').slice(0, 2);
            } else {
              return Number(Math.floor(value))
            }
          },
          color : 'auto',
//          fontWeight : 'bolder',
//          borderRadius : 3,
//          backgroundColor : '#444',
//          borderColor : '#aaa',
//          shadowBlur : 5,
//          shadowColor : '#333',
//          shadowOffsetX : 0,
//          shadowOffsetY : 3,
//          borderWidth : 2,
//          textBorderColor : '#000',
//          textBorderWidth : 2,
//          textShadowBlur : 2,
//          textShadowColor : '#fff',
//          textShadowOffsetX : 0,
//          textShadowOffsetY : 0,
//          fontFamily : 'Arial',
//          width : 100,
//          color : 'auto',
//          rich : {}
        },

        data : [ {
          value : 0
        } ]
      }
    } else if (mytype == "yangshifour") {
      var myseries1 = {
        type : 'gauge',
        center : [ "70%", "60%" ],
        radius : '40%',
        startAngle : 200,
        endAngle : -20,
        min : 0,
        max : 60,
        splitNumber : 12,
        color : {
          type : 'linear',
          x : 0,
          y : 0,
          x2 : 0,
          y2 : 1,
          colorStops : [ {
            offset : 0,
            color : 'rgba(0,212,230,0.6)' // 0% 处的颜色
          }, {
            offset : 0.5,
            color : 'rgba(0,212,230,.2)',
          },
            {
              offset : 1,
              color : 'rgba(0,212,230,0.6)',
            } ],
        },

        progress : {
          show : true,
          width : 30
        },

        pointer : {
          show : false,
        },
        axisLine : {
          lineStyle : {
            width : 30,
          }
        },
        axisTick : {
          distance : -45,
          splitNumber : 5,
          lineStyle : {
            width : 2,
            color : 'auto'
          }
        },
        splitLine : {
          distance : -52,
          length : 14,
          lineStyle : {
            width : 3,
            color : 'auto'
          }
        },
        axisLabel : {
          distance : -25,
          fontSize : 20,
          color : '#67e0e3',
          formatter : function(value) {
            if (Number(value) < 100) {
              value = (value + '').split('.');
              value.length < 2 && (value.push('00'));
              return ('00' + value[0]).slice(-2)
                + '.' + (value[1] + '00').slice(0, 2);
            } else {
              return Number(Math.floor(value))
            }
          }
        },
        anchor : {
          show : false
        },
        title : {
          offsetCenter : [ 0, '-30%' ],
          color : 'auto',
          fontSize : 15
        },
        detail : {
          // 其余属性默认使用全局文本样式，详见TEXTSTYLE
          formatter : function(value) {
            if (Number(value) < 100) {
              value = (value + '').split('.');
              value.length < 2 && (value.push('00'));
              return ('00' + value[0]).slice(-2)
                + '.' + (value[1] + '00').slice(0, 2);
            } else {
              value = Math.floor(value)
            }

          },
          color : 'auto',
//          fontWeight : 'bolder',
//          borderRadius : 3,
//          backgroundColor : '#444',
//          borderColor : '#aaa',
//          shadowBlur : 5,
//          shadowColor : '#333',
//          shadowOffsetX : 0,
//          shadowOffsetY : 3,
//          borderWidth : 2,
//          textBorderColor : '#000',
//          textBorderWidth : 2,
//          textShadowBlur : 2,
//          textShadowColor : '#fff',
//          textShadowOffsetX : 0,
//          textShadowOffsetY : 0,
//          fontFamily : 'Arial',
//          width : 100,
//          color : 'auto',
//          rich : {}
        },

        data : [ {
          value : 20
        } ]
      }
      var myseries2 = {
        type : 'gauge',
        radius : '50%',
        center : [ "70%", "60%" ],
        startAngle : 200,
        endAngle : -20,
        min : 0,
        max : 60,
        color : {
          type : 'linear',
          x : 0,
          y : 0,
          x2 : 0,
          y2 : 1,
          colorStops : [ {
            offset : 0,
            color : 'rgba(0,212,230,0.5)' // 0% 处的颜色
          }, {
            offset : 0.5,
            color : 'rgba(0,212,230,.7)',
          },
            {
              offset : 1,
              color : 'rgba(0,212,230,0.5)',
            } ],
        },
        progress : {
          show : true,
          width : 8
        },

        pointer : {
          show : false
        },
        axisLine : {
          show : false
        },
        title : {
          show : false
        },
        axisTick : {
          show : false
        },
        splitLine : {
          show : false
        },
        axisLabel : {
          show : false
        },
        detail : {
          show : false
        },
        data : [ {
          value : 20,
        } ]
      }
    }

    if (mytype == "yangshifour") {
      if (yibiaopanshuliang == 1) {
        var series1 = $.extend(true, {}, myseries1)
        var series2 = $.extend(true, {}, myseries2)
        Myseries = [ series1, series2 ]
        Myseries[0].name = dataone
        Myseries[0].max = Number(maxdataone)
        Myseries[0].data = [ {
          value : dataOne[0],
          name : dataone
        } ]
        Myseries[0].center = [ '50%', '50%' ]
        Myseries[1].name = dataone
        Myseries[1].max = Number(maxdataone)
        Myseries[1].data = [ {
          value : dataOne[0],
          name : dataone
        } ]
        Myseries[1].center = [ '50%', '50%' ]

      } else if (yibiaopanshuliang == 2) {
        var series1 = $.extend(true, {}, myseries1)
        var series2 = $.extend(true, {}, myseries2)
        var series3 = $.extend(true, {}, myseries1)
        var series4 = $.extend(true, {}, myseries2)
        Myseries = [ series1, series2, series3, series4 ]
        Myseries[0].name = dataone
        Myseries[0].max = Number(maxdataone)
        Myseries[0].data = [ {
          value : dataOne[0],
          name : dataone
        } ]
        Myseries[0].center = [ '30%', '50%' ]

        Myseries[1].name = dataone
        Myseries[1].max = Number(maxdataone)
        Myseries[1].data = [ {
          value : dataOne[0],
          name : dataone
        } ]
        Myseries[1].center = [ '30%', '50%' ]

        Myseries[2].name = datatwo
        Myseries[2].max = Number(maxdatatwo)
        Myseries[2].data = [ {
          value : dataTwo[0],
          name : datatwo
        } ]
        Myseries[2].center = [ '70%', '50%' ]

        Myseries[3].name = datatwo
        Myseries[3].max = Number(maxdatatwo)
        Myseries[3].data = [ {
          value : dataTwo[0],
          name : datatwo
        } ]
        Myseries[3].center = [ '70%', '50%' ]


      } else if (yibiaopanshuliang == 3) {
        var series1 = $.extend(true, {}, myseries1)
        var series2 = $.extend(true, {}, myseries2)
        var series3 = $.extend(true, {}, myseries1)
        var series4 = $.extend(true, {}, myseries2)
        var series5 = $.extend(true, {}, myseries1)
        var series6 = $.extend(true, {}, myseries2)

        Myseries = [ series1, series2, series3, series4, series5, series6 ]
        Myseries[0].name = dataone
        Myseries[0].max = Number(maxdataone)
        Myseries[0].data = [ {
          value : dataOne[0],
          name : dataone
        } ]
        Myseries[0].center = [ '50%', '30%' ]

        Myseries[1].name = dataone
        Myseries[1].max = Number(maxdataone)
        Myseries[1].data = [ {
          value : dataOne[0],
          name : dataone
        } ]
        Myseries[1].center = [ '50%', '30%' ]


        Myseries[2].name = datatwo
        Myseries[2].max = Number(maxdatatwo)
        Myseries[2].data = [ {
          value : dataTwo[0],
          name : datatwo
        } ]
        Myseries[2].center = [ '20%', '70%' ]

        Myseries[3].name = datatwo
        Myseries[3].max = Number(maxdatatwo)
        Myseries[3].data = [ {
          value : dataTwo[0],
          name : datatwo
        } ]
        Myseries[3].center = [ '20%', '70%' ]


        Myseries[4].name = datathree
        Myseries[4].max = Number(maxdatathree)
        Myseries[4].data = [ {
          value : dataThree[0],
          name : datathree
        } ]
        Myseries[4].center = [ '80%', '70%' ]

        Myseries[5].name = datathree
        Myseries[5].max = Number(maxdatathree)
        Myseries[5].data = [ {
          value : dataThree[0],
          name : datathree
        } ]
        Myseries[5].center = [ '80%', '70%' ]

      }
    } else {
      if (yibiaopanshuliang == 1) {
        var series1 = $.extend(true, {}, myseries)
        Myseries = [ series1 ]
        Myseries[0].name = dataone
        Myseries[0].max = Number(maxdataone)
        Myseries[0].data = [ {
          value : dataOne[0],
          name : dataone
        } ]
        Myseries[0].center = [ '50%', '50%' ]
        Myseries[0].radius = Number("80") + '%'
      } else if (yibiaopanshuliang == 2) {
        var series1 = $.extend(true, {}, myseries)
        var series2 = $.extend(true, {}, myseries)
        Myseries = [ series1, series2 ]
        Myseries[0].name = dataone
        Myseries[0].max = Number(maxdataone)
        Myseries[0].data = [ {
          value : dataOne[0],
          name : dataone
        } ]
        Myseries[0].center = [ '30%', '50%' ]
        Myseries[1].name = datatwo
        Myseries[1].max = Number(maxdatatwo)
        Myseries[1].data = [ {
          value : dataTwo[0],
          name : datatwo
        } ]
        Myseries[1].center = [ '70%', '50%' ]
      } else if (yibiaopanshuliang == 3) {
        var series1 = $.extend(true, {}, myseries)
        var series2 = $.extend(true, {}, myseries)
        var series3 = $.extend(true, {}, myseries)

        Myseries = [ series1, series2, series3 ]
        Myseries[0].name = dataone
        Myseries[0].max = Number(maxdataone)
        Myseries[0].data = [ {
          value : dataOne[0],
          name : dataone
        } ]
        Myseries[0].center = [ '50%', '30%' ]
        Myseries[1].name = datatwo
        Myseries[1].max = Number(maxdatatwo)
        Myseries[1].data = [ {
          value : dataTwo[0],
          name : datatwo
        } ]
        Myseries[1].center = [ '20%', '60%' ]
        Myseries[2].name = datathree
        Myseries[2].max = Number(maxdatathree)
        Myseries[2].data = [ {
          value : dataThree[0],
          name : datathree
        } ]
        Myseries[2].center = [ '80%', '60%' ]
      }
    }
    myChart.showLoading({   
    	maskColor:'#040042',
    	fontSize: 20,
    });
    var option = {
      tooltip : {
        formatter : "{a} <br/>{c} {b}"
      },
      toolbox : {
        show : false,
        feature : {
          restore : {
            show : true
          },
          saveAsImage : {
            show : true
          }
        }
      },
      title : {
        show : true,
        text : 'aaa',
        textStyle : {
          color : 'rgba(0,212,230,.7)',
          fontWeight : 'bolder',
          fontSize : 20,
          fontStyle : 'italic',
        },
        right : 'right',
        bottom : '5%'
      },
      series : Myseries
    }



    if (mytype == "yangshifour") {
      if (yibiaopanshuliang == 1) {
        setInterval(function() {
          var aa = dataOne.length
          var randomaa = Math.floor((Math.random() * aa))
          option.series[0].data[0].value = dataOne[randomaa];
          option.series[1].data[0].value = dataOne[randomaa];
          option.title.text = dataName[randomaa]
          myChart.hideLoading();
          myChart.setOption(option, true);
        }, timespeed);
      } else if (yibiaopanshuliang == 2) {
        setInterval(function() {
          var aa = dataOne.length
          var randomaa = Math.floor((Math.random() * aa))
          option.series[0].data[0].value = dataOne[randomaa];
          option.series[1].data[0].value = dataOne[randomaa];
          option.series[2].data[0].value = dataTwo[randomaa];
          option.series[3].data[0].value = dataTwo[randomaa];
          option.title.text = dataName[randomaa]
          myChart.hideLoading();
          myChart.setOption(option, true);
        }, timespeed);
      } else {
        setInterval(function() {
          var aa = dataOne.length
          var randomaa = Math.floor((Math.random() * aa))
          option.series[0].data[0].value = dataOne[randomaa];
          option.series[1].data[0].value = dataOne[randomaa];
          option.series[2].data[0].value = dataTwo[randomaa];
          option.series[3].data[0].value = dataTwo[randomaa];
          option.series[4].data[0].value = dataThree[randomaa];
          option.series[5].data[0].value = dataThree[randomaa];
          option.title.text = dataName[randomaa]
          myChart.hideLoading();
          myChart.setOption(option, true);
        }, timespeed);
      }

    } else {
      if (yibiaopanshuliang == 1) {
        setInterval(function() {
          var aa = dataOne.length
          var randomaa = Math.floor((Math.random() * aa))
          option.series[0].data[0].value = dataOne[randomaa];
          option.title.text = dataName[randomaa]
          myChart.hideLoading();
          myChart.setOption(option, true);
        }, timespeed);
      } else if (yibiaopanshuliang == 2) {
        setInterval(function() {
          var aa = dataOne.length
          var randomaa = Math.floor((Math.random() * aa))
          option.series[0].data[0].value = dataOne[randomaa];
          option.series[1].data[0].value = dataTwo[randomaa];
          option.title.text = dataName[randomaa]
          myChart.hideLoading();
          myChart.setOption(option, true);
        }, timespeed);
      } else {
        setInterval(function() {
          var aa = dataOne.length
          var randomaa = Math.floor((Math.random() * aa))
          option.series[0].data[0].value = dataOne[randomaa];
          option.series[1].data[0].value = dataTwo[randomaa];
          option.series[2].data[0].value = dataThree[randomaa];
          option.title.text = dataName[randomaa]
          myChart.hideLoading();
          myChart.setOption(option, true);
        }, timespeed);
      }
    }
  }

}

/**
 * 散点图
 */
class Scatter {
  constructor(Legenddiv, options) {

    var _seriesType = options.data[0].mapInfor.result[0].TYPE;
    var zhuangtai = options.data[0].myLegend.result[0].itemStyle.zhuangtai;
    var _data = options.data[0];
    for (var i in options) {
      if (options.hasOwnProperty(i) && i !== "data") {
        _data[i] = options[i];
      }
    }
    this.textColor = "#52F3F3";
    if (zhuangtai === 'dongtai') {
      this._TheSanDianCharts(Legenddiv, _data);
    } else {
      this._TheSanDianCharts2(Legenddiv, _data);
    }
  }

  _TheSanDianCharts(Legenddiv, options) { //散点图
    var myChart = echarts.init(document.getElementById(Legenddiv)); // 初始化图表，注意这里不能用JQuery方式，否则会无法初始化
    var myMapTable = options.myMapTable.result; // "地图上展示多少个图"
    var myLegend = options.myLegend.result;
    var seriesDataF = myLegend;
    var seriesName = options.mapInfor.result[0].NAME;
    var ziduan_one = options.myLegend.result[0].itemStyle.ziduan_one;
    var ziduan_two = options.myLegend.result[0].itemStyle.ziduan_two;
    var ziduan_three = options.myLegend.result[0].itemStyle.ziduan_three;
    var timeaxis=options.myLegend.result[0].itemStyle.timeaxis;
    var opacity = options.myLegend.result[0].itemStyle.opacity;
    var shadowblur = options.myLegend.result[0].itemStyle.shadowblur;
    var sandiancolor = [];
    var sizearr=[];
    var countryColors={};
    var country2=[];
    var max1 = [];
    var max2 = [];
    var data = [];
    var timeaxisarr=[];
    
    if (opacity == "") {
    	opacity = 1
    }
    if (shadowblur == "") {
    	shadowblur = 0
    }
    
    for (var i = 0; i < myLegend.length; i++) {
    	sandiancolor[i]= myLegend[i].color
    	country2[i]= myLegend[i].fieldName
    }

    for (var i = 0; i < myMapTable.length; i++) {
    	timeaxisarr[i]=myMapTable[i][timeaxis]
    	sizearr[i]=Number(myMapTable[i][ziduan_three])
    }
    
    var timeaxisarr2 = []
    function dedupe(array) {
      return timeaxisarr2 = Array.from(new Set(array));
    }
    dedupe(timeaxisarr)
//    //console.log(timeaxisarr2)
    for (var i = 0; i < sandiancolor.length; i++) {
			countryColors[country2[i]] = sandiancolor[i]
		}
//    //console.log(countryColors)
    for (var i = 0; i <  Number(myMapTable.length/country2.length); i++) {
      var arrays = new Array()
      for (var j = 0; j < myMapTable.length; j++) {
        if (timeaxisarr2[i] == myMapTable[j][timeaxis]) {
          var array = new Array();
          max1.push(Number(myMapTable[j][ziduan_two]));
          max2.push(Number(myMapTable[j][ziduan_three]));
          array[0] = Number(myMapTable[j][ziduan_two]);
          array[1] = Number(myMapTable[j][ziduan_three]);
          array[2] = Number(myMapTable[j][ziduan_three]);
          array[3] = myMapTable[j][ziduan_one];
          array[4] = myMapTable[j][timeaxis];
          arrays.push(array);
        }
      }
      data.push(arrays);
    }

//    var data2 = [];
//    for (i = 0; i < data.length; i++) {
//      data2[i] = data[i][0][1]
//    }
//
    var maxdata2 = Math.max.apply(null, sizearr)


    max1 = max1.sort(CommonlyChartsSortNumber);
    max2 = max2.sort(CommonlyChartsSortNumber);
    var itemStyle = {
      normal : {
        opacity : Number(opacity),
//        color : sandiancolor[0][0],
//        shadowBlur : Number(shadowblur),
//        shadowOffsetX : 0,
//        shadowOffsetY : 0,
//        shadowColor : 'rgba(0, 0, 0, 0.5)'
      }
    };
    var sizeFunction = function (x) {
        var y = Math.sqrt(x / 5e8) + 0.1;
        if(y<0.15){
          	return y * 280;
        }
        else{
          	return y=40
        }
          
    };


    var schema = [
      {
        index : 0,
        text : ziduan_two
      },
      {
        index : 1,
        text : ziduan_three
      },
      {
        index : 2,
        text : ziduan_one
      }
    ];

    var titleShow = true;
    if (seriesDataF[0].itemStyle.titleShow != false) {
      titleShow = true;
    } else {
      titleShow = false;
    }
    var titleColor = seriesDataF[0].itemStyle.titleColor ? seriesDataF[0].itemStyle.titleColor : this.textColor;
    var titleFontSize = seriesDataF[0].itemStyle.titleFontSize ? seriesDataF[0].itemStyle.titleFontSize : 18;
    var titleLeft,
      titleTop,
      titleRight,
      titleBottom;
    if (titleShow && seriesDataF[0].itemStyle.titlePosition) {
      titleLeft = seriesDataF[0].itemStyle.titlePosition.split(',')[0] ? seriesDataF[0].itemStyle.titlePosition.split(',')[0] : 'auto';
      titleTop = seriesDataF[0].itemStyle.titlePosition.split(',')[1] ? seriesDataF[0].itemStyle.titlePosition.split(',')[1] : 'auto';
      titleRight = seriesDataF[0].itemStyle.titlePosition.split(',')[2] ? seriesDataF[0].itemStyle.titlePosition.split(',')[2] : 'auto';
      titleBottom = seriesDataF[0].itemStyle.titlePosition.split(',')[3] ? seriesDataF[0].itemStyle.titlePosition.split(',')[3] : 'auto';
    } else {
      titleLeft = 'auto';
      titleTop = 'auto';
      titleRight = 'auto';
      titleBottom = 'auto';
    }

    var titleSubColor = seriesDataF[0].itemStyle.titleSubColor ? seriesDataF[0].itemStyle.titleSubColor : this.textColor;
    var titleSubFontSize = seriesDataF[0].itemStyle.titleSubFontSize ? seriesDataF[0].itemStyle.titleSubFontSize : 50;
    var titleSubLeft = seriesDataF[0].itemStyle.titleSubPosition.split(',')[0] ? seriesDataF[0].itemStyle.titleSubPosition.split(',')[0] : 'auto';
    var titleSubTop = seriesDataF[0].itemStyle.titleSubPosition.split(',')[1] ? seriesDataF[0].itemStyle.titleSubPosition.split(',')[1] : 'auto';
    var titleSubRight = seriesDataF[0].itemStyle.titleSubPosition.split(',')[2] ? seriesDataF[0].itemStyle.titleSubPosition.split(',')[2] : '20%';
    var titleSubBottom = seriesDataF[0].itemStyle.titleSubPosition.split(',')[3] ? seriesDataF[0].itemStyle.titleSubPosition.split(',')[3] : '20%';

    var timeLineOrient = seriesDataF[0].itemStyle.timeLineOrient ? seriesDataF[0].itemStyle.timeLineOrient : 'vertical';
    var timeLineWidth = seriesDataF[0].itemStyle.timeLine.split(',')[0] ? seriesDataF[0].itemStyle.timeLine.split(',')[0] : 55;
    var timeLineHeight = seriesDataF[0].itemStyle.timeLine.split(',')[1] ? seriesDataF[0].itemStyle.timeLine.split(',')[1] : 'auto';
    var timeLineLeft = seriesDataF[0].itemStyle.timeLinePosition.split(',')[0] ? seriesDataF[0].itemStyle.timeLinePosition.split(',')[0] : 'auto';
    var timeLineTop = seriesDataF[0].itemStyle.timeLinePosition.split(',')[1] ? seriesDataF[0].itemStyle.timeLinePosition.split(',')[1] : 20;
    var timeLineRight = seriesDataF[0].itemStyle.timeLinePosition.split(',')[2] ? seriesDataF[0].itemStyle.timeLinePosition.split(',')[2] : 0;
    var timeLineBottom = seriesDataF[0].itemStyle.timeLinePosition.split(',')[3] ? seriesDataF[0].itemStyle.timeLinePosition.split(',')[3] : 20;
    var timeLineColor = seriesDataF[0].itemStyle.timeLineColor ? seriesDataF[0].itemStyle.timeLineColor : this.textColor;
    var timeLineFontSize = seriesDataF[0].itemStyle.timeLineFontSize ? seriesDataF[0].itemStyle.timeLineFontSize : 14;

    var gridLeft,
      gridTop,
      gridRight,
      gridBottom;
    if (seriesDataF[0].itemStyle.gridPosition) {
      gridLeft = seriesDataF[0].itemStyle.gridPosition.split(',')[0] ? seriesDataF[0].itemStyle.gridPosition.split(',')[0] : '10%';
      gridTop = seriesDataF[0].itemStyle.gridPosition.split(',')[1] ? seriesDataF[0].itemStyle.gridPosition.split(',')[1] : '15%';
      gridRight = seriesDataF[0].itemStyle.gridPosition.split(',')[2] ? seriesDataF[0].itemStyle.gridPosition.split(',')[2] : '22%';
      gridBottom = seriesDataF[0].itemStyle.gridPosition.split(',')[3] ? seriesDataF[0].itemStyle.gridPosition.split(',')[3] : '15%';
    } else {
      gridLeft = '10%';
      gridTop = '15%';
      gridRight = '22%';
      gridBottom = '15%';
    }


    var xAxisColor = seriesDataF[0].itemStyle.xAxisColor ? seriesDataF[0].itemStyle.xAxisColor : this.textColor;
    var xAxisFontSize = seriesDataF[0].itemStyle.xAxisFontSize ? seriesDataF[0].itemStyle.xAxisFontSize : 14;
    var xAxisRotate = seriesDataF[0].itemStyle.xAxisRotate ? seriesDataF[0].itemStyle.xAxisRotate : 0;

    var yAxisColor = seriesDataF[0].itemStyle.yAxisColor ? seriesDataF[0].itemStyle.yAxisColor : this.textColor;
    var yAxisFontSize = seriesDataF[0].itemStyle.yAxisFontSize ? seriesDataF[0].itemStyle.yAxisFontSize : 14;
    var yAxisRotate = seriesDataF[0].itemStyle.yAxisRotate ? seriesDataF[0].itemStyle.yAxisRotate : 0;


    var option = {
      baseOption : {
        timeline : {
          axisType : 'category',
          orient : timeLineOrient,
          autoPlay : true,
          inverse : true,
          playInterval : 1000,
          left : timeLineLeft,
          right : timeLineRight,
          top : timeLineTop,
          bottom : timeLineBottom,
          width : timeLineWidth,
          height : timeLineHeight,
          label : {
            normal : {
              textStyle : {
  							color : function(param) {
  								return countryColors[param.value[1]] || '#5470c6';
  							},
                fontSize : timeLineFontSize
              }
            },
            emphasis : {
              textStyle : {
                color : timeLineColor,
                fontSize : timeLineFontSize
              }
            }
          },
          symbol : 'none',
          lineStyle : {
            color : '#555'
          },
          checkpointStyle : {
            color : '#bbb',
            borderColor : '#777',
            borderWidth : 2
          },
          controlStyle : {
            showNextBtn : false,
            showPrevBtn : false,
            normal : {
              color : '#666',
              borderColor : '#666'
            },
            emphasis : {
              color : '#aaa',
              borderColor : '#aaa'
            }
          },
          data : []
        },
        title : [ {
          right : 20,
          bottom : 80,
          textStyle : {
            fontSize : 30,
            color : '#fff'
          }
        }, {
          show : titleShow,
          text : seriesName,
          left : titleLeft,
          right : titleRight,
          top : titleTop,
          bottom : titleBottom,
          textStyle : {
            fontSize : titleFontSize,
            color : titleColor
          }
        } ],
        tooltip : {
          padding : 5,
          backgroundColor : '#fff',
          borderColor : '#777',
          borderWidth : 1,
          formatter : function(obj) {
            var value = obj.value;
            return schema[2].text + '：' + value[3] + '<br>'
            +schema[0].text + '：' + value[0] + '<br>'
              + schema[1].text + '：' + value[1] + '<br>';
             
          }
        },
        grid : {
          containLabel : true,
          left : gridLeft,
          right : gridRight,
          top : gridTop,
          bottom : gridBottom
        },
        xAxis : {
          type : 'value',
          name : ziduan_two,
          max : max1[max1.length - 1],
          nameGap : 20,
          nameLocation : 'middle',
          nameTextStyle : {
            color : '#fff',
            fontSize : xAxisFontSize
          },
          splitLine : {
            show : false
          },
          axisLine : {
            lineStyle : {
              color : '#fff'
            }
          },
          axisLabel : {
            formatter : '{value}',
            textStyle : {
              color : '#fff',
              fontSize : xAxisFontSize
            },
            interval : 0,
            rotate : xAxisRotate
          }
        },
        yAxis : {
          type : 'value',
          name : ziduan_three,
          max : max2[max2.length - 1]*1.5,
          nameTextStyle : {
            color :'#fff',
            fontSize : yAxisFontSize
          },
          axisLine : {
            lineStyle : {
              color : '#ccc'
            }
          },
          splitLine : {
            show : false
          },
          axisLabel : {
            formatter : '{value}',
            textStyle : {
              color : '#fff',
              fontSize : yAxisFontSize
            },
            interval : 0,
            rotate : yAxisRotate
          }
        },
        visualMap : [
          {
            show : false,
            dimension : 3,
            categories: country2,
            calculable : true,
            precision : 0.1,
            textGap : 30,
            textStyle : {
              color : '#ccc'
            },
            inRange : {
              color : (function() {
                var colors = sandiancolor;
                return colors.concat(colors);
              })()
            }
          }
        ],
        series : [
          {
            type : 'scatter',
            itemStyle : itemStyle,
            data : data[0],
	          symbolSize: function(val) {
	            return sizeFunction(val[2]);
	        }
          }
        ],
        animationDurationUpdate : 1000,
        animationEasingUpdate : 'quinticInOut'
      },
      options : []
    };
    timeaxisarr2 = timeaxisarr2.sort();
//    //console.log(timeaxisarr2)
    for (var n = 0; n < timeaxisarr2.length; n++) {
      option.baseOption.timeline.data.push(timeaxisarr2[n]);
      option.options.push({
        title : {
          show : true,
          'text' : timeaxisarr2[n] + ''
        },
        series : {
          name : timeaxisarr2[n],
          type : 'scatter',
          itemStyle : itemStyle,
          data : data[n],
          symbolSize: function(val) {
            return sizeFunction(val[2]);
        }
        }
      });
    }
//    //console.log(option)
    myChart.setOption(option);
  }


  _TheSanDianCharts2(Legenddiv, options) { //静态散点图
    ////console.log(options)
    var myChart = echarts.init(document.getElementById(Legenddiv)); // 初始化图表，注意这里不能用JQuery方式，否则会无法初始化
    var myMapTable = options.myMapTable.result; // "地图上展示多少个图"
    var myLegend = options.myLegend.result;
    var seriesDataF = myLegend;
    var seriesName = options.mapInfor.result[0].NAME;
    var ziduan_one = options.myLegend.result[0].itemStyle.ziduan_one;
    var ziduan_two = options.myLegend.result[0].itemStyle.ziduan_two;
    var ziduan_three = options.myLegend.result[0].itemStyle.ziduan_three;
    var opacity = options.myLegend.result[0].itemStyle.opacity;
    var shadowblur = options.myLegend.result[0].itemStyle.shadowblur;
    var sandiancolor = options.myLegend.result[0].color;
    var sandiancolor = [ sandiancolor.split(",") ];

    //		////console.log(options)
    var max1 = [];
    var max2 = [];
    var data = [];
    var data2 = [];
    var dta_time = [];
    for (var i = 0; i < myLegend.length; i++) {
      var arrays = new Array()
      for (var j = 0; j < myMapTable.length; j++) {
        if (myLegend[i].fieldName == myMapTable[j][ziduan_one]) {
          var array = new Array();
          max1.push(Number(myMapTable[j][ziduan_two]));
          max2.push(Number(myMapTable[j][ziduan_three]));
          array[0] = Number(myMapTable[j][ziduan_two]);
          array[1] = Number(myMapTable[j][ziduan_three]);
          //					array[2] = Number("0");
          //					array[3] = "sss";
          array[4] = myMapTable[j][ziduan_one];
          arrays.push(array);
          data[i] = [ Number(myMapTable[j][ziduan_two]), Number(myMapTable[j][ziduan_three]), myMapTable[j][ziduan_one] ];
          data2[i] = myMapTable[j][ziduan_one]
        }

      }


      dta_time.push(myLegend[i].fieldName);
    }

    //		////console.log(data)
    max1 = max1.sort(CommonlyChartsSortNumber);
    max2 = max2.sort(CommonlyChartsSortNumber);
    //		for(i=0;i<data.length;i++){
    //			data2[i]=data2[i]/1000+1
    //				}	////console.log(data2)

    var schema = [
      {
        index : 0,
        text : ziduan_two
      },
      {
        index : 1,
        text : ziduan_three
      },
      {
        index : 2,
        text : ziduan_one
      }
    ];
    //////console.log(schema)
    var titleShow = true;
    if (seriesDataF[0].itemStyle.titleShow != false) {
      titleShow = true;
    } else {
      titleShow = false;
    }
    var titleColor = seriesDataF[0].itemStyle.titleColor ? seriesDataF[0].itemStyle.titleColor : this.textColor;
    var titleFontSize = seriesDataF[0].itemStyle.titleFontSize ? seriesDataF[0].itemStyle.titleFontSize : 18;
    var titleLeft,
      titleTop,
      titleRight,
      titleBottom;
    if (titleShow && seriesDataF[0].itemStyle.titlePosition) {
      titleLeft = seriesDataF[0].itemStyle.titlePosition.split(',')[0] ? seriesDataF[0].itemStyle.titlePosition.split(',')[0] : 'auto';
      titleTop = seriesDataF[0].itemStyle.titlePosition.split(',')[1] ? seriesDataF[0].itemStyle.titlePosition.split(',')[1] : 'auto';
      titleRight = seriesDataF[0].itemStyle.titlePosition.split(',')[2] ? seriesDataF[0].itemStyle.titlePosition.split(',')[2] : 'auto';
      titleBottom = seriesDataF[0].itemStyle.titlePosition.split(',')[3] ? seriesDataF[0].itemStyle.titlePosition.split(',')[3] : 'auto';
    } else {
      titleLeft = 'auto';
      titleTop = 'auto';
      titleRight = 'auto';
      titleBottom = 'auto';
    }

    var titleSubColor = seriesDataF[0].itemStyle.titleSubColor ? seriesDataF[0].itemStyle.titleSubColor : this.textColor;
    var titleSubFontSize = seriesDataF[0].itemStyle.titleSubFontSize ? seriesDataF[0].itemStyle.titleSubFontSize : 50;
    var titleSubLeft = seriesDataF[0].itemStyle.titleSubPosition.split(',')[0] ? seriesDataF[0].itemStyle.titleSubPosition.split(',')[0] : 'auto';
    var titleSubTop = seriesDataF[0].itemStyle.titleSubPosition.split(',')[1] ? seriesDataF[0].itemStyle.titleSubPosition.split(',')[1] : 'auto';
    var titleSubRight = seriesDataF[0].itemStyle.titleSubPosition.split(',')[2] ? seriesDataF[0].itemStyle.titleSubPosition.split(',')[2] : '20%';
    var titleSubBottom = seriesDataF[0].itemStyle.titleSubPosition.split(',')[3] ? seriesDataF[0].itemStyle.titleSubPosition.split(',')[3] : '20%';

    var timeLineOrient = seriesDataF[0].itemStyle.timeLineOrient ? seriesDataF[0].itemStyle.timeLineOrient : 'vertical';
    var timeLineWidth = seriesDataF[0].itemStyle.timeLine.split(',')[0] ? seriesDataF[0].itemStyle.timeLine.split(',')[0] : 55;
    var timeLineHeight = seriesDataF[0].itemStyle.timeLine.split(',')[1] ? seriesDataF[0].itemStyle.timeLine.split(',')[1] : 'auto';
    var timeLineLeft = seriesDataF[0].itemStyle.timeLinePosition.split(',')[0] ? seriesDataF[0].itemStyle.timeLinePosition.split(',')[0] : 'auto';
    var timeLineTop = seriesDataF[0].itemStyle.timeLinePosition.split(',')[1] ? seriesDataF[0].itemStyle.timeLinePosition.split(',')[1] : 20;
    var timeLineRight = seriesDataF[0].itemStyle.timeLinePosition.split(',')[2] ? seriesDataF[0].itemStyle.timeLinePosition.split(',')[2] : 0;
    var timeLineBottom = seriesDataF[0].itemStyle.timeLinePosition.split(',')[3] ? seriesDataF[0].itemStyle.timeLinePosition.split(',')[3] : 20;
    var timeLineColor = seriesDataF[0].itemStyle.timeLineColor ? seriesDataF[0].itemStyle.timeLineColor : this.textColor;
    var timeLineFontSize = seriesDataF[0].itemStyle.timeLineFontSize ? seriesDataF[0].itemStyle.timeLineFontSize : 14;

    var gridLeft,
      gridTop,
      gridRight,
      gridBottom;
    if (seriesDataF[0].itemStyle.gridPosition) {
      gridLeft = seriesDataF[0].itemStyle.gridPosition.split(',')[0] ? seriesDataF[0].itemStyle.gridPosition.split(',')[0] : '10%';
      gridTop = seriesDataF[0].itemStyle.gridPosition.split(',')[1] ? seriesDataF[0].itemStyle.gridPosition.split(',')[1] : '15%';
      gridRight = seriesDataF[0].itemStyle.gridPosition.split(',')[2] ? seriesDataF[0].itemStyle.gridPosition.split(',')[2] : '22%';
      gridBottom = seriesDataF[0].itemStyle.gridPosition.split(',')[3] ? seriesDataF[0].itemStyle.gridPosition.split(',')[3] : '15%';
    } else {
      gridLeft = '10%';
      gridTop = '15%';
      gridRight = '22%';
      gridBottom = '15%';
    }


    var xAxisColor = seriesDataF[0].itemStyle.xAxisColor ? seriesDataF[0].itemStyle.xAxisColor : this.textColor;
    var xAxisFontSize = seriesDataF[0].itemStyle.xAxisFontSize ? seriesDataF[0].itemStyle.xAxisFontSize : 14;
    var xAxisRotate = seriesDataF[0].itemStyle.xAxisRotate ? seriesDataF[0].itemStyle.xAxisRotate : 0;

    var yAxisColor = seriesDataF[0].itemStyle.yAxisColor ? seriesDataF[0].itemStyle.yAxisColor : this.textColor;
    var yAxisFontSize = seriesDataF[0].itemStyle.yAxisFontSize ? seriesDataF[0].itemStyle.yAxisFontSize : 14;
    var yAxisRotate = seriesDataF[0].itemStyle.yAxisRotate ? seriesDataF[0].itemStyle.yAxisRotate : 0;
    var ndata = []
    for (i = 0; i < data.length; i++) {
      ndata[i] = data[i][1]
    }

    var maxval = Math.max.apply(null, ndata)

    var option = {
      title : [ {
        left : titleSubLeft,
        right : titleSubRight,
        top : titleSubTop,
        bottom : titleSubBottom,
        textStyle : {
          fontSize : titleSubFontSize,
          color : titleSubColor
        }
      }, {
        show : titleShow,
        text : seriesName,
        left : titleLeft,
        right : titleRight,
        top : titleTop,
        bottom : titleBottom,
        textStyle : {
          fontSize : titleFontSize,
          color : titleColor
        }
      } ],
      tooltip : {
        padding : 5,
        backgroundColor : '#222',
        borderColor : '#777',
        borderWidth : 1,
        formatter : function(obj) {
          var value = obj.value;
          //					////console.log(obj)
          return schema[0].text + '：' + value[0] + '<br>'
            + schema[1].text + '：' + value[1] + '<br>'
            + schema[2].text + '：' + value[2] + '<br>'
        }
      },
      grid : {
        containLabel : true,
        left : gridLeft,
        right : gridRight,
        top : gridTop,
        bottom : gridBottom
      },
      xAxis : {
        type : 'value',
        name : ziduan_two,
        max : max1[max1.length - 1],
        nameGap : 1,
        nameLocation : 'end',
        nameTextStyle : {
          color : xAxisColor,
          fontSize : xAxisFontSize
        },
        splitLine : {
          show : false
        },
        axisLine : {
          lineStyle : {
            color : '#ccc'
          }
        },
        axisLabel : {
          formatter : '{value}',
          textStyle : {
            color : xAxisColor,
            fontSize : xAxisFontSize
          },
          interval : 0,
          rotate : xAxisRotate
        }
      },
      yAxis : {
        type : 'value',
        name : ziduan_three,
        max : max2[max2.length - 1],
        nameTextStyle : {
          color : yAxisColor,
          fontSize : yAxisFontSize
        },
        axisLine : {
          lineStyle : {
            color : '#ccc'
          }
        },
        splitLine : {
          show : false
        },
        axisLabel : {
          formatter : '{value}',
          textStyle : {
            color : yAxisColor,
            fontSize : yAxisFontSize
          },
          interval : 0,
          rotate : yAxisRotate
        }
      },
      series : [
        {
          type : 'scatter',
          symbol : 'circle',
          data : data,
          symbolSize : function(val) {
            return (val[1] / maxval) * 30 + 10
          },
          itemStyle : {
            normal : {
//              color : sandiancolor[0][0],
              opacity : Number(opacity),
              shadowBlur : Number(shadowblur),
            }
          },
        }
      ]
    };

    ////console.log(option)
    myChart.setOption(option);
  }
}










function CommonlyChartsSortNumber(a, b) {
  return a - b;
}

/*16进制颜色转换为RGB*/
String.prototype.colorRgb = function() {
  var sColor = this.toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = "#";
      for (var i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    //处理六位的颜色值
    var sColorChange = [];
    for (var i = 1; i < 7; i += 2) {
      sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
    }
    return sColorChange.join(",");
  } else {
    return sColor;
  }
};


function HexToRgba(hex, opacity) //添加颜色透明度
{
  var rgbaarr = []
  if (hex instanceof Array == false) {
    return "rgba(" + parseInt("0x" + hex.slice(1, 3)) + "," + parseInt("0x" + hex.slice(3, 5)) + "," + parseInt("0x" + hex.slice(5, 7)) + "," + opacity + ")"
  } else {
    for (i = 0; i < hex.length; i++) {
      rgbaarr[i] = "rgba(" + parseInt("0x" + hex[i].slice(1, 3)) + "," + parseInt("0x" + hex[i].slice(3, 5)) + "," + parseInt("0x" + hex[i].slice(5, 7)) + "," + opacity + ")"
    }
    return rgbaarr
  }
}

//export default commonlyCharts;

window.Pie=Pie
window.Radar=Radar
window.Ring=Ring
window.Line=Line
window.Bar=Bar
window.Funnel=Funnel
window.Gauge=Gauge
window.Scatter= Scatter