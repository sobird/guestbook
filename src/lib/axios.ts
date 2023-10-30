/**
 * 全局代理项目所有浏览器接口请求，框架级配置，请谨慎修改。
 * Axios 是一个基于 Promise 的 HTTP 库，可以用在浏览器和Node.js中。
 *
 * 默认全局对所请求的(相同URL/参数)接口进行防抖设置
 *
 * 接口规范
 * @example
 * {
 *   code: 0,
 *   message: "ok",
 *   data,
 * }
 * 使用
 * @example
 * export function submit() {
 *   return axios.post("/submit", {
 *     message: {
 *       success: "数据提交成功！",
 *       failure: "数据提交出错！"
 *     },
 *     serialize: true
 *   });
 * }
 *
 * @see https://axios-http.com/zh/docs/intro
 * sobird<i@sobird.me> at 2021/02/20 11:18:13 created.
 */

import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

// import queryString from 'query-string';

// declare module "axios" {
//   interface AxiosResponse {
//     timing: number | null;
//   }

//   interface AxiosRequestConfig {
//     /**
//      * 接口静默，设为 TRUE 该接口在前端不提示任何提示信息
//      */
//     silent?: boolean;

//     /**
//      * 接口请求时间戳
//      */
//     _startTime?: number;
//   }

//   /**
//    * numeral helper functions
//    */
//   let _: any;
// }

/**
 * 全局的 axios 默认值，所有新建的Axios实例将继承此处的设置
 *
 * 配置的优先级 配置将会按优先级进行合并。
 * 它的顺序是：在lib/defaults.js中找到的库默认值，然后是实例的 defaults 属性，最后是请求的 config 参数。
 * 后面的优先级要高于前面的。
 */
axios.defaults.withCredentials = true;
axios.defaults.timeout = 10 * 1000;
// 全局默认的baseURL参数配置
axios.defaults.baseURL = "";
// axios request
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

// ssoid
// axios.defaults.headers.common['access-token'] = SSO_ACCESS_TOKEN;

// 请求拦截器
axios.interceptors.request.use(
  (config: any) => {
    // config._startTime = new Date().getTime();
    return config;
  },
  (error: AxiosError) => {
    const { config } = error;
    // 请求报错
    // !config.silent && message.error(error.message);
    return Promise.reject(error);
  }
);

// 响应拦截器
axios.interceptors.response.use(
  (response: AxiosResponse) => {
    const { config, data } = response;
    // response.timing = new Date().getTime() - config._startTime;

    if (!data) {
      return data;
    }

    if (config.responseType === "blob") {
      return data;
    }

    // 统一后端返回的消息
    data.message = data.message || data.msg;

    // 项目全局错误码逻辑处理
    switch (data.status) {
      case 401:
        // return;
        break;
      default:
      // todo nothing
    }

    // 业务请求成功
    if (data.code === 0 || data.code === "0") {
      /**
       * 如果在接口配置中设置了message，则表明该接口需要显示的展示message
       * 一般仅在表单提交成功场景需要成功提示信息
       */
      // if (config.message) {
      //   // Message.success(config.message);
      // }

      return data.data || data;
    }

    // 业务级错误提示
    // !config.silent && message.error(data.message);

    // 业务级错误信息
    throw {
      message: data.message,
      config: response.config,
      code: data.code,
      request: response.request,
      response,
    };
  },
  (error: AxiosError) => {
    const { request, response, config } = error;

    if (response) {
      // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
      switch (response.status) {
        case 401:
          break;
        case 404:
          break;
        default:
      }
    } else if (request) {
      // 请求已经成功发起，但没有收到响应
    }

    // 业务级错误提示
    console.log("config", config);
    // !config.silent && message.error(error.message);

    return Promise.reject(error);
  }
);

export default axios;

