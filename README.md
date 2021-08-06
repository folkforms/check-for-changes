# check-for-changes

Used to run a command during a build but only if the feature branch being merged into main contains files in a given folder.

Usage:

    check-for-changes token1[, token2, ...]

Returns 0 if the current commit is a merge commit and its 2nd parent (i.e. the feature branch) contains any file that starts with any of the given tokens.
