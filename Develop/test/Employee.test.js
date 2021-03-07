const Employee = require('../lib/Employee');

test("Instantiate Employee instance", () => {
    const e = new Employee();
    expect(typeof(e)).toBe("object");
    console.log(e)
});

test("Verify name form getname() method", () => {
    const name = "Bhavika";
    const e = new Employee(name);
    expect(e.getName()).toBe(name);
});

test("Verify id form getid() method", () => {
    const id = 15
    const e = new Employee("bhavi",15, "test@test.com");
    expect(e.getId()).toBe(id);
});

test("Verify email form getEmail() method", () => {
    const email = "test@test.com"
    const e = new Employee("bhavi",15, "test@test.com");
    expect(e.getEmail()).toBe(email);
});

test("Verify role getRole() method return \"Employee\"", () => {
    const role = "Employee";
    const e = new Employee("bhavi", 15, "test@test.com");
    expect(e.getRole()).toBe(role);
  });
