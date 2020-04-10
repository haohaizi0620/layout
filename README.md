This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

预览页面和编辑页面
    在router.js里面 App 里面是编辑页面  ShowPage 是预览页面
    访问路径 在api文件夹里面deploy的字符串表示部署的路径开头,local表示的是本地的路径,自行修改
数据库添加的字段
    EZTD_THEME_TABLE add Field   SORTNUM(排序字段)  CELLTYPEID(每个其他图层的id标识数据)
    EZTD_THEME_CELL add Field   SORTNUM(排序字段)   LAYERPOSITION(图表和地图定位数据)
在本地测试其他图层的方式
    打开component里卖弄的header.js文件,将onClickAdd方法在 if (layerType !== "chart") 之前的哪个注释打开就可以在本地测试其他图层了
在header里面添加新的图层
    ①.将新添加的图层的对象信息添加到datasource里面的chartDatas.json文件里
    ②.在index.css里面使用当前图层的仿照其他的进行设置当前图表背景
    ③.将新添加的图层的对象信息仿照原来的添加到component文件夹里面的header.js文件夹
在头部添加其他图层的时候分为以下几步：
    ①.在datasource里面的otherDefaultData.json是用来记录其他图层内容的默认数据,将添加的图层的数据添加到对应的位置
    ②.在utils里面的globalAPI.js里面的方法,如果是添加大图层的话就是添加layerType,小图层的话添加layerId的判断
    ③.在component文件夹的properties.js里面的constructor里面的设置新的图层对象的值,里面的内容根据编辑面板要展示啥定义类型
        在proerttiesFile文件夹的EditSimpleMainInfo.js里面是用来存放每一个小的节点的,
        type的类型为Collapse代表当前的是下拉框类型的配置选项
        目前有的类型：｛
            InputNumber:"数字输入框",
            Slider:"滑动条带数字输入框",
            Color:"颜色",
            ImageUploading:"图片上传",
            Input:"输入框",
            Select:"下拉选择器",
            Switch:"开关",
            noContent:"用来展示当前图层没有数据",
            EditJsonReactAjrm："编辑json",
            JsonShow:"显示代码"
            TextArea："文本域"
        ｝
        在方法updateStateVal()里面对当前图层对象进行添加和赋值
    ④.如果配置的数据有需要多次调用对象才能设置的(例如text图层的value的值),就需要到layout的changeProperties()方法里面添加上里面的判断
    ⑤.将对应的layer文件写在component文件夹下面的otherLayer里面写上对应的组件,当然也可以函数组件.
数据变动触发的方法,
    stroe还没删的时候有
        store.subscribe进行订阅,不过这个store没有啥用可以删除,
    如果变换不更改的话可以调用layer.js里面的updaetRightData方法,这个方法就是调用右侧配置组件里面的刷新的方法

