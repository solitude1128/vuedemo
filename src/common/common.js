export function getBanner(bname, callback) {
    return bname().then((res) => {
        if (res.code != 200) return;
        callback(res)
    });
}
export function getFeature(fname, num, callback) {
    return fname().then((res) => {
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
export function getSearchGoods(gname, a, callback) {
    gname(a).then((res) => {
        if (res.code != 200) return;
        callback(res)
    });
}