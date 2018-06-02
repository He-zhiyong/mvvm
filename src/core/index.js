import proxy from './instance/proxy'
import initOptions from './instance/init'
import Compiler from './compile'
import Watcher from './observer/watcher'
import {
  callHook
} from './instance/lifecycle'

export default class MVVM {
  constructor(options = {}) {
    let vm = this
    vm.$options = options
    vm.$watch = function (key, callBack) {
      new Watcher(vm, key, callBack)
    }
    initOptions(vm)
    for (let key in vm._data) {
      proxy(vm, '_data', key)
    }
    callHook(vm, 'created')
    new Compiler(vm.$options.el, vm)
    callHook(vm, 'mounted')
  }
}
