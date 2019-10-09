
import { requestType } from '@/config/enum.config'
import { NetService } from '@/utils/net.service'
import { Inject } from "@/core/decorator";

export class VehicleRoughService {
  @Inject(NetService)
  private netService: NetService
  /**
   * 小程序登录获取openid接口
   * @param code
   */
  getOpenid(param) {
    return this.netService.send({
      url: '/newuser',
      type: requestType.Post,
      data:param
    })
  }
  /**
   * 小程序获取作业列表
   * @param id
   */
  getWorkList(id:string) {
    return this.netService.send({
      url: `/works/${id}`,
      type: requestType.Get,
      data: {}
    })
  }
  /**
   * 小程序获取作业详情
   * @param id
   */
  getWorkDetail(reference:string) {
    return this.netService.send({
      url: `/workref/${reference}`,
      type: requestType.Get,
      data: {}
    })
  }
  /**
   * 小程序获取假数据
   * @param
   */
  getWork() {
    return this.netService.send({
      url: `/tests/fakeid`,
      type: requestType.Get,
      data: {}
    })
  }
}
