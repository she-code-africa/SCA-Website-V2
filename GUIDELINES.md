# SCA Development Guideline

These are the set of guidelines we will ensure to adhere to during development. This is a living document and will be modified over time as it is deemed fit.

## Branches

We will be using [Gitflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow) for our main development process. Basically we have these branches:
* *master*: This is the central, most stable branch and no commit should be made directly to master except for production breaking hotfixes.
* *develop*: This is the branch primarily used during development (i.e. When any new features or changes need to be made during sprints, a new branch is created from the develop branch)
* *feature branches*: Based off the develop branch, feature branches are to be created for improvements or new features being developed in a sprint.
* *bugfix branches*: Bugfix branches are to be created to fix bugs in develop or in production (which weren't treated as an hotfix). Bugfix branches should be based off develop
* *task branches*: For content update, code cleanups, documentation, and the likes. Task branches should branch out from develop as well
* *release branches*: Release branches are created when development of a sprint is completed on the develop branch. The version which goes live on production is deployed from this branch and all fixes during tests should be made from here. The release branch should be merged to master when the version goes live on production. Every commit to this branch should be back merged to develop.
* *hotfix branches*: For production breaking changes, a new branch should be created off the master branch to fix the issue

### Branch Naming Convention

For consistency, this naming convention should be followed when naming/creating new branches

```issue_type/initials/issue_number-brief-description```

* issue_type: Depending on what type of issue it is i.e. feature, bugfix, task, hotfix
* initials: Initials of the branch creators name. E.g Someone named Blessing Doe will have their initials as 'bd'
* issue_number-brief-description: The issue number plus a brief description of the issue when possible


Following this convention, an example branch will be

```feature/yo/785-change-the-world```

Release branches will follow the naming convention

```release/major_version.minor_version```

An example release branch will be 'release/1.5' where 1 is the major version and 5 is the minor version

## Code Review and Pull Requests
* For any changes made or issue fixed, a pull request must be created
* Update your local branch and resolve conflicts before creating a PR
* Changes made should be properly tested before a PR is created
* Pull Requests (PRs) must have clear title and description 
* PR description should include a reference to the issue number
* Every team member should be added as a reviewer to any PR created
* No push/changes should be made directly to develop or master branch without going through a review process
* Everyone on the team is responsible for reviewing code and ensuring quality code standard
* Review process starts when the feature developer creates a merge request to the develop branch.
* For easier review, there should be individual branches per issue/task worked on.
* Consider making regular commits when working on your local branch
* Make use of good commit messages. A good commit message should explain the 'why' and not just the what.
[This article](https://chris.beams.io/posts/git-commit/) has more information on creating good commit messages

