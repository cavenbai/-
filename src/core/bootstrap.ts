import Vue from 'vue'
import injector from 'vue-inject';
import createProvide from '@/core/provide'

export default async function (launch) {
  // 创建提供器
  if (createProvide) {
    Vue.use(injector)
    Object.entries(createProvide()).forEach(([key, value]) => {
      let lifecycle = "class"
      let provide

      if (value instanceof Array) {
        lifecycle = value[1]
        provide = value[0]
      } else {
        provide = value
      }

      let [target] = Object.values(provide())
      injector.service(key, target).lifecycle[lifecycle]();
    })
  }
  launch()
}
