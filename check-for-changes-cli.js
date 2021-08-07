#!/usr/bin/env node

const checkForChanges = require("./check-for-changes");
const shelljs = require("shelljs");
const { dryRunShellJs } = require("dummy-shells");
const { Command } = require('commander');

const program = new Command();
program
  .option("--main-branch", "Override default 'main' branch name for main branch")
  .option("-n, --dry-run", "Dry run")
  .parse();

const mainBranch = program.opts().mainBranch;
const shell = program.opts().dryRun ? dryRunShellJs : shelljs;
const tokens = program.args;

return checkForChanges(tokens, shell, { mainBranch });
