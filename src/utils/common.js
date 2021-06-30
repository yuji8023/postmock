import qs from 'qs';

export function isEmpty(obj) {
  return typeof obj === 'undefined' || obj == null || obj === '';
}

export function objectToKvString(arr) {
  var str = '';
  for (var key in arr) {
      str += key + ': ' + arr[key] + '\n';
  }
  return str;
}

export function kvStringToObject(str) {
  var obj = {};
  str = isEmpty(str) ? '' : str;
  var pairs = str.split('\n');

  for (let pair of pairs) {
      var kv = pair.replace('：', ':').split(':');
      if (kv.length < 2) {
          continue;
      }
      if (isEmpty(kv[0])) {
          continue;
      }
      var key = kv[0].trim();
      var value = kv.slice(1).join(':').trim();

      // eslint-disable-next-line no-useless-escape
      if(!(/^[\w\-\[\]]+$/u.test(key))) {
          continue;
      }

      obj[key] = value;
  }

  return obj;
}

export function fromUrlEncodeToObject(str) {
  var obj = qs.parse(str);
  return obj;
}

export function objectToJsonString(obj) {
  return qs.stringify(obj);
}
