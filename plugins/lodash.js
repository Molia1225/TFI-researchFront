/*
 * @Autor: XinWei
 * @Date: 2021-04-16 11:09:35
 * @LastEditors: XinWei
 * @LastEditTime: 2021-04-16 11:11:55
 * @Description: 
 */
import _ from "lodash"



global._ = _

export default function({app, store, isDev}){
  
  let Eve = !isDev?'production':"dev"

  global.G_ENV = require("@/config/"+Eve).default
  
}
