const serviceModule = {
  baseURL: process.env.NODE_ENV === 'production'
    ? "http://admin.dbx-vip.com/"
    : "http://admin.dbx-vip.com/",
  getUserInfo: {
  },
  login: {
    url: 'app/login/user_login',
    method: 'get'
  },
  getIndexData: {
    url: 'api/convert/selectIndexData.do',
    method: 'post'
  },
  selectIndexProduct: {
    url: 'api/mall/selectIndexProduct.do ',
    method: 'post'
  },
  // 查询商品列表
  selectMallProductList: {
    url: 'api/mall/selectMallProductList.do',
    method: 'post'
  },
}
const Api = { ...serviceModule }

export default Api