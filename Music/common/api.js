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
// 全面搜索
function getAllSearchMusic(MusicName,offset,pageSize){
  return request({
    url:`/cloudsearch?keywords=${MusicName}&type=1&offset=${offset}&limit=${pageSize}`,
   method:'GET'    
  })
}
export default{
	getBanner,
  getSearchAdvice,
  getAllSearchMusic,
}