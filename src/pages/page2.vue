<template>
  <div class="page2 my-worker">
    <p style="font-size: 14px;margin-left: 16px">共计作业：2</p>
    <i-cell-group>
      <i-cell v-for="(item,index) in workerList" :key="index" :title="item.title" @click="workerDetail(item)">
        <span slot="icon">
          <i-icon :type="item.icon" size="20" color="#80848f" />
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
    {icon:'activity', title:'Year 1 CAD Assignment 1'},
    {icon:'activity', title:'Year 1 Sketchup Assignment 1'}
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
