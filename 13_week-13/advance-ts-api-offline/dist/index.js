"use strict";
function sumOfAge(user1, user2) {
    return user1.age + user2.age;
}
const age = sumOfAge({ name: "tom", age: 20 }, { name: "jarry", age: 40 });
console.log(age);
