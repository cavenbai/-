<template>
  <div class="page2 my-worker">
    <p style="font-size: 14px;margin-left: 16px">共计作业：{{workerList.length}}</p>
    <i-cell-group>
      <i-cell v-for="(item,index) in workerList" :key="index"  @click="workerDetail(item)">
        <div style="display: flex">
          <span slot="icon">
          <div style="width:120px;height:40px;margin-right: 10px">
            <img :src="item.worktypelogo" style="max-width: 100%;max-height: 100%"/>
          </div>
        </span>
          <div slot="footer" style="text-align: left">
            <div>{{item.workname}}</div>
            <div style="font-size: 10px;margin-top: 5px;">{{item.create_time}} {{item.finished === 1 ? '已完成':''}}</div>
          </div>
        </div>
      </i-cell>
    </i-cell-group>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Dependencies } from "@/core/decorator";
import { VehicleRoughService } from "@/services/manage-service/vehicle-rough.service";
import ServerPath  from '../../environment/dev.env'
import dateFormat from '@/utils/index'

@Component
export default class Page2 extends Vue {
  @Dependencies(VehicleRoughService) private vehicleRoughService: VehicleRoughService;
  private workerList:Array<any> = []
  private getId:string = ''

  mounted(){
    this.getId = wx.getStorageSync('openid') //获取本地存储openid
    if(this.getId) {
      this.vehicleRoughService.getWorkList(this.getId)
        .subscribe(data => {
          this.workerList = data.map(item =>{
             item.worktypelogo = `${JSON.parse(ServerPath.URL_SERVER)}${item.worktypelogo}`
             item.create_time = dateFormat(item.create_time)
            return item
          })
        })
    }
  }

  workerDetail(item){
    this.$router.push({ path: '/pages/page3', query: {title:item.workname, reference:item.reference }})
  }

}
</script>

<style lang="less" scoped>
.page2.my-worker{
  width: 100%;
  height: 100%;
}
</style>
