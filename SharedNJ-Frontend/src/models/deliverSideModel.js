import * as rqs from '../services/requestServices';
import {message} from 'antd';
import { isArray, isResp200 } from '../utils/myUtils';

export default {
  namespace: 'deliverSideModel',
  state: {
    // deliverSideModel 配送员侧Model
    // 配送员的各订单数量
    myDeliverTaskNumber: null,
    // 当前待配送的订单列表
    myCurrentDeliverTask: [],
    // 配送员所有订单
    myAllDeliverTask: [],
    // 第二页表格数据
    taskTable: []
  },
  reducers: {

    myDeliverTaskNumber(state, {payload}) {
      return { ...state, myDeliverTaskNumber: payload}
    },

    myCurrentDeliverTask(state, {payload}) {
      return { ...state, myCurrentDeliverTask: payload}
    },

    myAllDeliverTask(state, {payload}) {
      return { ...state, myAllDeliverTask: payload}
    },

    taskTable(state, {payload}) {
      return { ...state, taskTable: payload}
    },


  },
  effects: {

    // 获取各项任务数量
    *getMyDeliverTaskNumber({payload}, {call, put}) {
      try {
        const res = yield call(rqs.getMyDeliverTaskNumber);
        if (isResp200(res)) {
          yield put({ type: 'myDeliverTaskNumber', payload: res.data.data })
        }
      } catch (e) {
        console.log(e)
      }
    },

    // 获取当前我的正配送任务
    *getMyDeliverTask({ payload }, { call, put }) {
      try {
        const res = yield call(rqs.getMyDeliverTask);
        if (isResp200(res) && isArray(res.data.data)) {
          let tmpList = [];
          res.data.data.forEach((each, index) => {
            each.key = index;
            tmpList.push(each)
          });
          yield put({ type: 'myCurrentDeliverTask', payload: tmpList });
          message.success("刷新成功", 0.5);
        }
      } catch (e) {
        console.log(e);
      }
    },

    // 将正配送的订单更改为完成状态
    *setDeliverFinished({payload}, {call, put}) {
      try {
        const res = yield call(rqs.setDeliverFinished, payload);
        if (isResp200(res)) {
          message.success("配送成功！");
        }
      } catch (e) {
        console.log(e)
      }
    },

    // 第二页
    // 获取我的所有配送任务
    *getMyAllDeliverTask({payload}, {call, put}) {
      try {
        const res = yield call(rqs.getMyAllDeliverTask);
        if (isResp200(res) && isArray(res.data.data)) {
          let tmpList = [];
          res.data.data.forEach((each, index) => {
            each.key = index;
            tmpList.push(each)
          });
          yield put({type: 'taskTable', payload: tmpList})
        }
      } catch (e) {
        console.log(e)
      }
    },

    // 获取我的正配送任务
    *getMyDispatchingDeliverTask({payload}, {call, put}) {
      try {
        const res = yield call(rqs.getMyDeliverTask);
        if (isResp200(res) && isArray(res.data.data)) {
          let tmpList = [];
          res.data.data.forEach((each, index) => {
            each.key = index;
            tmpList.push(each)
          });
          yield put({type: 'taskTable', payload: tmpList})
        }
      } catch (e) {
        console.log(e)
      }
    },

    // 获取我的已完成配送任务
    *getFinishedDeliverTask({payload}, {call, put}) {
      try {
        const res = yield call(rqs.getMyFinishedDeliverTask);
        if (isResp200(res) && isArray(res.data.data)) {
          let tmpList = [];
          res.data.data.forEach((each, index) => {
            each.key = index;
            tmpList.push(each)
          });
          yield put({type: 'taskTable', payload: tmpList})
        }
      } catch (e) {
        console.log(e)
      }
    },

  },
  subscriptions: {}
}
