export function getBanner(bname, callback) {
    return bname().then((res) => {
        if (res.code != 200) return;
        callback(res)
    });
}
export function getFeature(fname, num, callback) {
    return fname(1).then((res) => {
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
export function getAllFeature(fname, callback) {
    return fname(0).then((res) => {
        if (res.code != 200) return;
        let obj = {
            "推荐": [],
            "3C专区": [],
            超市生活: [],
            时尚穿搭: [],
            特色频道: [],
        }
        let allF = (data, ele) => {
            for (let i = 0; i < data.length; i++) {
                if (data[i].classify == ele) {
                    obj[ele].push(data[i]);
                }
            }
        };
        allF(res.data, "推荐");
        allF(res.data, "3C专区");
        allF(res.data, "超市生活");
        allF(res.data, "时尚穿搭");
        allF(res.data, "特色频道");
        callback(res, obj)
    });
}
export function getSearchGoods(gname, a, callback) {
    gname(a).then((res) => {
        if (res.code != 200) return;
        callback(res)
    });
}