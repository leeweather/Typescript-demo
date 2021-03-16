class Student {
  fullName: string
  constructor(public firstName:string, public middleInitial:string, public lastName:string) {
    this.fullName = this.firstName + this.middleInitial + this.lastName
  }
}

interface Person {
  firstName: string
  lastName: string
}

function greeter(person: Person) {
  return 'hello' + person.firstName + person.lastName
}

// let user = { firstName: 'Jane', lastName: 'User' }

let user = new Student('李','伟','哲')

document.body.innerHTML = greeter(user)
