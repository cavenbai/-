
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
  getOpenid(code) {
    return this.netService.send({
      url: '/adduser',
      type: requestType.Post,
      data: {
        code
      }
    })
  }
}
