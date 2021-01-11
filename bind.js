function foo() {
  console.log(this.name)
}

const obj = {
  name: 'timokie'
}

foo.bind(obj)()


Function.prototype.myBind = function (thisArg, ...args) {
  // var self = this
  // // new优先级
  // var fbound = function () {
  //   self.apply(this instanceof self ? this : thisArg, args.concat(Array.prototype.slice.call(arguments)))
  // }
  // // 继承原型上的属性和方法
  // fbound.prototype = Object.create(self.prototype);

  // return fbound;

  const self = this
  const bindFn = function() {
    self.apply(this instanceof self ? this : thisArg, args.concat(Array.prototype.slice.call(arguments)))
  }
  bindFn.prototype = Object.create(self.prototype)
  return bindFn
}


foo.myBind(obj)()