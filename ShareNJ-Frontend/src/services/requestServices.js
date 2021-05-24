import axios from 'axios';
import { API } from '../config/requestConfig';
import { parseParams } from '../utils/myUtils';

// login

export function getLoginStatus() {
  return axios.get(`${API}/getLoginStatus`, {
    withCredentials: true
  })
}

export function login(data) {
  return axios({
    method: 'post',
    url: `${API}/login`,
    data: parseParams(data),
    withCredentials: true,
  })
}

export function logout() {
  return axios({
    method: 'post',
    url: `${API}/logout`,
    withCredentials: true
  })
}

export function registered(payload) {
  return axios({
    method: 'post',
    url: `${API}/registered`,
    data: payload,
    withCredentials: true
  })
}

// machineInfo

export function getAllMachineInfo() {
  return axios.get(`${API}/getAllMachineInfo`, {
    withCredentials: true
  })
}

// userDemand

export function getAllUserDemand() {
  return axios.get(`${API}/getAllUserDemand`, {
    withCredentials: true
  })
}

// 获取城市列表
export function getCityList() {
  return axios.get(`${API}/getCityList`, {
    withCredentials: true
  })
}

// 提交新用户需求
export function newUserDemand(payload) {
  return axios({
    method: 'post',
    url: `${API}/newUserDemand`,
    data: payload,
    withCredentials: true
  })
}

// userHome -> 我的订单
// 获取用户发布的需求信息
export function getUserDemandByUsername() {
  return axios.get(`${API}/getUserDemandByUsername`, {
    withCredentials: true
  })
}

// 获取用户的各订单数量（首页显示数字）
export function getTransactionRecordTypeNumber() {
  return axios.get(`${API}/getTransactionRecordTypeNumber`, {
    withCredentials: true
  })
}

// 获取用户自己下单的订单列表（全部订单）
export function getTransactionRecordByUsername() {
  return axios.get(`${API}/getTransactionRecordByUsername`, {
    withCredentials: true
  })
}

// 获取用户自己下单的订单列表（待配送订单）
export function getUnHandleTransactionRecordByUsername() {
  return axios.get(`${API}/getUnHandleTransactionRecordByUsername`, {
    withCredentials: true
  })
}

// 获取用户自己下单的订单列表（正配送订单）
export function getDispatchingTransactionRecordByUsername() {
  return axios.get(`${API}/getDispatchingTransactionRecordByUsername`, {
    withCredentials: true
  })
}

// 获取用户自己下单的订单列表（已完成订单）
export function getFinishedTransactionRecordByUsername() {
  return axios.get(`${API}/getFinishedTransactionRecordByUsername`, {
    withCredentials: true
  })
}

// 获取用户自己下单的订单列表（已取消订单）
export function getCanceledTransactionRecordByUsername() {
  return axios.get(`${API}/getCanceledTransactionRecordByUsername`, {
    withCredentials: true
  })
}


// 删除用户发布的需求信息
export function deleteUserDemandById(payload) {
  return axios.get(`${API}/deleteUserDemandById`, {
    params: payload,
    withCredentials: true
  })
}

// 获取用户余额
export function getUserBalance() {
  return axios.get(`${API}/getUserBalance`, {
    withCredentials: true
  })
}

// productList
// 进入商品详情页
export function getProductListById(payload) {
  return axios.get(`${API}/getProductListById`, {
    params: payload,
    withCredentials: true
  })
}

// 获取农机得具体信息（展示商品详情页内容）
export function getMachineById(payload) {
  return axios.get(`${API}/getMachineById`, {
    params: payload,
    withCredentials: true
  })
}

// 根据两座城市，获取配送费，用于详情页展示运费
export function getDispatchFeeByTwoCity(payload) {
  return axios.get(`${API}/getDispatchFeeByTwoCity`, {
    params: payload,
    withCredentials: true
  })
}

// 提交订单接口
export function insertTransactionRecord(payload) {
  return axios({
    method: 'post',
    url: `${API}/insertTransactionRecord`,
    data: parseParams(payload),
    withCredentials: true
  })
}

// offerSide 商家侧

// offerHome
// 获取自己发布的商品列表
export function getMyProductList() {
  return axios.get(`${API}/getMyProductList`, {
    withCredentials: true
  })
}

// 修改自己发布的商品库存和单价
export function updateMyProduct(payload) {
  return axios({
    method: 'post',
    url: `${API}/updateMyProduct`,
    data: parseParams(payload),
    withCredentials: true
  })
}

// 删除自己发布的商品
export function deleteMyProduct(payload) {
  return axios.get(`${API}/deleteMyProduct`, {
    params: payload,
    withCredentials: true
  })
}

// 获取商家收到的各订单数量（首页显示数字）
export function getOfferTransactionTypeNumber() {
  return axios.get(`${API}/getOfferTransactionTypeNumber`, {
    withCredentials: true
  })
}

// 获取商家收到的全部订单列表
export function getOfferAllTransaction() {
  return axios.get(`${API}/getOfferAllTransaction`, {
    withCredentials: true
  })
}

// 获取商家收到的未处理订单列表
export function getOfferUnHandleTransaction() {
  return axios.get(`${API}/getOfferUnHandleTransaction`, {
    withCredentials: true
  })
}

// 获取商家收到的正配送订单列表
export function getOfferDispatchingTransaction() {
  return axios.get(`${API}/getOfferDispatchingTransaction`, {
    withCredentials: true
  })
}

