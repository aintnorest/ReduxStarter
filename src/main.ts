function greeter(person: string) {
    return () =>{ return "Hello, " + person;}
}

var user = "Jane User";

console.log(greeter(user)());
