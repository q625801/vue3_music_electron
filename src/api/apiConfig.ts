import axios from "axios"; // 引用axios
const instance = axios.create({
  timeout: 60000,
});
interface axiosconfig {
  headers:object
}
//请求拦截器
instance.interceptors.request.use(config => {
  // console.log(config)
  if(!config){
    config = {}
  }
  if(!config.headers){
    config.headers = {}
  }
  // console.log(config)
  return config
})
//get请求
function get(url:string, params = {}) {
  return new Promise((resolve, reject) => {
    instance
      .get(url, {
        params: params,
      })
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
//post请求
function post(url:string, data = {}) {
  return new Promise((resolve, reject) => {
    instance.post(url, data).then(
      (response) => {
        resolve(response.data);
      },
      (err) => {
        reject(err);
      }
    );
  });
}

export function postJson(url:string, params:object, successCallback:any, errorCallback:any,isloading = true){
    // if (isloading){
    //     store.state.loadding = true;
    // }
    post(url, params)
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