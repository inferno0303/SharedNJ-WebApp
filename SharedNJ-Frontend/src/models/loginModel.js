import * as rqs from '../services/requestServices';
import {message} from 'antd';
import { isResp200 } from '../utils/myUtils';

export default {
  namespace: 'loginModel',
  state: {
    isLogin: false,
    username: null,
    user_role: null,
    last_login: null
  },
  reducers: {
    isLogin(state, {payload}) {
      return { ...state, isLogin: payload}
    },
    username(state, {payload}) {
      return { ...state, username: payload}
    },
    user_role(state, {payload}) {
      return { ...state, user_role: payload}
    },
    last_login(state, {payload}) {
      return { ...state, last_login: payload}
    }
  },
  effects: {

    *resetLoginStatus({payload}, {call, put}) {
      console.log("===重置前端登陆状态===");
      yield put({ type: 'isLogin', payload: false });
      yield put({ type: 'username', payload: null });
      yield put({ type: 'user_role', payload: null });
      yield put({ type: 'last_login', payload: null });
    },

    *getLoginStatus({payload}, {call, put}) {
      try {
        const res = yield call(rqs.getLoginStatus);
        console.log(res.data.data);
        if (res.data.code === 200) {
          yield put({ type: 'isLogin', payload: true });
          yield put({ type: 'username', payload: res.data.data.username });
          yield put({ type: 'user_role', payload: res.data.data.user_role });
          yield put({ type: 'last_login', payload: res.data.data.last_login });
        } else {
          yield put({ type: 'resetLoginStatus' });
        }
      } catch (e) {
        console.log(e)
      }
    },

    *login({payload}, {call, put}) {
      try {
        yield put({ type: 'resetLoginStatus' });
        const res = yield call(rqs.login, payload);
        if (res.data.code === 200) {
          yield put({ type: 'isLogin', payload: true });
          yield put({ type: 'username', payload: res.data.data.username });
          yield put({ type: 'user_role', payload: res.data.data.user_role });
          yield put({ type: 'last_login', payload: res.data.data.last_login });
        } else if (res.data.code === 403) {
          message.error("用户名或密码错误", 1);
        }
      } catch (e) {
        console.log(e)
      }
    },

    *logout({payload}, {call, put}) {
      try {
        const resp = yield call(rqs.logout);
        if(resp.data.code === 200) {
          message.success('您已退出登陆', 1);
          yield put({type: 'getLoginStatus'})
        }
      } catch (e) {
        console.log(e)
      }
    },

    *registered({payload}, {call, put}) {
      try {
        const res = yield call(rqs.registered, payload);
        if (isResp200(res)) {
          message.success("注册成功", 2)
        } else if (res.data.code === 500) {
          message.error('用户名已经被使用', 2);
        }
      } catch (e) {

      }
    }

  },
  subscriptions: {}
}
