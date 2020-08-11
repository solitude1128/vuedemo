// 需要传递参数的函数
export function haveData(name, a, callback) {
    name(a).then((res) => {
        callback(res)
    });
}
// 不需要参数的函数
export function noData(name, callback) {
    name().then((res) => {
        if (res.code != 200) return;
        callback(res)
    });
}
// 操作一些东西的函数
export function getFeature(fname, num, callback) {
    fname(1).then((res) => {
        if (res.code != 200) return;
        let feaArr = []
        for (let i = 0; i < res.data.length / num; i++) {
            feaArr.push([]);
            for (let j in res.data) {
                if (parseInt(j / num) == i) {
                    feaArr[i].push(res.data[j]);
                }
            }
        }
        callback(res, feaArr)
    });
}