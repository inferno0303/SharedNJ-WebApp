import * as rqs from '../services/requestServices';
import {message} from 'antd';
import { isArray, isResp200 } from '../utils/myUtils';

export default {
  namespace: 'adminModel',
  state: {
    // 订单数
    transactionTotalCount: 0,
    // 商品数
    productTotalCount: 0,
    // 订单总额
    transactionPriceSum: 0,
    // 用户、商家、配送员数量
    userCount: 0,
    offerCount: 0,
    deliverCount: 0,
    // 用户管理表
    userTable: null,
    // 各农机商品的数量
    productTypeNumber: null,
    // 各农机商品的均价
    machineAvgPrice: null,
    // 商品管理表
    productTable: null,
    // 各农机的销量
    machineTransactionNumber: null,
    // 订单管理表
    transactionTable: null,
    // 获取各发货地订单数量
    transactionCountWithOfferLocation: null,
    // 获取各收货地订单数量
    transactionCountWithUserLocation: null,
  },
  reducers: {

    transactionTotalCount(state, {payload}) {
      return { ...state, transactionTotalCount: payload}
    },

    productTotalCount(state, {payload}) {
      return { ...state, productTotalCount: payload}
    },

    transactionPriceSum(state, {payload}) {
      return { ...state, transactionPriceSum: payload}
    },

    userCount(state, {payload}) {
      return { ...state, userCount: payload}
    },

    offerCount(state, {payload}) {
      return { ...state, offerCount: payload}
    },

    deliverCount(state, {payload}) {
      return { ...state, deliverCount: payload}
    },

    // table
    userTable(state, {payload}) {
      return { ...state, userTable: payload}
    },

    productTypeNumber(state, {payload}) {
      return { ...state, productTypeNumber: payload}
    },

    machineAvgPrice(state, {payload}) {
      return { ...state, machineAvgPrice: payload}
    },

    // table
    productTable(state, {payload}) {
      return { ...state, productTable: payload}
    },

    machineTransactionNumber(state, {payload}) {
      return { ...state, machineTransactionNumber: payload}
    },

    transactionTable(state, {payload}) {
      return { ...state, transactionTable: payload}
    },

    transactionCountWithOfferLocation(state, {payload}) {
      return { ...state, transactionCountWithOfferLocation: payload}
    },

    transactionCountWithUserLocation(state, {payload}) {
      return { ...state, transactionCountWithUserLocation: payload}
    },


  },
  effects: {

    *getTransactionTotalCount({payload}, {call, put}) {
      try {
        const res = yield call(rqs.getTransactionTotalCount);
        if (isResp200(res)) {
          yield put({ type: 'transactionTotalCount', payload: res.data.data });
        }
      } catch (e) {
        console.log(e)
      }
    },

    *getProductTotalCount({payload}, {call, put}) {
      try {
        const res = yield call(rqs.getProductTotalCount);
        if (isResp200(res)) {
          yield put({ type: 'productTotalCount', payload: res.data.data });
        }
      } catch (e) {
        console.log(e)
      }
    },

    *getTransactionPriceSum({payload}, {call, put}) {
      try {
        const res = yield call(rqs.getTransactionPriceSum);
        if (isResp200(res)) {
          yield put({ type: 'transactionPriceSum', payload: res.data.data });
        }
      } catch (e) {
        console.log(e)
      }
    },

    *getUserCount({payload}, {call, put}) {
      try {
        const res = yield call(rqs.getUserCount);
        if (isResp200(res)) {
          yield put({ type: 'userCount', payload: res.data.data });
        }
      } catch (e) {
        console.log(e)
      }
    },

    *getOfferCount({payload}, {call, put}) {
      try {
        const res = yield call(rqs.getOfferCount);
        if (isResp200(res)) {
          yield put({ type: 'offerCount', payload: res.data.data });
        }
      } catch (e) {
        console.log(e)
      }
    },

    *getDeliverCount({payload}, {call, put}) {
      try {
        const res = yield call(rqs.getDeliverCount);
        if (isResp200(res)) {
          yield put({ type: 'deliverCount', payload: res.data.data });
        }
      } catch (e) {
        console.log(e)
      }
    },

    // table
    *getUserTable({payload}, {call, put}) {
      try {
        const res = yield call(rqs.getUserTable);
        if (isResp200(res) && isArray(res.data.data)) {
          let tmpList = [];
          res.data.data.forEach((each, index) => {
            each.key = index;
            tmpList.push(each)
          });
          yield put({ type: 'userTable', payload: tmpList });
        }
      } catch (e) {
        console.log(e)
      }
    },

    *updateUserTable({payload}, {call, put}) {
      try {
        const res = yield call(rqs.updateUserTable, payload);
        if (isResp200(res)) {
          message.success("更新用户信息成功！", 1);
          yield put({type: 'getUserTable'})
        }
      } catch (e) {
        console.log(e)
      }
    },

    *deleteUserByUsername({payload}, {call, put}) {
      try {
        const res = yield call(rqs.deleteUserByUsername, payload);
        if (isResp200(res)) {
          message.success("删除用户成功！", 1);
          yield put({type: 'getUserTable'})
        }
      } catch (e) {
        console.log(e)
      }
    },

    *getProductTypeNumber({payload}, {call, put}) {
      try {
        const res = yield call(rqs.getProductTypeNumber);
        if (isResp200(res)) {
          yield put({type: 'productTypeNumber', payload: res.data.data})
        }
      } catch (e) {
        console.log(e)
      }
    },

    *getMachineAvgPrice({payload}, {call, put}) {
      try {
        const res = yield call(rqs.getMachineAvgPrice);
        if (isResp200(res)) {
          yield put({type: 'machineAvgPrice', payload: res.data.data})
        }
      } catch (e) {
        console.log(e)
      }
    },

    *getProductListByAdmin({payload}, {call, put}) {
      try {
        const res = yield call(rqs.getProductListByAdmin);
        if (isResp200(res) && isArray(res.data.data)) {
          let tmpList = [];
          res.data.data.forEach((each, index) => {
            each.key = index;
            tmpList.push(each)
          });
          yield put({ type: 'productTable', payload: tmpList });
        }
      } catch (e) {
        console.log(e)
      }
    },

    *deleteProductByIdAndUsername({payload}, {call, put}) {
      try {
        const res = yield call(rqs.deleteProductByIdAndUsername, payload);
        if (isResp200(res)) {
          message.success("删除商品成功！", 1);
          yield put({type: 'getProductListByAdmin'})
        }
      } catch (e) {
        console.log(e)
      }
    },

    *getMachineTransactionNumber({payload}, {call, put}) {
      try {
        const res = yield call(rqs.getMachineTransactionNumber);
        if (isResp200(res)) {
          yield put({type: 'machineTransactionNumber', payload: res.data.data})
        }
      } catch (e) {
        console.log(e)
      }
    },

    *getAllTransactionByAdmin({payload}, {call, put}) {
      try {
        const res = yield call(rqs.getAllTransactionByAdmin);
        if (isResp200(res) && isArray(res.data.data)) {
          let tmpList = [];
          res.data.data.forEach((each, index) => {
            each.key = index;
            tmpList.push(each)
          });
          yield put({ type: 'transactionTable', payload: tmpList });
        }
      } catch (e) {
        console.log(e)
      }
    },

    *getTransactionCountWithOfferLocation({payload}, {call, put}) {
      try {
        const res = yield call(rqs.getTransactionCountWithOfferLocation);
        if (isResp200(res)) {
          yield put({type: 'transactionCountWithOfferLocation', payload: res.data.data})
        }
      } catch (e) {
        console.log(e)
      }
    },

    *getTransactionCountWithUserLocation({payload}, {call, put}) {
      try {
        const res = yield call(rqs.getTransactionCountWithUserLocation);
        if (isResp200(res)) {
          yield put({type: 'transactionCountWithUserLocation', payload: res.data.data})
        }
      } catch (e) {
        console.log(e)
      }
    },

    *deleteTransactionByTransactionMD5({payload}, {call, put}) {
      try {
        const res = yield call(rqs.deleteTransactionByTransactionMD5, payload);
        if (isResp200(res)) {
          message.success("删除订单成功！", 1);
          yield put({type: 'getAllTransactionByAdmin'})
        }
      } catch (e) {
        console.log(e)
      }
    },

  },
  subscriptions: {}
}
