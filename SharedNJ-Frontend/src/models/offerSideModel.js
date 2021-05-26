import * as rqs from '../services/requestServices';
import {message} from 'antd';
import { isArray, isResp200 } from '../utils/myUtils';

export default {
  namespace: 'offerSideModel',
  state: {
    // offerHome
    // 我的商品信息
    myProductList: [],
    // 获取商家收到的各订单数量（首页显示数字）
    offerTransactionTypeNumber: null,
    // 我收到的订单（包括全部订单、未处理、正配送、已完成、已取消）
    offerTransactionRecord: [],
    // 配送员列表
    allDeliver: [],
    // 全部商品信息
    allProductList: [],
  },
  reducers: {

    myProductList(state, {payload}) {
      return { ...state, myProductList: payload}
    },

    offerTransactionTypeNumber(state, {payload}) {
      return { ...state, offerTransactionTypeNumber: payload}
    },

    offerTransactionRecord(state, {payload}) {
      return { ...state, offerTransactionRecord: payload}
    },

    allDeliver(state, {payload}) {
      return { ...state, allDeliver: payload}
    },

    allProductList(state, {payload}) {
      return { ...state, allProductList: payload}
    },

  },
  effects: {

    *getAllProductList({payload}, {call, put}) {
      try {
        const res = yield call(rqs.getAllProductList);
        if (isResp200(res) && isArray(res.data.data)) {
          let tmpList = [];
          res.data.data.forEach((each, index) => {
            each.key = index;
            tmpList.push(each)
          });
          yield put({type: 'allProductList', payload: tmpList})
        }
      } catch (e) {
        console.log(e)
      }
    },

    *newProductList({payload}, {call, put}) {
      try {
        const res = yield call(rqs.newProductList, payload);
        if (isResp200(res)) {
          message.success("发布新商品成功", 1);
          yield put({type: 'getAllProductList'});
        }
      } catch (e) {
        console.log(e)
      }
    },

    // offerHome
    // 获取我发布的商品
    *getMyProductList({payload}, {call, put}) {
      try {
        const res = yield call(rqs.getMyProductList);
        if (isResp200(res) && isArray(res.data.data)) {
          let tmpList = [];
          res.data.data.forEach((each, index) => {
            each.key = index;
            tmpList.push(each)
          });
          yield put({type: 'myProductList', payload: tmpList})
        }
      } catch (e) {
        console.log(e)
      }
    },

    // 更新我发布的商品信息
    *updateMyProduct({payload}, {call, put}) {
      try {
        const res = yield call(rqs.updateMyProduct, payload);
        if(isResp200(res)) {
          message.success("修改成功！", 1);
          yield put({type: 'getMyProductList'})
        }
      } catch (e) {
        console.log(e)
      }
    },

    // 删除我发布的商品信息
    *deleteMyProduct({payload}, {call, put}) {
      try {
        const res = yield call(rqs.deleteMyProduct, payload);
        if (isResp200(res)) {
          message.success("删除成功！", 1);
          yield put({type: 'getMyProductList'})
        }
      } catch (e) {
        console.log(e)
      }
    },

    // 获取商家收到的各订单数量（首页显示数字）
    *getOfferTransactionTypeNumber({payload}, {call, put}) {
      try {
        const res = yield call(rqs.getOfferTransactionTypeNumber);
        if (isResp200(res)) {
          yield put({type: 'offerTransactionTypeNumber', payload: res.data.data})
        }
      } catch (e) {
        console.log(e)
      }
    },

    // 获取我收到的全部订单
    *getOfferAllTransaction({payload}, {call, put}) {
      try {
        const res = yield call(rqs.getOfferAllTransaction);
        if (isResp200(res)) {
          message.success("刷新成功", 0.8);
          let tmpList = [];
          res.data.data.forEach((each, index) => {
            each.key = index;
            tmpList.push(each)
          });
          yield put({type: 'offerTransactionRecord', payload: tmpList})
        }
      } catch (e) {
        console.log(e)
      }
    },

    // 获取我收到的未处理订单
    *getOfferUnHandleTransaction({payload}, {call, put}) {
      try {
        const res = yield call(rqs.getOfferUnHandleTransaction);
        if (isResp200(res)) {
          message.success("刷新成功", 0.8);
          let tmpList = [];
          res.data.data.forEach((each, index) => {
            each.key = index;
            tmpList.push(each)
          });
          yield put({type: 'offerTransactionRecord', payload: tmpList})
        }
      } catch (e) {
        console.log(e)
      }
    },

    // 获取我收到的正配送订单
    *getOfferDispatchingTransaction({payload}, {call, put}) {
      try {
        const res = yield call(rqs.getOfferDispatchingTransaction);
        if (isResp200(res)) {
          message.success("刷新成功", 0.8);
          let tmpList = [];
          res.data.data.forEach((each, index) => {
            each.key = index;
            tmpList.push(each)
          });
          yield put({type: 'offerTransactionRecord', payload: tmpList})
        }
      } catch (e) {
        console.log(e)
      }
    },

    // 获取我收到的已完成订单
    *getOfferFinishedTransaction({payload}, {call, put}) {
      try {
        const res = yield call(rqs.getOfferFinishedTransaction);
        if (isResp200(res)) {
          message.success("刷新成功", 0.8);
          let tmpList = [];
          res.data.data.forEach((each, index) => {
            each.key = index;
            tmpList.push(each)
          });
          yield put({type: 'offerTransactionRecord', payload: tmpList})
        }
      } catch (e) {
        console.log(e)
      }
    },

    // 获取我收到的已取消订单
    *getOfferCanceledTransaction({payload}, {call, put}) {
      try {
        const res = yield call(rqs.getOfferCanceledTransaction);
        if (isResp200(res)) {
          message.success("刷新成功", 0.8);
          let tmpList = [];
          res.data.data.forEach((each, index) => {
            each.key = index;
            tmpList.push(each)
          });
          yield put({type: 'offerTransactionRecord', payload: tmpList})
        }
      } catch (e) {
        console.log(e)
      }
    },

    // 商家更改订单状态
    // 获取所有配送员列表
    *getAllDeliver({payload}, {call, put}) {
      try {
        const res = yield call(rqs.getAllDeliver);
        if (isResp200(res) && isArray(res.data.data)) {
          yield put({type: 'allDeliver', payload: res.data.data})
        }
      } catch (e) {
        console.log(e)
      }
    },

    // 派单
    *setTransactionStatus({payload}, {call, put}) {
      try {
        const res = yield call(rqs.setTransactionStatus, payload);
        if (isResp200(res)) {
          message.success("更改状态成功", 2);
        }
      } catch (e) {
        console.log(e)
      }
    }

  },
  subscriptions: {}
}
