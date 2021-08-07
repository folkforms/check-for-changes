# check-for-changes

Check if the current PR contains changes to certain files and folders, and run a command if so.

For example, we might want to only run `yarn test foo` when files in the `foo` folder are modified.

### Usage

    check-for-changes token1[, token2, ...] -c "command"

## Example

`yarn test foo` will be run if any of the changes begin with `foo`.

    check-for-changes foo -c "yarn test foo"

## Detailed example

         (main)
    x----y--------[z]
     \            /
      \          /
       a---b----c (feature)

`[z]` is a temporary merge commit created by Travis during the merge build.

Travis runs two builds, the PR build on commit `c (feature)` and the merge build on commit `[z]`.

Regardless of which branch `check-for-changes` is run on it will check the list of changes from `a` to `c` inclusive.
