<template>
  <div class="page1 form-container">
    <div v-if="userInfo.avatarUrl" style="text-align: center" @click="clickTittle">
      <span style="width:50px;height: 50px;border-radius: 50%; display:inline-block">
        <img :src="userInfo.avatarUrl" style="width: 100%;height: 100%;border-radius:50%"/>
      </span>
      <div style="font-size: 30px;margin-top: 20px">杂物原</div>
      <div style="font-size: 30px;margin-top: 20px">作业助理</div>
    </div>
    <div style="width: 50%;" v-else>
      <i-button open-type="getUserInfo" @getuserinfo="bindGetUserInfo" @click="getUserInfo1" type="success" shape="circle" size="large">
        微信授权登陆
      </i-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State, Mutation } from "vuex-class";
import { Dependencies } from "@/core/decorator";
import { VehicleRoughService } from "@/services/manage-service/vehicle-rough.service";
@Component
export default class Page1 extends Vue {
  @Dependencies(VehicleRoughService) private vehicleRoughService: VehicleRoughService;
  @State private userInfo;
  @Mutation private updateUserInfo;

  // router.push('/pages/news/detail') // 字符串
  // router.push({ path: '/pages/news/detail' })// 对象
  // router.push({ path: '/pages/news/detail', query: { id: 1 } })// 带查询参数，变成 /pages/news/detail?id=1
  // router.push({ path: '/pages/news/list', isTab: true })// 切换至 tabBar 页面
  // router.push({ path: '/pages/news/list', reLaunch: true })// 重启至某页面，无需指定是否为 tabBar 页面，但 tabBar 页面无法携带参数
  // this.$router.push("/page/counter");

  mounted() {
    this.getSetting()
  }

  bindGetUserInfo(e) {
    if (e.mp.detail.rawData){
      console.log('用户点击允许授权按钮')
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
                }
              })
          }
        }
      })
    } else {
      console.log('用户点击拒绝按钮')
      wx.showToast({ title: "为了您更好的体验,请先同意授权...", icon: 'none', duration: 2000 })
    }
  }

  private getSetting() {
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          wx.login({
            success:(resCode) => {
              if(resCode.code) {
                //获取用户公开基本信息
                wx.getUserInfo({
                  success: (res) => {
                    this.updateUserInfo(res.userInfo)
                    let param = {
                      code:resCode.code,
                      nickname:res.userInfo.nickName,
                      avatarurl:res.userInfo.avatarUrl,
                      gender:res.userInfo.gender,
                      country:res.userInfo.country,
                      city:res.userInfo.city,
                    }
                    this.vehicleRoughService.getOpenid(param)
                      .subscribe(data => {
                        if(data.data.id) {
                          wx.setStorageSync('openid', data.data.id)
                        }
                      })
                  }
                })
              }
            }
          })
        }
      }
    })
  }

  getUserInfo1():void{
    if(wx.canIUse('button.open-type.getUserInfo')){
      console.log('用户版本可用')
    }else{
      console.log('请升级微信版本')
    }
  }

  clickTittle():void{
    this.$router.push('/pages/page2');
  }

}
</script>

<style lang="less" scoped>
.page1.form-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
