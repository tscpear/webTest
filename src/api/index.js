/**
 * 包含应用所有接口的亲求函数
 */
import ajax from './ajax'
// export function reqLogin(){
//     ajax('/login',{username,password},'POST')
// }
export const reqLogin = (username,password) => ajax('/login',{username,password},'POST')

export const getApiUriList = (obj) => {
    let url = `/uri/list?page=${obj.page}&limit=${obj.limit}`
    if(obj.uriValue || !obj.uriValue === ''){
        url = url + `&uriValue=${obj.uriValue}`
    }
    if(obj.uriMark || !obj.uriMark === ''){
        url = url + `&uriMark=${obj.uriMark}`
    }
    if(obj.device && !obj.device==='0'){
        url = url + `&device=${obj.device}`
    }
    return ajax(url,{},'GET');
}