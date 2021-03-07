const Engineer = require("../lib/Engineer");

test("Can set GitHUb account via constructor", () => {
  const githubuser = "GitHubUser";
  const e = new Engineer("chris", 1, "test@test.com", githubuser);
  expect(e.github).toBe(githubuser);
});

test("Can get GitHub username via getGithub()", () => {
    const username = "GitHubUser";
    const e = new Engineer("Foo", 1, "test@test.com", username);
    expect(e.getGithub()).toBe(username);
  });

test("getRole() should return \"Engineer\"", () => {
  const engineer = "Engineer";
  const e = new Engineer("Foo", 1, "test@test.com", "GitHubUser");
  expect(e.getRole()).toBe(engineer);
});

