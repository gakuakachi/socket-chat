const _ = require("lodash");

[
  {
    id: "344343",
    name: "Andrew",
    room: "The Office Fans"
  }
];

//addUser(id, name, room)
//removeUser(id)
//getUser(id)
//getUserList(room)

// var users = [];

// var addUser = (id, name, room) => {
//   user.push({})
// }

// modules.export = {addUsers}
class Users {
  constructor() {
    this.users = [];
  }
  addUser(id, name, room) {
    const user = { id, name, room };
    this.users.push(user);
    return this.users;
  }
  findIndex(id) {
    return _.findIndex(this.users, user => user.id.toString() == id.toString());
  }
  removeUser(id) {
    const index = this.findIndex(id);
    if(this.users[index]) {
      this.users = this.users.splice(index, 1);
      return this.users[index];
    }
  }
  getUser(id) {
    const index = this.findIndex(id);
    return this.users[index];
  }
  getUserList(room) {
    //return userList
    const users = this.users.filter(user => user.room === room);
    const namesArray = users.map(user => user.name);
    return namesArray;
  }
}

module.exports = { Users };
// class Person {
//   constructor(name, age) {
//     this.name = name;
//     this.age = age;
//   }

//   getUserDescription () {
//     return `${this.name} is ${this.age} year(s) old`;
//   }
// }

// const me = new Person('gaku', 24);
// const description = me.getUserDescription();
// console.log(description);
