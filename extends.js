
function Parent(age) {
  this.name = 'timokie',
  this.hobies = ['sing', 'dance', 'rap']
  this.age = age
}

Parent.prototype.getName = function() {
  return this.name
}

// ! 原型链继承
// todo 实现： 让子类的原型对象指向父类实例（当子类实例找不到对应的属性和方法时，就会往它的原型对象，也就是父类实例上找，从而实现对父类的属性和方法的继承）
// * 缺点：1.由于所有的Child实例原型都指向同一个Parent实例，因此对某个Child实例的父类引用类型变量修改会影响所有的Child实例
// *      2.在创建子类实例时无法向父类构造函数传参
function Child() {}
Child.prototype = new Parent()
Child.prototype.constructor = Child

const child = new Child()
console.log('原型链继承 ---- 属性：', child.name)
console.log('原型链继承 ---- 方法：', child.getName())
// 缺点：
const child1 = new Child()
const child2 = new Child()

child1.hobies[0] = 'sleep'
console.log('child1:', child1.hobies)
console.log('child2:', child2.hobies)


// ! 构造函数继承
// todo 实现： 在子类的构造函数中执行父类的构造函数，并为其绑定子类的this，让父类的构造函数把成员属性和方法都挂在到子类的this上去（既能避免实例之间共享一个原型实例，又能向父类构造方法传参）
// * 缺点：继承不到父类原型上的属性和方法

function ChildConstructor (age){
  Parent.call(this, 18)
}

const child3 = new ChildConstructor()
const child4 = new ChildConstructor()

console.log('构造函数继承 ---- 属性：',child3)
child4.hobies[1] = 'pc'
console.log('构造函数继承 ---- 属性---child3：',child3)
console.log('构造函数继承 ---- 属性---child4：',child4)
// 缺点： child3.getName is not a function, 构造函数继承的方式继承不到父类原型上的属性和方法
console.log(child3.getName())

