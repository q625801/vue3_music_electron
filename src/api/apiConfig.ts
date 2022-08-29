import axios from "axios"; // 引用axios
let getckflag = true
const instance = axios.create({
  timeout: 60000,
});
interface axiosconfig {
  headers:object
}
//请求拦截器
instance.interceptors.request.use(config => {
  console.log(config)
  return config
})

//post请求
function get(url:string, data = {}) {
  return new Promise((resolve, reject) => {
    instance({
      headers: {
        'Content-Type': "application/json;charset=utf-8"
      },
      params: data,
      method: 'get',
      url: url
    }).then(
      (response) => {
        resolve(response.data);
      },
      (err) => {
        reject(err);
      }
    );
  });
}

//download blob
function downloadBlobFile(url:string, data = {}){
  return new Promise((resolve, reject) => {
    instance({
      headers: {
        'Content-Type': "application/json;charset=utf-8"
      },
      responseType:'blob',
      params: data,
      method: 'get',
      url: url
    }).then(
      (response) => {
        resolve(response.data);
      },
      (err) => {
        reject(err);
      }
    );
  });
}
export function getJson(url:string, params:object, successCallback:any, errorCallback:any,isloading = true){
    // if (isloading){
    //     store.state.loadding = true;
    // }
    const interfaceSign = url.indexOf('?') > -1 ? '&' : '?';
    const interfaceUrl =
      url;
    get(interfaceUrl, params)
        .then(res => successDataFun(res, successCallback, isloading))
        .catch(err => failDataFun(err, errorCallback, isloading));
}
export function downloadJson(url:string, params:object, successCallback:any, errorCallback:any,isloading = true){
  // if (isloading){
  //     store.state.loadding = true;
  // }
  downloadBlobFile(url, params)
      .then(res => successDataFun(res, successCallback, isloading))
      .catch(err => failDataFun(err, errorCallback, isloading));
}
function successDataFun(res:any, successCallback:any, isloading:any){
    // if (isloading) {
    //     store.state.loadding = false;
    // }
    let ret = res.data
    if(successCallback){
        successCallback(res)
    }

    // let state = parseInt(ret.state);
    // switch (state) {
    //     case 6001: //账号密码错误
        
    //     break
    // default:
    //     if(successCallback){
    //         successCallback(res)
    //     }
    //     break
    // }
}
function failDataFun(err:any, errorCallback:any, isloading:any){
    // if (isloading) {
    //     store.state.loadding = false;
    // }
    let ret = err.data
    if(errorCallback){
        errorCallback(err)
    }
    // let state = parseInt(ret.state);
    // switch (state) {
    // case 6001: //账号密码错误
        
    //     break
    // default:
    //     if(errorCallback){
    //         errorCallback(err)
    //     }
    //     break
    // }
}
