
import {manageService} from "@/config/server/manage-service";
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
      server: manageService.vehicleRoughController.getAllCarBrand,
    })
  }
  getAllSeriesByBrandId(brandId) {
    return this.netService.send({
      server: manageService.vehicleRoughController.getAllSeriesByBrandId,
      append:brandId
    })
  }
  getAllModelBySeriesId(seriesId) {
    return this.netService.send({
      server: manageService.vehicleRoughController.getAllModelBySeriesId,
      append:seriesId
    })
  }
  queryRegList(modelId) {
    return this.netService.send({
      server: manageService.vehicleRoughController.queryRegList,
      data:{
        modelId:modelId
      },
      loading: true
    })
  }
  roughChe300Price(data) {
    return this.netService.send({
      server: manageService.vehicleRoughController.roughChe300Price,
      data
    })
  }
}
