const Intern = require("../lib/Intern");

test("Can set school via constructor", () => {
    const schoolname = "Temple";
    const e = new Intern("Foo", 1, "test@test.com", schoolname);
    expect(e.school).toBe(schoolname);
  });
  
  test("getRole() should return \"Intern\"", () => {
    const internRole = "Intern";
    const e = new Intern("Foo", 1, "test@test.com", "Temple");
    expect(e.getRole()).toBe(internRole);
  });
  
  test("Can get school via getSchool()", () => {
    const schoolName = "Temple";
    const e = new Intern("Foo", 1, "test@test.com", schoolName);
    expect(e.getSchool()).toBe(schoolName);
  });