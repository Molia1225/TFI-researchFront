/*
 * @Autor: XinWei
 * @Date: 2021-04-16 11:02:06
 * @LastEditors: XinWei
 * @LastEditTime: 2021-04-23 14:51:04
 * @Description: 
 */

/**
 *  请求方法
 *  params 
 *      url: required
 *      method: required
 *      data: 
 **/
import axios from 'axios'
export function request (opt) {
  console.log(opt.responseType)
  return new Promise((resovle, reject) => {
    axios({
      url: G_ENV.baseUrl + opt.url,
      method: opt.method,
      [opt.responseType?'responseType':'']:opt.responseType,
      [opt.method.toLowerCase() == 'get' ? 'params' : 'data']: opt.data
    }).then(response => {
      const { data, code } = response.data
      if(opt.responseType){
        resovle(data)
        return
      }
      if (code == 100000) {
        resovle(data)
      } else {
        reject(data);
      }
    }).catch(err => {
      reject(err);
    })
  })
}
