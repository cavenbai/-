<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
  mpType: "app"
} as any)
export default class App extends Vue {
  onLaunch() {}

  created() {
    // 调用API从本地缓存中获取数据
    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    console.log("app created and cache logs by setStorageSync");
  }
}
</script>

<style>
page {
  height: 100%;
  width: 100%;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
