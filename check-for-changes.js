const checkForChanges = (tokens, shell, options = {}) => {
  if(!tokens || tokens.length == 0) {
    shell.echo("ERROR: You must supply some files or folders to check for.");
    return 1;
  }

  const cd = process.cwd();
  if(options.testFolder) {
    shell.cd(options.testFolder);
  }
  const mergeBase = shell.exec(fixCaretsInWindows(`git merge-base HEAD^1 HEAD^2`)).stdout.trimEnd();
  const changes = shell.exec(fixCaretsInWindows(`git diff --name-only ${mergeBase} HEAD^2`)).stdout.split("\n");
  shell.cd(cd);

  for(let i = 0; i < tokens.length; i++) {
    for(let j = 0; j < changes.length; j++) {
      if(changes[j].startsWith(tokens[i])) {
        return 0;
      }
    }
  }

  return 1;
}

const fixCaretsInWindows = string => {
  if(process.platform.startsWith("win")) {
    string = string.replace(/\^/g, "^^");
  }
  return string;
}

module.exports = checkForChanges;
