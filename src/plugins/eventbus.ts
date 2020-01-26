import { PluginFunction } from 'vue'
import { EventBus } from '@cortezaproject/corteza-js'

export default function (options: object): PluginFunction<object> {
  return function (Vue): void {
    Vue.prototype.$EventBus = new EventBus(options)
  }
}
