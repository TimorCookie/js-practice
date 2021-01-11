// 防抖： 短时间内大量触发同一事件，只会执行一次函数
// 实现原理：设置一个定时器，约定在XX秒后再触发该函数，每次触发事件都会重新设置计时器，知道XX秒内无第二次操作
// 用法：防抖常用于搜索框/滚动条的监听事件处理，如果不做防抖，每输入一个字/滚动屏幕，都会触发事件处理，造成性能浪费。


function debounce (fn, delay) {
  let timer = null
  return function() {
    const context = this
    const args = arguments

    if(timer) clearTimeout(timer)
    timer = setTimeout(()=> {
      fn.apply(context,args)
    }, delay)
  }
}