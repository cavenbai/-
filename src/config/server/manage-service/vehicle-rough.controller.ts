import { requestType } from '@/config/enum.config'
const SERVICE = 'service-manage'
const CONTROLLER = 'vehicleRoughController'

export default {
  /**
   * 获取车辆所有品牌
   */
  getAllCarBrand: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getAllCarBrand',
    type: requestType.Get
  },
  /**
   * 获取品牌下所有车系
   */
  getAllSeriesByBrandId: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getAllSeriesByBrandId',
    type: requestType.Get
  },
  /**
   * 获取车系下所有车型
   */
  getAllModelBySeriesId: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'getAllModelBySeriesId',
    type: requestType.Get
  },
  /**
   * 获取上牌日期
   */
  queryRegList: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'queryRegList',
    type: requestType.Get
  },
  /**
   * 获取估价
   */
  roughChe300Price:{
    service: SERVICE,
    controller: CONTROLLER,
    action: 'roughChe300Price',
    type: requestType.Get
  }
}

