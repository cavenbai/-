import { Observable } from "rxjs";
import ServerPath  from '../../environment/dev.env'
const getType = ['GET', 'DELETE'] // 使用GET请求类型
export class NetService{
  // public static generateRequestUrl({ service, controller, action, url }: { service: string, controller: string, action: string, url?: string }, append = [], sort?):string {
  //   // 自定义url优先级最高
  //   if (url) return url
  //   if (controller) {
  //     let targetUrl = [service, controller, action, ...append].filter(x => x).join('/')
  //     if (sort) {
  //       targetUrl += '?'
  //       targetUrl += Object.entries(sort.sort).map(([k, v]) => `sort=${k},${v}`).join('&')
  //     }
  //     return targetUrl
  //   } else {
  //     throw new Error('server配置异常')
  //   }
  // }
  /**
   * 生成头部信息
   */
  private generateRequestHeader(headers): any {
    return Object.assign({ 'content-type': 'application/json' })
  }

  private filterEmptyData(data) {
    Object.entries(data)
      .filter(([key, value]) => {
        // 过滤空字符串
        if (value === undefined || value === "") {
          return true
        }
      })
      .forEach(([key, value]) => {delete data[key]});
    return data
  }

  public send(options: any): Observable<any>{
    let data = Object.assign({}, options.data)  //传入的参数
    let postData  //post请求参数处理
    let getData  //get请求参数处理
    let url = options.url
    let method = options.type || 'GET'
    let headers = this.generateRequestHeader(options.headers)
    getType.indexOf(method) > -1 ? (getData = this.filterEmptyData(data)) : (postData = this.filterEmptyData(data))  // 判断参数类型GET/POST
    // 创建待观察对象
    var observable = Observable.create((observer) => {
      wx.request({
        method : method,
        url : JSON.parse(ServerPath.URL_SERVER) + url,
        header : headers,
        data : getType.includes(method)? getData : postData,
        success (res) {
          observer.next(res.data)
        },
        fail(ex){
          //暂定统一错误提示
          wx.showToast({ title: "服务端异常，请稍后重试...", icon: 'none', duration: 2000 })
          //TODO 通过服务端返回各种状态码，来告知用户错误信息 （以后加）
          observer.error({ msg: ex }) //将错误信息传递到调用方法，可在调用时自定义错误弹出方式
        }
      })
    })
    return observable
  }
}
