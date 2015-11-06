function greeter(person) {
    return function () { return "Hello, " + person; };
}
var user = "Jane User";
console.log(greeter(user)());
