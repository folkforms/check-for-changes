const shelljs = require("shelljs");

const createTestGitRepo = (folder, type, mainBranchChanges = 1, featureBranchChanges = 1) => {
  const cd = process.cwd();
  shelljs.rm("-rf", folder);
  shelljs.mkdir("-p", folder);
  shelljs.cd(folder);
  shelljs.exec("git init -q");
  shelljs.exec("echo i>i.txt && git add i.txt && git commit -qm \"Initial commit\"");
  shelljs.exec("git checkout -qb feature");
  for(let i = 0; i < featureBranchChanges; i++) {
    shelljs.exec(`echo f${i}>f${i}.txt && git add f${i}.txt && git commit -qm "Feature branch commit ${i}"`);
  }
  shelljs.exec("git checkout -q main");
  for(let i = 0; i < mainBranchChanges; i++) {
    shelljs.exec(`echo m${i}>m${i}.txt && git add m${i}.txt && git commit -qm "Main branch commit ${i}"`);
  }
  if(type === "merge-commit") {
    shelljs.exec("git merge -q feature main")
    shelljs.exec("git checkout -q main");
  } else {
    shelljs.exec("git checkout -q feature");
  }
  shelljs.cd(cd);
}

module.exports = createTestGitRepo;
