import {requestPost} from './request'
export function postShopCart(uid){
    return requestPost({
        url:"/vuedemo/get_shopcart",
        data:{//post请求数据的时候,提交数据用data
            user_id:uid
        }
    })
}