#!/usr/bin/env node

const checkForChanges = require("./check-for-changes");
const shelljs = require("shelljs");
const { dryRunShellJs } = require("dummy-shells");
const { Command } = require('commander');

const program = new Command();
program.option('-n, --dry-run', 'Dry run');
program.parse();

const shell = program.opts().dryRun ? dryRunShellJs : shelljs;
const tokens = program.args;

return checkForChanges(tokens, shell);
