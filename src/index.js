import qs from 'qs';

function getJSONPCallbackName() {
    return 'jsonpCallback_' + new Date().getTime() 
        + '_' + Math.random().toString().substr(2)
}

export default function JSONP(url, options = {}, qsConfig = {}) {  
    if (!url) return;

    let callbackName = getJSONPCallbackName();

    let { 
        callback = 'callback', 
        timeout = 10000, // 默认10秒
        ...opts 
    } = options;

    let params = {
        [ callback ]: callbackName,
        ...opts
    };

    let mark = url.indexOf('?') === -1 ? '?' : '&'
    url = url + mark + qs.stringify(params, qsConfig);

    var script = document.createElement('script'); 
    
    function remove() {
        delete window[callbackName];
        script &&  script.parentNode && script.parentNode.removeChild(script);
        script = null;
    }

    let jsonpPromise = new Promise(function(resolve, reject) {
        //定义被脚本执行的回调函数  
        window[callbackName] = function (data) {
            resolve(data);
            remove()
        }

        script.onerror = function(e) {
            reject(e)
            remove()
        }
    });

    let absortPromise = new Promise(function(resolve, reject) {
        setTimeout(reject, timeout, `${url} 请求超时`);
    });
    
    script.src = url;  
    document.getElementsByTagName("head")[0].appendChild(script);

    return Promise.race([jsonpPromise, absortPromise]);
} 
