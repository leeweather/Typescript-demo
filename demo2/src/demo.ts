// class Person {
//   constructor(private _name: string) {}
//   get name() {
//     return this._name + ' lee'
//   }
//   set name(name: string) {
//     this._name = name
//   }
// }

// const person = new Person('dell')

// console.log(person.name)

//单例模式

class Demo {
  private static instance: Demo
  private constructor(public name: string) {}

  static getInstance(name: string) {
    if (!this.instance) {
      this.instance = new Demo(name)
    }
    return this.instance
  }
}

const demo1 = Demo.getInstance('dell')
const demo2 = Demo.getInstance('dell 3333')

console.log(demo1.name)
console.log(demo2.name)
