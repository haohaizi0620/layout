
export function chartOption(n, id) {
    if (n == 'jbbt') {
        var arr = window.arr ? window.arr : [];
        var flag = false;//是否存在
        if (arr) {
            arr.forEach(function (e, item) {
                if (e == id) {
                    flag = true;
                    return false;
                }
            });
        }
        if (!flag) {
            var url = 'http://172.24.254.94/service/Thematic?request=GetSpecify&id=17&user=testV4&password=testV4123';
            fetch(url)
                .then(response => response.json())
                .then(function (data) {
                    var a = new window.dmapgl.commonlyCharts(id, {data: data});
                    arr.push(id);
                    window.arr = arr;
                })
                .catch(e => console.log("error", e));
        } else {
            var e_instance = document.getElementById(id).getAttribute("_echarts_instance_");
            window.echarts.getInstanceById(e_instance).resize();
        }
    } else if (n == 'yhbt') {

    } else if (n == 'jbzt') {

    }
}
