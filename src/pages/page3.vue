<template>
  <div class="page3 worker-detail">
    <h1 style="text-align:center;padding-top:30px;">{{title}}</h1>
    <div style="margin-top: 20px;">
      <div style="position:relative;display: flex;font-size: 13px;height:110px;justify-content:center" v-for="(item,index) in detail" :key="index">
        <p style="margin-top:16px;margin-right:10px;">{{item.date}}</p>
        <div style="width:50px;height:50px;border-radius:50%;background:aqua;display:flex;justify-content:center;align-items:center;font-size:16px;">
          {{item.process}}
        </div>
        <div style="margin-top: 16px;margin-left: 10px">
          <p>{{item.text1}}</p>
          <p>{{item.text2}}</p>
        </div>
        <div style="width:1px;height:60px;background:black;position:absolute;top:45%;left:45%;"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Page3 extends Vue {
  private verticalCurrent:number = 2
  private title:string = ''
  private detail:Array<any> = [
    {date:'13/9/2019',process:'100%',text1:'Side View 1完成',text2:'Side View 1完成'},
    {date:'13/9/2019',process:'100%',text1:'Side View 1完成',text2:'Side View 1完成'},
    {date:'13/9/2019',process:'100%',text1:'Side View 1完成',text2:'Side View 1完成'},
    {date:'13/9/2019',process:'100%',text1:'Side View 1完成',text2:'Side View 1完成'},
    {date:'13/9/2019',process:'100%',text1:'Side View 1完成',text2:'Side View 1完成'}
  ]
  mounted(){
    this.title = this.$router.currentRoute.query.title
    console.log(this.$router.currentRoute.query)
  }
}
</script>

<style lang="less" scoped>
.page3.worker-detail {
  width: 100%;
  height: 100%;
}
</style>
