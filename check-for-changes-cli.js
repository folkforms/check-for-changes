#!/usr/bin/env node

const checkForChanges = require("./check-for-changes");
const shelljs = require("shelljs");
const { dryRunShellJs } = require("dummy-shells");
const { Command } = require('commander');

const program = new Command();
program
  .requiredOption("-c, --command <command>", "Command to run if the check is successful. Use quotes if the command contains multiple tokens.")
  .option("--main-branch", "Override default 'main' branch name for main branch")
  .option("-n, --dry-run", "Dry run")
  .parse();

const command = program.opts().command;
const mainBranch = program.opts().mainBranch;
const shell = program.opts().dryRun ? dryRunShellJs : shelljs;
const tokens = program.args;

const r = checkForChanges(tokens, shell, { mainBranch });
if(r === 0) {
  shell.exec(command);
} else {
  console.log(`No changes beginning with '${tokens}' found, skipping '${command}'`);
}

return 0;
