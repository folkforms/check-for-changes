const shelljs = require("shelljs");
const createTestGitRepo = require("./createTestGitRepo");
const checkForChanges = require("./check-for-changes");

afterEach(() => {
  shelljs.rm("-rf", "temp");
});

test("when we call 'checkForChanges' with no arguments it fails", () => {
  const tokens = [];
  const exitCode = checkForChanges(tokens, shelljs);
  expect(exitCode).toEqual(1);
});

test("it returns 0 when the feature branch contains the changes we want", () => {
  createTestGitRepo("temp", 1, 2);
  const tokens = [ "f1.txt" ];
  const exitCode = checkForChanges(tokens, shelljs, { testFolder: "temp" });
  expect(exitCode).toEqual(0);
});

test("it returns 1 when the feature branch does not contain the changes we want", () => {
  createTestGitRepo("temp", 1, 2);
  const tokens = [ "m1.txt" ];
  const exitCode = checkForChanges(tokens, shelljs, { testFolder: "temp" });
  expect(exitCode).toEqual(1);
});
