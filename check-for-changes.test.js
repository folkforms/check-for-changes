const shelljs = require("shelljs");
const createTestGitRepo = require("./createTestGitRepo");
const checkForChanges = require("./check-for-changes");

const consoleLogBackup = console.log;
beforeAll(() => { console.log = () => {}; });
afterAll(() => { console.log = consoleLogBackup; });
afterEach(() => {
  shelljs.rm("-rf", "temp");
});

test("when we call 'checkForChanges' with no arguments it fails", () => {
  const tokens = [];
  const exitCode = checkForChanges(tokens, shelljs);
  expect(exitCode).toEqual(1);
});

test("it returns 0 when we are on main and the feature branch contains the changes we want", () => {
  createTestGitRepo("temp", "merge-commit", 1, 2);
  const tokens = [ "f1.txt" ];
  const exitCode = checkForChanges(tokens, shelljs, { testFolder: "temp" });
  expect(exitCode).toEqual(0);
});

test("it returns 1 when we are on main and the feature branch does not contain the changes we want", () => {
  createTestGitRepo("temp", "merge-commit", 1, 2);
  const tokens = [ "m1.txt" ];
  const exitCode = checkForChanges(tokens, shelljs, { testFolder: "temp" });
  expect(exitCode).toEqual(1);
});

test("it returns 0 when we are on the feature branch and it contains the changes we want", () => {
  createTestGitRepo("temp", "branch", 1, 2);
  const tokens = [ "f1.txt" ];
  const exitCode = checkForChanges(tokens, shelljs, { testFolder: "temp" });
  expect(exitCode).toEqual(0);
});

test("it returns 1 when we are on the feature branch and it does not contain the changes we want", () => {
  createTestGitRepo("temp", "branch", 1, 2);
  const tokens = [ "m1.txt" ];
  const exitCode = checkForChanges(tokens, shelljs, { testFolder: "temp" });
  expect(exitCode).toEqual(1);
});