// 获取商家收到的已完成订单列表
export function getOfferFinishedTransaction() {
  return axios.get(`${API}/getOfferFinishedTransaction`, {
    withCredentials: true
  })
}

// 获取商家收到的已取消订单列表
export function getOfferCanceledTransaction() {
  return axios.get(`${API}/getOfferCanceledTransaction`, {
    withCredentials: true
  })
}

// 商家更改订单状态
// 获取配送员列表
export function getAllDeliver() {
  return axios.get(`${API}/getAllDeliver`, {
    withCredentials: true
  })
}

// 派单，更改状态
export function setTransactionStatus(payload) {
  return axios({
    method: 'post',
    url: `${API}/setTransactionStatus`,
    data: parseParams(payload),
    withCredentials: true
  })
}

// 获取商品列表
export function getAllProductList() {
  return axios.get(`${API}/getAllProductList`, {
    withCredentials: true
  })
}

// 新增商品
export function newProductList(payload) {
  return axios({
    method: 'post',
    url: `${API}/newProductList`,
    data: payload,
    withCredentials: true
  })
}


// deliverSide 配送员侧接口
// 获取该配送员的各订单数量（deliverHome 数据展示）
export function getMyDeliverTaskNumber() {
  return axios.get(`${API}/getMyDeliverTaskNumber`, {
    withCredentials: true
  })
}

// 获取当前待配送任务列表
export function getMyDeliverTask() {
  return axios.get(`${API}/getMyDeliverTask`, {
    withCredentials: true
  })
}

// 将正配送的订单更改为完成状态
export function setDeliverFinished(payload) {
  return axios({
    method: 'post',
    url: `${API}/setDeliverFinished`,
    data: parseParams(payload),
    withCredentials: true
  })
}

// 获取自己所有订单列表
export function getMyAllDeliverTask() {
  return axios.get(`${API}/getMyAllDeliverTask`, {
    withCredentials: true
  })
}

// 获取已完成的订单列表
export function getMyFinishedDeliverTask() {
  return axios.get(`${API}/getMyFinishedDeliverTask`, {
    withCredentials: true
  })
}

// admin
// 获取所有订单数量
export function getTransactionTotalCount() {
  return axios.get(`${API}/getTransactionTotalCount`, {
    withCredentials: true
  })
}

// 获取所有商品数量
export function getProductTotalCount() {
  return axios.get(`${API}/getProductTotalCount`, {
    withCredentials: true
  })
}

// 获取商品交易总额
export function getTransactionPriceSum() {
  return axios.get(`${API}/getTransactionPriceSum`, {
    withCredentials: true
  })
}

// 获取注册用户数
export function getUserCount() {
  return axios.get(`${API}/getUserCount`, {
    withCredentials: true
  })
}

// 获取注册商家数
export function getOfferCount() {
  return axios.get(`${API}/getOfferCount`, {
    withCredentials: true
  })
}

// 获取注册配送员数
export function getDeliverCount() {
  return axios.get(`${API}/getDeliverCount`, {
    withCredentials: true
  })
}

// 获取用户表
export function getUserTable() {
  return axios.get(`${API}/getUserTable`, {
    withCredentials: true
  })
}

// 更新用户表（密码，余额）
export function updateUserTable(payload) {
  return axios({
    method: 'post',
    url: `${API}/updateUserTable`,
    data: parseParams(payload),
    withCredentials: true,
  })
}

// 删除用户，根据用户名
export function deleteUserByUsername(payload) {
  return axios({
    method: 'post',
    url: `${API}/deleteUserByUsername`,
    data: parseParams(payload),
    withCredentials: true,
  })
}

// 获取各商品数量
export function getProductTypeNumber() {
  return axios.get(`${API}/getProductTypeNumber`, {
    withCredentials: true
  })
}

// 获取各商品在售均价
export function getMachineAvgPrice() {
  return axios.get(`${API}/getMachineAvgPrice`, {
    withCredentials: true
  })
}

// 获取所有商品列表
export function getProductListByAdmin() {
  return axios.get(`${API}/getProductListByAdmin`, {
    withCredentials: true
  })
}

// 管理员删除特定商品
export function deleteProductByIdAndUsername(payload) {
  return axios({
    method: 'post',
    url: `${API}/deleteProductByIdAndUsername`,
    data: parseParams(payload),
    withCredentials: true,
  })
}

// 交易管理
// 获取各农机的销量（订单数量）
export function getMachineTransactionNumber() {
  return axios.get(`${API}/getMachineTransactionNumber`, {
    withCredentials: true
  })
}

// 获取所有订单
export function getAllTransactionByAdmin() {
  return axios.get(`${API}/getAllTransactionByAdmin`, {
    withCredentials: true
  })
}

// 获取各发货地订单数量
export function getTransactionCountWithOfferLocation() {
  return axios.get(`${API}/getTransactionCountWithOfferLocation`, {
    withCredentials: true
  })
}

// 获取各收货地订单数量
export function getTransactionCountWithUserLocation() {
  return axios.get(`${API}/getTransactionCountWithUserLocation`, {
    withCredentials: true
  })
}

// 删除某个订单（根据订单编号）
export function deleteTransactionByTransactionMD5(payload) {
  return axios({
    method: 'post',
    url: `${API}/deleteTransactionByTransactionMD5`,
    data: parseParams(payload),
    withCredentials: true,
  })
}
