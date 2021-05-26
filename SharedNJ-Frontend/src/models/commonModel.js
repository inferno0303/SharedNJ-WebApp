import * as rqs from '../services/requestServices';
import {message} from 'antd';
import { isArray, isResp200 } from '../utils/myUtils';

export default {
  namespace: 'commonModel',
  state: {
    // machine table data source
    machineInfo: [],
    // userDemand table data source
    userDemand: [],
    // city list
    city_list: [],
    // userHome -> userDemand table data source
    myDemand: [],
    // userHome -> 用户各订单数量（首页显示数量）
    myTransactionTypeNumber: null,
    // userHome -> 用户自己的订单信息
    myTransactionRecord: [],
    // userBalance -> userHome info board
    userBalance: 0,
    // 商品详情页
    // 商品信息
    good_detail: null,
    // 农机信息（单个，用于显示详情页）
    machineDetail: null,
    // 获取城市之间配送费（用于展示商品详情页运费）
    dispatchFee: 0,
    // 回值的订单md5
    transactionMD5: null
  },
  reducers: {

    machineInfo(state, {payload}) {
      return { ...state, machineInfo: payload}
    },

    userDemand(state, {payload}) {
      return { ...state, userDemand: payload}
    },

    city_list(state, {payload}) {
      return { ...state, city_list: payload}
    },

    myDemand(state, {payload}) {
      return { ...state, myDemand: payload}
    },

    myTransactionTypeNumber(state, {payload}) {
      return { ...state, myTransactionTypeNumber: payload}
    },


    myTransactionRecord(state, {payload}) {
      return { ...state, myTransactionRecord: payload}
    },

    userBalance(state, {payload}) {
      return { ...state, userBalance: payload}
    },

    good_detail(state, {payload}) {
      return { ...state, good_detail: payload}
    },

    machineDetail(state, {payload}) {
      return { ...state, machineDetail: payload}
    },

    dispatchFee(state, {payload}) {
      return { ...state, dispatchFee: payload}
    },

    transactionMD5(state, {payload}) {
      return { ...state, transactionMD5: payload}
    },

  },
  effects: {

    // machineInfo
    *getAllMachineInfo({payload}, {call, put}) {
      try {
        const res = yield call(rqs.getAllMachineInfo);
        if (isResp200(res)) {
          let tmpList = [];
          res.data.data.forEach((each, index) => {
            each.key = index;
            tmpList.push(each)
          });
          yield put({ type: 'machineInfo', payload: tmpList });
        }
      } catch (e) {
        console.log(e)
      }
    },

    // userDemand
    // 获取所有用户需求
    *getAllUserDemand({payload}, {call, put}) {
      try {
        const res = yield call(rqs.getAllUserDemand);
        if (isResp200(res) && isArray(res.data.data)) {
          let tmpList = [];
          res.data.data.forEach((each, index) => {
            each.key = index;
            tmpList.push(each)
          });
          yield put({ type: 'userDemand', payload: tmpList })
        }
      } catch (e) {
        console.log(e)
      }
    },

    // 获取配送城市（用于新增用户需求弹出对话框的下拉列表）
    *getCityList({payload}, {call, put}) {
      try {
        const res = yield call(rqs.getCityList);
        if (isResp200(res) && isArray(res.data.data)) {
          yield put({ type: 'city_list', payload: res.data.data })
        }
      } catch (e) {
        console.log(e)
      }
    },

    // 提交新用户需求
    *newUserDemand({payload}, {call, put}) {
      try {
        const res = yield call(rqs.newUserDemand, payload);
        if (isResp200(res)) {
          message.success("发布新需求成功", 1);
          yield put({type: 'getAllUserDemand'});
        }
      } catch (e) {
        console.log(e)
      }
    },

    // userHome
    // 获取用户发布的需求信息
    *getUserDemandByUsername({payload}, {call, put}) {
      try {
        const res = yield call(rqs.getUserDemandByUsername);
        if (isResp200(res) && isArray(res.data.data)) {
          let tmpList = [];
          res.data.data.forEach((each, index) => {
            each.key = index;
            tmpList.push(each)
          });
          yield put({type: 'myDemand', payload: tmpList});
        }
      } catch (e) {
        console.log(e)
      }
    },

    // 获取用户的各订单数量（首页显示数字）
    *getTransactionRecordTypeNumber({payload}, {call, put}) {
      try {
        const res = yield call(rqs.getTransactionRecordTypeNumber);
        if (isResp200(res)) {
          yield put({type: 'myTransactionTypeNumber', payload: res.data.data})
        }
      } catch (e) {
        console.log(e)
      }
    },

    // 获取用户自己下单的订单信息（全部订单）
    *getTransactionRecordByUsername({payload}, {call, put}) {
      try {
        const res = yield call(rqs.getTransactionRecordByUsername);
        if (isResp200(res) && isArray(res.data.data)) {
          let tmpList = [];
          res.data.data.forEach((each, index) => {
            each.key = index;
            tmpList.push(each)
          });
          yield put({type: 'myTransactionRecord', payload: tmpList});
        }
      } catch (e) {
        console.log(e)
      }
    },

    // 获取用户自己下单的订单信息（待配送订单）
    *getUnHandleTransactionRecordByUsername({payload}, {call, put}) {
      try {
        const res = yield call(rqs.getUnHandleTransactionRecordByUsername);
        if (isResp200(res) && isArray(res.data.data)) {
          let tmpList = [];
          res.data.data.forEach((each, index) => {
            each.key = index;
            tmpList.push(each)
          });
          yield put({type: 'myTransactionRecord', payload: tmpList});
        }
      } catch (e) {
        console.log(e)
      }
    },

    // 获取用户自己下单的订单信息（正配送订单）
    *getDispatchingTransactionRecordByUsername({payload}, {call, put}) {
      try {
        const res = yield call(rqs.getDispatchingTransactionRecordByUsername);
        if (isResp200(res) && isArray(res.data.data)) {
          let tmpList = [];
          res.data.data.forEach((each, index) => {
            each.key = index;
            tmpList.push(each)
          });
          yield put({type: 'myTransactionRecord', payload: tmpList});
        }
      } catch (e) {
        console.log(e)
      }
    },

    // 获取用户自己下单的订单信息（已完成订单）
    *getFinishedTransactionRecordByUsername({payload}, {call, put}) {
      try {
        const res = yield call(rqs.getFinishedTransactionRecordByUsername);
        if (isResp200(res) && isArray(res.data.data)) {
          let tmpList = [];
          res.data.data.forEach((each, index) => {
            each.key = index;
            tmpList.push(each)
          });
          yield put({type: 'myTransactionRecord', payload: tmpList});
        }
      } catch (e) {
        console.log(e)
      }
    },

    // 获取用户自己下单的订单信息（已取消订单）
    *getCanceledTransactionRecordByUsername({payload}, {call, put}) {
      try {
        const res = yield call(rqs.getCanceledTransactionRecordByUsername);
        if (isResp200(res) && isArray(res.data.data)) {
          let tmpList = [];
          res.data.data.forEach((each, index) => {
            each.key = index;
            tmpList.push(each)
          });
          yield put({type: 'myTransactionRecord', payload: tmpList});
        }
      } catch (e) {
        console.log(e)
      }
    },


    // 删除用户发布的需求信息
    *deleteUserDemandById({payload}, {call, put}) {
      try {
        const res = yield call(rqs.deleteUserDemandById, payload);
        if (isResp200(res)) {
          message.success("删除成功", 1)
        }
      } catch (e) {
        console.log(e)
      }
    },

    // 获取用户余额
    *getUserBalance({payload}, {call, put}) {
      try {
        const res = yield call(rqs.getUserBalance);
        if (isResp200(res)) {
          yield put({type: 'userBalance', payload: Number(res.data.data)});
        }
      } catch (e) {
        console.log(e)
      }
    },

    // 商品详情页
    *getProductListById({payload}, {call, put}) {
      try {
        const res = yield call(rqs.getProductListById, payload);
        if (isResp200(res) && isArray(res.data.data)) {
          if (res.data.data.length > 0) {
            yield put({type: 'good_detail', payload: res.data.data[0]})
          }
        }
      } catch (e) {
        console.log(e)
      }
    },

    // 获取具体农机信息（用于展示商品详情页）
    *getMachineById({payload}, {call, put}) {
      try {
        const res = yield call(rqs.getMachineById, payload);
        if (isResp200(res) && isArray(res.data.data)) {
          if (res.data.data.length > 0) {
            yield put({type: 'machineDetail', payload: res.data.data[0]});
          }
        }
      } catch (e) {
        console.log(e)
      }
    },

    // 获取城市之间配送费（用于展示商品详情页运费）
    *getDispatchFeeByTwoCity({payload}, {call, put}) {
      try {
        const res = yield call(rqs.getDispatchFeeByTwoCity, payload);
        if (isResp200(res) && isArray(res.data.data)) {
          if (res.data.data.length > 0) {
            yield put({ type: 'dispatchFee', payload: res.data.data[0] })
          }
        }
      } catch (e) {
        console.log(e)
      }
    },

    // 提交订单接口
    *insertTransactionRecord({payload}, {call, put}) {
      try {
        const res = yield call(rqs.insertTransactionRecord, payload);
        if (isResp200(res)) {
          message.success("提交订单成功", 1);
          yield put({ type: 'transactionMD5', payload: res.data.data })
        }
      } catch (e) {
        console.log(e)
      }
    }

  },
  subscriptions: {}
}
