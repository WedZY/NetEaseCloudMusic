import request from "@/utils/request/request.js"

// 轮播图
function getBanner(){
  return request({
    url:"/banner",
    method:'GET', 
  })
}
//搜索建议
function getSearchAdvice(advice){
  return request({
    url:`/search/suggest?keywords=${advice}&type=mobile`,
    method:'GET',
  })
}
export default{
	getBanner,
  getSearchAdvice,
}