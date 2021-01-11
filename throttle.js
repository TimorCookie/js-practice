// 节流：每隔一段时间执行一次
// 原理：设置一个定时器，约定XX毫秒后执行事件，如果时间到了，执行函数并重置定时器

// ! 实现1
function throttle(fn, wait) {
  let timeout = null
  return function() {
    let context = this
    let args = arguments

    if(!timeout) {
      timeout = setTimeout(()=> {
        timeout = null
        fn.apply(context,args)
      }, wait)
    }
  }
}
// ! 实现2
function throttle (fn, wait) {
  let prev = 0
  return function() {
    let now = new Date.now()
    let context = this
    let args = arguments

    if (now - prev > wait) {
      fn.apply(context, args)
      prev = now
    }
  }
}