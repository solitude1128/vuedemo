// 防抖方法
export function debounce(func, delay) {//delay 时间
    let timer = null
    return function (...args) {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            // call(对象,aa,a,a,a)   apply(对象,[aa,a,a,a])
            func.apply(this, args)
        }, delay)
    }
}