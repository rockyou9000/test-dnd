import { set } from '@alipay/kobe-store';

import { getData, buy, star } from './service';

export default {
  initial: {
    loading: false,
    agree: false,
    starCount: 0,
    result: null,
  },

  reducers: {
    buyStart(state) {
      return {
        ...state,
        loading: true,
      };
    },
    buyEnd(state, payload) {
      return {
        ...state,
        loading: false,
        result: payload,
      };
    },
    starStart(state) {
      return {
        ...state,
        loading: true,
      };
    },
    starEnd(state) {
      return {
        ...state,
        starCount: state.starCount + 1,
        loading: false,
      };
    },
    setAgree: set('agree'), // 快捷设置状态 agree
  },

  asyncs: {
    async buy(dispatch, getState, payload) {
      try {
        dispatch({ type: 'buyStart' });
        const res = await buy(payload);
        dispatch({ type: 'buyEnd', payload: res });
        kBridge.call('showToast', { content: '购买成功' });
      } catch (err) {
        dispatch({ type: 'buyEnd', payload: null });
        kBridge.call('showToast', { content: '购买失败' });
      }
    },

    async star(dispatch, getState, payload) {
      try {
        dispatch({ type: 'starStart' });
        const res = await star(payload);
        dispatch({ type: 'starEnd', payload: res });
      } catch (err) {
        kBridge.call('showToast', { content: '点赞失败' });
      }
    },
  },

  /**
  * 初始化请求
  * @param dispatch
  * @param getState
  * @param {object}
  * @property param 请求参数，包括url中的请求参数和离线包的startParams
  * @property extra 当调用`this.props.reload`时，传入的参数。
  * @return {any}
  */
  async setup(dispatch, getState, { param }) {
    const res = await getData(param);
    return res.data;
  },
};
