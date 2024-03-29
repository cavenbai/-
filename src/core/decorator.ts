import "reflect-metadata";
import { createDecorator } from 'vue-class-component'
import injector from 'vue-inject';
import { Observable } from "rxjs";

/**
 * 组件内依赖注入
 * @param target
 */
export function Dependencies(target?: any) {
  return createDecorator((componentOptions, key) => {
    if (!injector.$$factories[key] && target) {
      injector.service(key, target);
    }

    if (typeof componentOptions['dependencies'] === 'undefined') {
      componentOptions['dependencies'] = []
    }

    if (Array.isArray(componentOptions['dependencies'])) {
      componentOptions['dependencies'].push(key)
    }
  })
}


/**
 * 直接依赖注入
 */
export function Inject(target?): PropertyDecorator {
  return function (container, key) {
    if (!injector.$$factories[key] && target) {
      injector.service(key, target).lift;
    }

    try {
      container[key] = injector.get(key);
    }
    catch (ex) {
      console.warn(ex)
    }
  }
}

/**
 * 函数去抖动
 * @param time
 */
export function Debounce(time: number = 500) {
  return function (target, name, descriptor) {
    var oldValue = descriptor.value;
    let flag
    descriptor.value = function () {
      if (flag) {
        return Observable.empty()
      } else {
        flag = setTimeout(() => {
          flag = null
        }, time)
      }
      return oldValue.apply(target, arguments);
    };

    return descriptor;
  }
}
