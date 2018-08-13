# packages boilerplate
it directory structure is `${ROOT}/packages` boilerplate

## How to
```bash
# copy to template
$ cp -r boilerplate packages/${your-package-name}
$ vim package.json # edit your-package-name
$ yarn install
$ cd ${ROOT}
$ yarn lerna bootstrap
```
