function foo() {
  console.log(this.name)
}

const obj = {
  name: 'timokie'
}

foo.call(obj)

// Function.prototype.myCall = function (thisArg, ...args) {
//   // this: foo
//   thisArg.fn = this
//   return thisArg.fn(...args)
// }

Function.prototype.myCall = function(thisArg, ...args) {
  const fn = Symbol('fn')
  thisArg = thisArg || window

  thisArg[fn] = this
  const result = thisArg[fn](...args)

  delete thisArg[fn]
  return result
}

foo.myCall(obj)