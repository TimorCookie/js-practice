// !单例模式即一个类只能构造出唯一实例，单例模式的意义在于共享、唯一
// !Redux/Vuex中的store、JQ的$或者业务场景中的购物车、登录框都是单例模式的应用
class SingletonLogin {
  constructor(name, psw) {
    this.name = name
    this.psw = psw
  }
  static getInstance(name, psw) {
    if (!this.instance) {
      this.instance = new SingletonLogin(name, psw)
    }
    return this.instance
  }
}

const obj1 = SingletonLogin.getInstance('timokie', '123456')
const obj2 = SingletonLogin.getInstance('timokie', '123')

console.log('obj1', obj1)
console.log('obj2', obj2)

// !工厂模式即对创建对象逻辑的封装，或者可以简单理解为对new的封装，这种封装就像创建对象的工厂，故名工厂模式
// !工厂模式常见于大型项目，比如JQ的$对象，我们创建选择器对象时之所以没有new selector就是因为$()已经是一个工厂方法，其他例子例如React.createElement()、Vue.component()都是工厂模式的实现。工厂模式有多种：简单工厂模式、工厂方法模式、抽象工厂模式，这里只以简单工厂模式为例：
class User {
  constructor(name, auth) {
    this.name = name
    this.auth = auth
  }
}

class UserFactory {
  static createUser(name, auth) {
    if (auth === 'admin') {
      return new User(name, 1)
    }
    if (auth === 'user') {
      return new User(name, 2)
    }
  }
}

const user = UserFactory.createUser('timokie', 'user')
const admin = UserFactory.createUser('jinhui', 'admin')

console.log('admin', admin)
console.log('user', user)


// ! 观察者模式：观察者监听被观察者的变化，被观察者发生改变时，通知所有的观察者
// ! 观察者模式被广泛用于监听事件的实现，有关观察者模式的详细应用(redux)

class Observer {
  constructor(fn) {
    this.update = fn
  }
}

class Subject {
  constructor() {
    this.observers = []
  }
  addObserver(observer) {
    this.observers.push(observer)
  }
  notify() {
    this.observers.forEach(observer => {
      observer.update()
    })
  }
}
let subject = new Subject()
const update = () => {
  console.log('被观察者发出通知')
}
const ob1 = new Observer(update)
const ob2 = new Observer(update)

subject.addObserver(ob1)
subject.addObserver(ob2)

subject.notify()

// ! 装饰器模式 可以理解为对类的一个包装，动态地拓展类的功能
// ! ES7的装饰器语法以及React中的高阶组件（HoC）都是这一模式的实现。react-redux的connect()也运用了装饰器模式，这里以ES7的装饰器为例：

function info(target) {
  target.prototype.name = 'timokie'
  target.prototype.age = 18
}
// @info
class Student { }

let stu = new Student()
console.log(stu.name)

// ! 适配器模式，将一个接口转换成客户希望的另一个接口，使接口不兼容的那些类可以一起工作
class Adaptee {
  test() {
    return '旧接口'
  }
}

class Target {
  constructor() {
    this.adaptee = new Adaptee()
  }
  test() {
    let info = this.adaptee.test()
    return `适配${info}`
  }
}

let target = new Target()
console.log(target.test())

// ! 代理模式，为一个对象找一个替代对象，以便对原对象进行访问。即在访问者与目标对象之间加一层代理，通过代理做授权和控制
// ! 事件代理、JQuery的$.proxy、ES6的proxy都是这一模式的实现，下面以ES6的proxy为例：
const idol = {
  name: 'timokie',
  phone: '123456',
  price: 100000
}


const agent = new Proxy(idol, {
  get: function (target) {
    return '经纪人电话：22222'
  },
  set: function (target, key, value) {
    if (key === 'price') {
      if(value < target.price) throw new Error('报价太低！')
      target.price = value
    }
  }
})

console.log(agent.phone)
// agent.price = 1000
agent.price = 200000