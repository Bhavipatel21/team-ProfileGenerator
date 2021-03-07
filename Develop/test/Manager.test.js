const Manager = require("../lib/Manager");

test("Can set office number via constructor argument", () => {
  const office = 4;
  const e = new Manager("Foo", 1, "test@test.com", office);
  expect(e.officeNumber).toBe(office);
});

test("Can get office number via getOfficeNumber()", () => {
    const officeNumber = 4;
    const e = new Manager("Foo", 1, "test@test.com", officeNumber);
    expect(e.getOfficeNumber()).toBe(officeNumber);
  });

test("getRole() should return \"Manager\"", () => {
  const manager = "Manager";
  const e = new Manager("Foo", 1, "test@test.com", 4);
  expect(e.getRole()).toBe(manager);
});

