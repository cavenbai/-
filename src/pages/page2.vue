<template>
  <div class="page2 my-worker">
    <p style="font-size: 14px;margin-left: 16px">共计作业：{{workerList.length}}</p>
    <i-cell-group>
      <i-cell v-for="(item,index) in workerList" :key="index" :title="item.title" @click="workerDetail(item)">
        <span slot="icon">
          <!--<i-icon :type="item.icon" size="20" color="#80848f" />-->
          <div style="width:120px;height:40px;margin-right: 10px">
            <img :src="item.image" style="max-width: 100%;max-height: 100%"/>
          </div>
        </span>
      </i-cell>
    </i-cell-group>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Page2 extends Vue {
  private workerList:Array<any> = [
    {image:require('../../static/images/1.png'), title:'Year 1 CAD Assignment 1'},
    {image:require('../../static/images/2.png'), title:'Year 1 Sketchup Assignment 1'},
    {image:require('../../static/images/3.png'), title:'Year 1 CAD Assignment 1'},
    {image:require('../../static/images/4.png'), title:'Year 1 Sketchup Assignment 1'},
    {image:require('../../static/images/5.png'), title:'Year 1 CAD Assignment 1'},
    {image:require('../../static/images/6.png'), title:'Year 1 Sketchup Assignment 1'},
    {image:require('../../static/images/7.png'), title:'Year 1 CAD Assignment 1'},
    {image:require('../../static/images/8.png'), title:'Year 1 Sketchup Assignment 1'},
    {image:require('../../static/images/9.png'), title:'Year 1 CAD Assignment 1'},
    {image:require('../../static/images/10.png'), title:'Year 1 Sketchup Assignment 1'},
    {image:require('../../static/images/11.png'), title:'Year 1 CAD Assignment 1'},
    {image:require('../../static/images/12.png'), title:'Year 1 Sketchup Assignment 1'},
    {image:require('../../static/images/13.png'), title:'Year 1 CAD Assignment 1'},
    {image:require('../../static/images/14.png'), title:'Year 1 Sketchup Assignment 1'},
  ]

  workerDetail(item){
    this.$router.push({ path: '/pages/page3', query: { icon: item.icon,title:item.title } })
  }

}
</script>

<style lang="less" scoped>
.page2.my-worker{
  width: 100%;
  height: 100%;
}
</style>
