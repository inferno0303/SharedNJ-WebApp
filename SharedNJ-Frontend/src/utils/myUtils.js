import { history } from 'umi';
import {notification, message} from 'antd';

// parse json object to url encode string, order to post data
export function parseParams(data) {
  try {
    let tempArr = [];
    for (let i in data) {
      const key = encodeURIComponent(i);
      const value = encodeURIComponent(data[i]);
      tempArr.push(key + '=' + value);
    }
    return tempArr.join('&');
  } catch (err) {
    return null;
  }
}

// go back login page when login status error
function goBackLoginPage() {
  notification.warning({
    message: '登录信息已失效',
    description: '请重新登录',
    key: 'login status error'
  });
  setTimeout(() => {
    history.push('/')
  }, 1500);
  return false;
}

// show warning message when network timeout
function showNetworkTimeout() {
  message.error('网络超时', 1.5);
  return false;
}

// show permission denied
function showPermissionDenied() {
  message.warning('您没有权限访问', 1.5);
  return false
}

// check response object
// 1、if http status code is 403 and msg is "您还未登录", navigate to login page
// 2、if http request timeout, show
export function isResp200(response) {
  if(response.status === 200 && response.data.code === 200) return true;
  else if(response.status === 200 && response.data.code === 403 && response.data.msg === '您还未登录') goBackLoginPage();
  else if(response.status === 200 && response.data.code === 403) showPermissionDenied();
  else if(response.status !== 200) message.error("刚刚开小差了，请再试试吧", 1);
  else showNetworkTimeout();
}

// This function returns a promise object.
// This promise object will be resolved after the delay ends by setTimeout.
// Calling this function needs to combine async / await to achieve the blocking delay effect.
export const delay = timeoutMS => new Promise((resolve) => {
  setTimeout(resolve, timeoutMS);
});

// test object is Array ? true : false
export function isArray(o){
  return Object.prototype.toString.call(o) === '[object Array]';
}

