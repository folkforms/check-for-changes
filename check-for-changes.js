const checkForChanges = (tokens, shell, options = {}) => {
  if(!tokens || tokens.length == 0) {
    console.log("ERROR: You must supply some files or folders to check for.");
    return 1;
  }

  const mainBranch = options.mainBranch || "main";

  const cd = process.cwd();
  if(options.testFolder) {
    shell.cd(options.testFolder);
  }
  const currentBranch = getBranch(shell);

  let mergeBase, changes;
  if(currentBranch === mainBranch) {
    // If we are on 'main' get the commits from the 2nd parent of this merge commit, i.e. the commits on the feature branch
    mergeBase = shell.exec(fixCaretsInWindows(`git merge-base HEAD^1 HEAD^2`)).stdout.trimEnd();
    changes = shell.exec(fixCaretsInWindows(`git diff --name-only ${mergeBase} HEAD^2`)).stdout.split("\n");
  } else {
    // If we are on a feature branch get the commits on this branch
    mergeBase = shell.exec(fixCaretsInWindows(`git merge-base ${mainBranch} HEAD`)).stdout.trimEnd();
    changes = shell.exec(fixCaretsInWindows(`git diff --name-only ${mergeBase} HEAD`)).stdout.split("\n");
  }
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

const getBranch = shell => {
  const branch = shell.exec(`git symbolic-ref --short -q HEAD`).stdout;
  return branch.substring(0, branch.length - 1);
}

module.exports = checkForChanges;
