
import { requestType } from '@/config/enum.config'
import { NetService } from '@/utils/net.service'
import { Inject } from "@/core/decorator";

export class VehicleRoughService {
  @Inject(NetService)
  private netService: NetService
  /**
   * 获取品牌列表
   * @param data
   */
  getAllCarBrand() {
    return this.netService.send({
      url: '/works/21c2b4d332',
      type: requestType.Get,
      data: {}
    })
  }
}
