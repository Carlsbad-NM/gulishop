// 这个文件是项目的接口请求函数文件
// 给每个接口发送请求，都封装成一个函数，需要请求拿数据时，就调用对应函数
import Ajax from "@/ajax/Ajax";
import mockAjax from "@/ajax/mockAjax";

// 请求获取三级分类列表数据   get请求   /api/product/getBaseCategoryList
export const reqCategoryList = () =>
  Ajax({
    url: "/product/getBaseCategoryList",
    method: "GET"
  });

// 使用mock的接口去请求数据   get请求
export const reqBannerList = () => mockAjax.get("/banner");
export const reqFloorList = () => mockAjax.get("/floor");

// 请求search的商品搜索列表数据   post请求   /api/list
export const reqGoodsList = searchParams => Ajax.post("/list", searchParams);

// 请求商品详情数据  get请求   /api/item/{ skuId }
export const reqGoodsDetailInfo = skuId => Ajax.get(`/item/${skuId}`);

// 请求添加或更新购物车商品   post请求   /api/cart/addToCart/{ skuId }/{ skuNum }
export const reqAddOrUpdateShopCart = (skuId, skuNum) =>
  Ajax.post(`/cart/addToCart/${skuId}/${skuNum}`);

// 请求购物车列表数据   get请求   /api/cart/cartList
export const reqShopCartList = () => Ajax.get("/cart/cartList");

// 请求修改购物车商品选中状态  get请求  /api/cart/checkCart/{skuID}/{isChecked}
export const reqUpdateIsChecked = (skuID, isChecked) => Ajax.get(`/cart/checkCart/${skuID}/${isChecked}`);

// 请求删除购物车商品   delete请求   /api/cart/deleteCart/{skuId}
export const reqDeleteCart = skuId => Ajax.delete(`/cart/deleteCart/${skuId}`);

// 请求注册   post请求   /api/user/passport/register
export const reqRegister = (userInfo) => Ajax.post('/user/passport/register', userInfo)

// 请求登录   post请求   /api/user/passport/login
export const reqLogin = (userInfo) => Ajax.post('/user/passport/login', userInfo)

// 请求退出登录   get请求   /api/user/passport/logout
export const reqLogout = () => Ajax.get('/user/passport/logout')

// 请求订单交易信息   get请求   /api/order/auth/trade
export const reqTradeInfo = () => Ajax.get('/order/auth/trade')

// 请求提交订单   post请求   /api/order/auth/submitOrder?tradeNo={tradeNo}
export const reqSubmitOrder = (tradeNo, tradeInfo) => Ajax.post(`/order/auth/submitOrder?tradeNo=${tradeNo}`, tradeInfo)

// 请求获取订单支付信息   get请求    /api/payment/weixin/createNative/{orderId}
export const reqOrderInfo = (orderId) => Ajax.get(`/payment/weixin/createNative/${orderId}`)

// 请求订单支付状态信息   get请求   /api/payment/weixin/queryPayStatus/{orderId}
export const reqPayStatus = (orderId) => Ajax.get(`/payment/weixin/queryPayStatus/${orderId}`)

//请求获取我的订单分页信息   get请求   /api/order/auth/{page}/{limit}
export const reqMyOrder = (page, limit) => Ajax.get(`/order/auth/${page}/${limit}`)