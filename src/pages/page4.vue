<template>
  <div class="page4 my-worker">
    <p style="font-size: 14px;margin-left: 16px">共计作业：{{workerList.length}}</p>
    <i-cell-group>
      <i-cell v-for="(item,index) in workerList" :key="index">
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
    <div style="position: fixed;bottom: 0;left:0;height: 40px;width: 100%;background-color: red">
      <div style="display: flex">
        <div style="width:40px;height: 40px;border-radius: 50%; display:inline-block;margin-left: 10px">
          <img :src="headerImage" style="width: 100%;height: 100%;"/>
        </div>
        <button open-type="getUserInfo" @getuserinfo="bindGetUserInfo"  style="position: static;display: inline;background: red;font-size: 14px;line-height: 40px;margin-left: 0px">
          登陆/注册
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import { Dependencies } from "@/core/decorator";
  import { VehicleRoughService } from "@/services/manage-service/vehicle-rough.service";
  import { Mutation } from "vuex-class";
  import ServerPath  from '../../environment/dev.env'
  import dateFormat from '@/utils/index'

  @Component
  export default class Page2 extends Vue {
    @Dependencies(VehicleRoughService) private vehicleRoughService: VehicleRoughService;
    @Mutation private updateUserInfo;
    private workerList:Array<any> = []
    private getId:string = ''
    private headerImage = require('../../static/images/a.png')

    mounted(){
      this.vehicleRoughService.getWork()
        .subscribe(data => {
          this.workerList = data.map(item =>{
            item.worktypelogo = `${JSON.parse(ServerPath.URL_SERVER)}${item.worktypelogo}`
            item.create_time = dateFormat(item.create_time)
            return item
          })
        })
    }

    bindGetUserInfo(e) {
      if (e.mp.detail.rawData){
        this.updateUserInfo(e.mp.detail.userInfo)
        wx.login({
          success:(res) => {
            if(res.code) {
              let param = {
                code:res.code,
                nickname:e.mp.detail.userInfo.nickName,
                avatarurl:e.mp.detail.userInfo.avatarUrl,
                gender:e.mp.detail.userInfo.gender,
                country:e.mp.detail.userInfo.country,
                city:e.mp.detail.userInfo.city,
              }
              this.vehicleRoughService.getOpenid(param)
                .subscribe(data => {
                  if(data.data.id){
                    wx.setStorageSync('openid', data.data.id)
                    this.$router.push('/pages/page1');
                  }
                })
            }
          }
        })
      } else {
        //点击拒绝处理
        // wx.showToast({ title: "为了您更好的体验,请先同意授权...", icon: 'none', duration: 2000 })
      }
    }
  }
</script>

<style lang="less" scoped>
  .page4.my-worker{
    width: 100%;
    height: 100%;
  }
</style>
