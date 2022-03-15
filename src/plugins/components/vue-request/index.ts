/**
 *  vueRequest全局配置，更多See https://www.attojs.com/api/#manual
 */
import { setGlobalOptions } from 'vue-request'
setGlobalOptions({    
    manual: true,//当 manual 设置为 true 时，你需要手动触发 run 才会发起请求
    // refreshOnWindowFocus: true, // 浏览器视窗焦点触发
    // refocusTimespan: 1000, // 请求间隔时间
});

export {}