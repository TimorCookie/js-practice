function foo() {
  console.log(this.name)
}

const obj = {
  name: 'timokie'
}

foo.apply(obj, [])

Function.prototype.myApply = function(thisArg, args) {
  const fn = Symbol('fn')
  thisArg = thisArg || window
  thisArg[fn]  = this
  const result = thisArg[fn](...args)

  delete thisArg[fn]
  return result
}

foo.myApply(obj, [])