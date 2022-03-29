This is an [e2e testing project example](https://github.com/imranwijaya/cypress.testing.example) for [cypress.testing.abangkito.com website](https://cypress.testing.abangkito.com) using [`Cypress.io`](https://www.cypress.io/).

## Getting Started

> The recommended approach is to install Cypress with npm because :
> - Cypress is versioned like any other dependency.
> - It simplifies running Cypress in [Continuous Integration](https://docs.cypress.io/guides/continuous-integration/introduction).

First, clone the [repository](https://github.com/imranwijaya/cypress.testing.example) & install the dependencies:

```bash
#clone github repository
git clone https://github.com/imranwijaya/cypress.testing.example.git

#after successful clone
npm run install
```

Open cypress with following command:
```bash
npm run cypress:open
```

## Learn More

To learn more about Cypress.io, take a look at the following resources:
- [Cypress documentation](https://docs.cypress.io/)
- [Learn how it works](https://www.cypress.io/how-it-works)

## Git
```bash
#init git
git init

#Add all files to Git index
git add . # or git add -A

#Commit Added Files
git commit -m 'Commit Message'

#Add new remote origin (in this case, GitHub)
git remote add origin git@github.com:imranwijaya/cypress.testing.example.git

#Push to GitHub
git push -u -f origin master

#All together
git init
git add . # or git add -A
git commit -m 'Commit Message'
git remote add origin git@github.com:imranwijaya/cypress.testing.example.git
git push -u -f origin master

#Check remote first to see where it is pointing to by
$ git remote -v

#Change the pointing to GitHub
$ git remote set-url origin git@github.com:imranwijaya/cypress.testing.example.git
```