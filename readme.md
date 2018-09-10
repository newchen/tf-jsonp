## jsonp模块

```javascript
// 引入
import JSONP from "tf-jsonp";

JSONP('url地址', {
  callback: 'callback', // 默认callback
  timeout: 10000 // 默认10秒

  // ... // 其它需要传给后端的参数

}, { // 可选, qs的配置, 文档地址: https://www.npmjs.com/package/qs, 下面摘抄了一段
  /*
    When arrays are stringified, by default they are given explicit indices:
    qs.stringify({ a: ['b', 'c', 'd'] });
    // 'a[0]=b&a[1]=c&a[2]=d'

    You may override this by setting the indices option to false:
    qs.stringify({ a: ['b', 'c', 'd'] }, { indices: false });
    // 'a=b&a=c&a=d'

    You may use the arrayFormat option to specify the format of the output array:
    qs.stringify({ a: ['b', 'c'] }, { arrayFormat: 'indices' })
    // 'a[0]=b&a[1]=c'
    qs.stringify({ a: ['b', 'c'] }, { arrayFormat: 'brackets' })
    // 'a[]=b&a[]=c'
    qs.stringify({ a: ['b', 'c'] }, { arrayFormat: 'repeat' })
    // 'a=b&a=c'
    
    When objects are stringified, by default they use bracket notation:
    qs.stringify({ a: { b: { c: 'd', e: 'f' } } });
    // 'a[b][c]=d&a[b][e]=f'
    
    You may override this to use dot notation by setting the allowDots option to true:
    qs.stringify({ a: { b: { c: 'd', e: 'f' } } }, { allowDots: true });
    // 'a.b.c=d&a.b.e=f'
    
    Empty strings and null values will omit the value, but the equals sign (=) remains in place:
    assert.equal(qs.stringify({ a: '' }), 'a=');
  */
})
.then(data => {
  console.log(data) // 返回的数据
})
.catch(e) {
  console.log(e) // 错误信息
}
```
