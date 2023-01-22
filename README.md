# vue-toy-proj

This template should help get you started developing with Vue 3 in Vite.

## Topics covered

- slots
- props
- Teleport component
- v-model on components
- custom directives
- animations
- dynamic components
- deployment to gh-pages

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### How to deploy to gh-pages

```sh
# go to vite.config.js file and set base to your repo name
 export default defineConfig({
  base: '/YOUR_REPO_NAME',
  ...
})
# run the build command
npm run build
# you need to make sure git knows about your dist folder (since its in .gitignore by default)
# so we use the -f flag to force git into recognizing the folder for this specific commit
# IMPORTANT NOTE: The -f flag can dangerous and cause major damage, so you should only use it in this specific scenario. 
git add dist -f
git commit -m "Initial dist subtree commit"
# use subtree push to send it to the gh-pages branch on GitHub
git subtree push --prefix dist origin gh-pages

# Boom. If your folder isn’t called dist, then you’ll need to change that in each of the commands above.
# source: https://gist.github.com/cobyism/4730490
```
