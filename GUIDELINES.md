# SCA Development Guideline

These are the set of guidelines we will ensure to adhere to during development. This is a living document and will be modified over time as it is deemed fit.

## Process

We will be using [Gitflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow) as our main development process. Basically we have these branches:
* *master*: This is the central, most stable branch and no commit should be made directly to master except for production breaking hotfixes.
* *develop*: This is the branch primarily used during development (i.e. When any changes need to be made during development, the feature branch should )
* *feature branches* For each issue/task, a new feature branch shall be created and shall be based off the develop branch.
* *release branches*: Release branches are created when development of a sprint is completed on the develop branch. The version which goes live on production is deployed from this branch and all fixes during tests should be made from here. The release branch should be merged to master when the version goes live on production. Every commit to this branch should be back merged to develop.
* *hotfix branches*: For production breaking changes, a new branch should be created off the master branch to fix the issue

### Reviews and Pull Requests
* For any changes made or issue fixed, a pull request must be created
* No commits shall be made directly to any branch without first going through a review process
* Everyone on the team is responsible for reviewing code and ensuring quality code standard
* Review process starts when the feature developer creates a merge request to the develop branch.
* For easier review, there should be individual branches per issue/task worked on. There should also be frequent commits locally with good commit message