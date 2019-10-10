<template>
  <div class="page3 worker-detail">
    <h1 style="text-align:center;padding-top:30px;">{{title}}</h1>
    <div style="margin-top: 20px;">
      <div style="display:flex;font-size: 13px;height:110px;justify-content: center" v-for="(item,index) in detail" :key="index">
        <div v-if="item.percentage === 50 || item.percentage === 100" style="width: 80px;text-align:right;margin-top: 10px">{{item.timestamp}}</div>
        <div v-else style="width: 80px;text-align:right">{{item.timestamp}}</div>
        <div v-if="item.percentage === 50 || item.percentage === 100" style="width: 70px;font-size:16px;position: relative">
          <div style="width:50px;height:50px;border-radius:50%;background:aqua;display: flex;justify-content: center;align-items: center;margin: 0 auto;">
            {{item.percentage}}%
          </div>
          <div style="width:1px;height:60px;background:black;position:absolute;top:45%;left:34px;"></div>
        </div>
        <div v-else style="width: 70px;font-size:10px;position: relative">
          <div style="width:25px;height:25px;border-radius:50%;background:#d8d2d4;display: flex;justify-content: center;align-items: center;margin: 0 auto;">
            {{item.percentage}}%
          </div>
          <div style="width:1px;height:85px;background:black;position:absolute;top:23%;left:34px;"></div>
        </div>
        <div v-if="item.percentage === 50 || item.percentage === 100" style="width: 150px;margin-top: 10px">{{item.description}}</div>
        <div v-else style="width: 150px;">{{item.description}}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Dependencies } from "@/core/decorator";
import { VehicleRoughService } from "@/services/manage-service/vehicle-rough.service";
import dateFormat from '@/utils/index'

@Component
export default class Page3 extends Vue {
  @Dependencies(VehicleRoughService) private vehicleRoughService: VehicleRoughService;
  private title:string = ''
  private reference:string = ''
  private detail:Array<any> = []
  mounted(){
    this.title = this.$router.currentRoute.query.title
    this.reference = this.$router.currentRoute.query.reference
    if(this.reference) {
      this.vehicleRoughService.getWorkDetail(this.reference)
        .subscribe(data => {
          if(data) {
            this.detail = data.map(item =>{
              item.timestamp = dateFormat(item.timestamp)
              return item
            })
          }
        })
    }
  }
}
</script>

<style lang="less" scoped>
.page3.worker-detail {
  width: 100%;
  height: 100%;
}
</style>
