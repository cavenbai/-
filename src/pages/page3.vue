<template>
  <div class="page3 worker-detail">
    <h1 style="text-align:center;padding-top:30px;">{{title}}</h1>
    <div style="margin-top: 20px;">
      <div style="position:relative;display: flex;font-size: 13px;height:110px;" v-for="(item,index) in detail" :key="index">
        <p style="margin-top:16px;margin-right:10px;margin-left: 19%;">{{item.timestamp}}</p>
        <div style="width: 20%;display: flex;justify-content: center;">
          <div v-if="item.percentage === 50 || item.percentage === 100" style="width:50px;height:50px;border-radius:50%;background:aqua;display:flex;justify-content:center;align-items:center;font-size:16px;">
            {{item.percentage}}%
          </div>
          <div v-else style="width:25px;height:25px;border-radius:50%;background:#d8d2d4;display:flex;justify-content:center;align-items:center;font-size:10px;">
            {{item.percentage}}%
          </div>
        </div>
        <div style="margin-top: 16px;margin-left: 10px">
          <p>{{item.description}}</p>
        </div>
        <div style="width:1px;height:60px;background:black;position:absolute;top:45%;left:46%;"></div>
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
          this.detail = data.map(item =>{
            item.timestamp = dateFormat(item.timestamp)
            return item
          })
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
