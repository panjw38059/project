import {request} from "./request";

export function getHomeMultidata(){
  return request({
    url: "/home/multidata"
  })
}
export function getHomeGoodsData(params){
  return request({
    url: "/home/data",
    params
  })
}


