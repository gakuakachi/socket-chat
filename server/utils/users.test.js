const expect = require("expect");

const { Users } = require("./users");

describe("Users", () => {
  let users;
  beforeEach(() => {
    users = new Users();
    users.users = [
      {
        id: 1,
        name: "Jay",
        room: "test1"
      },
      {
        id: 2,
        name: "Jayd",
        room: "node"
      },
      {
        id: 3,
        name: "Jaythun",
        room: "node"
      }
    ];
  });

  it("should add new user", () => {
    var user = {
      id: 414231454264,
      name: "Test Test",
      room: "Test"
    };
    const resUser = users.addUser(user.id, user.name, user.room);
    expect(users.users[users.users.length - 1]).toEqual(resUser);
  });

  it("should removeUser", () => {
    const removedUser = users.removeUser(1);
    expect(users.users).toExclude(removedUser);
  });

  it("should not remove user", () => {
    const usersData = users.users;
    users.removeUser(11111);
    expect(users.users).toEqual(usersData);
  });

  it("should find users", () => {
    const foundUser = users.getUser(1);
    expect(users.users[0]).toEqual(foundUser);
  });

  it("should not find users", () => {
    const notFoundUser = users.getUser(111);
    expect(notFoundUser).toBeFalsy();
  });

  it("should return users for node course", () => {
    const resUser = users.getUserList("node");
    expect(resUser).toEqual(["Jayd", "Jaythun"]);
  });
});
