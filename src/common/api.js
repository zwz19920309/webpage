import { fetchGet, fetchPost } from './https'
/** 
*获取类别列表
*/
export const getCatesList = data => fetchGet('http://localhost:3005/admin/cates/getCatesList', data)
export const getContTypeList = data => fetchGet('http://localhost:3005/admin/conttype/getContTypeList', data)
export const addPageNew = data => fetchPost('http://localhost:3005/admin/page/addPageNew', data)
export const getPageNewList = data => fetchGet('http://localhost:3005/admin/page/getPageList', data)
export const deletePageNew = data => fetchPost('http://localhost:3005/admin/page/deletePageNew', data)
export const editPageNew = data => fetchPost('http://localhost:3005/admin/page/editPageNew', data)
export const getSpiderInfo = data => fetchPost('http://localhost:3005/admin/spider/getSpiderInfo', data)