import fetch from '@alipay/kobe-fetch';

export function getData(param) {
  return fetch({
    url: 'kobe.demo.h5.getData',
    param,
  });
}

export function buy(param) {
  return fetch({
    url: 'kobe.demo.h5.buy',
    param,
  });
}

export function star(param) {
  return fetch({
    url: 'alipay.mobilecsa.buy',
    param,
  });
}
