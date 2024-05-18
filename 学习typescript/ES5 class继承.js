// 在 ES5 中使用类继承,可以通过构造函数和原型链来实现

/**
 * 1.定义了父类 Animal，它有一个构造函数和一个 speak() 方法。
 * 2.定义了子类 Dog，它继承自 Animal。在 Dog 的构造函数中，通过 Animal.call(this, name) 调用了父类的构造函数,以初始化 name 属性。
 * 3.通过 Dog.prototype = Object.create(Animal.prototype) 让 Dog 的原型继承自 Animal 的原型,这样 Dog 实例就可以访问父类的方法。
 * 4.设置 Dog.prototype.constructor = Dog 是为了确保 Dog 实例的 constructor 属性正确指向 Dog 构造函数。
 * 5.在 Dog 的原型上添加了 bark() 方法,这是子类独有的方法。
 * 6.最后创建了一个 Dog 实例,并测试了从父类继承的 speak() 方法和子类自己的 bark() 方法。
 */
// 父类
function Animal(name) {
  this.name = name
}

Animal.prototype.speak = function () {
  console.log(this.name + ' makes a sound.')
}

// 子类
function Dog(name) {
  // 调用父类构造函数
  Animal.call(this, name)
}

// 继承父类的原型
Dog.prototype = Object.create(Animal.prototype)
Dog.prototype.constructor = Dog

Dog.prototype.bark = function () {
  console.log(this.name + ' barks.')
}

// 使用示例
var dog = new Dog('Buddy')
dog.speak() // Buddy makes a sound.
dog.bark() // Buddy barks.

/**
 * 相比于最简单的原型链继承,寄生组合式继承有以下优点:
 * 1.避免了在子类原型上直接赋值父类的原型,这样可以防止不必要的原型属性。
 * 2.通过 Object.create() 创建一个中间对象,减少了不必要的原型属性拷贝。
 * 3.保留了稳定的原型链关系,即子类的 prototype.constructor 指向子类本身。
 *  具体来说,这个例子中的关键步骤
 *  Dog.prototype = Object.create(Animal.prototype);
 *  Dog.prototype.constructor = Dog;
 *
 * 1.Object.create(Animal.prototype) 创建了一个新的对象,它的原型继承自 Animal.prototype。这样做可以避免直接修改 Animal.prototype。
 * 2.将这个新对象赋值给 Dog.prototype，使 Dog 的原型继承自 Animal。
 * 3.设置 Dog.prototype.constructor = Dog，保证 Dog 实例的 constructor 属性正确指向 Dog 构造函数。
 */
