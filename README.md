# Vue 的模板 OAO
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

[![Build Vue](https://github.com/allinu/OAO/actions/workflows/vue-page.yml/badge.svg)](https://github.com/allinu/OAO/actions/workflows/vue-page.yml)

---

- Vue 的学习项目，有很多不足，欢迎批评指正
- [效果查看](https://allinu.github.io/OAO/home)

---

## 项目介绍

Vue 的模板，初步构建了一个 Vue 的样式结构

## 使用方法

1. fork 本项目到自己的仓库
2. 然后 clone 自己仓库中的这个分支到本地
3. 然后执行

```shell
yarn
yarn serve

```
4. 最后根据自己的想法添加、更改或删除文件

## 彩蛋

在 `/love` 界面显示了一颗心

工作之余，请好好爱你所爱之人

如果你需要使用这个页面，请更改😊

## 注意事项

1. 在 `./public/404.html` 文件中需要更改

```html
<meta http-equiv="refresh" content="0;URL='https://allinu.github.io/OAO/'">
```
需要把里面的链接更改为你当前的连接，或者部署后的网址

2. 在 `./vue.config.js` 中需要更改

```js
module.exports = {
  publicPath: '/OAO/'
}

```

需要把 `'/OAO/'` 更该为你的路径
如果是 `http://www.xxx.com/`，则为 `/`
如果是 `http://xxx.github.io/OAO/`，则为 `/OAO/`

3. 在 `./.github/workflows/vue-page.yml` 中需要修改

```yml
    username: 'allinu'
    reponame: 'OAO'

```
需要将 `username` 以及 `reponame` 分别更改为你的 github 用户名和你的仓库名称

4. 在 `./src/components/Footer.vue` 中需要更改
```js
 author_mail: "xxxxxx@xxx.com",
```
需要把 email 更改为你的邮箱地址，当然你也可以直接删除

5. 在 `./src/router/index.js` 中需要修改

```js
router.beforeEach ((to, from, next) => {
  document.title = "OAO -" + to.matched [0].meta.title;
  next ();
});

```
修改上面的 `OAO` 为你的网站标题

## 配置选项

1. 首页中间的 logo 存储在 `src/components/CustomLogo.vue`
2. 导航栏存储在 `src/components/MenuBarBase.vue`，导航栏的 LOGO 也在这里，没有抽离出来，由此可见，我不会。
3. 在项目中我添加了一个全局可用的渐变色彩，`class` 名称为 `colorful`，可以直接使用。

## 最后的最后

我是一个新手，可能你使用后发现我的代码写的太烂，或者恨不规范，欢迎帮我改一下，当然也可以直接发邮件告诉我，或者提 issue，如果懒得理我，请删除，我在这里先对我的代码中可能让你崩溃的地方向你致歉。

本项目不能用于商用，我不负任何责任。

项目中为了学习交流，使用了锤子的字体，杨任东字体，在此感谢，但是没有经过许可。

项目中可能还有其他侵权地方，或者有其他的项目贡献，在此再次感谢，仅作为学习交流，如果侵害了您的权益，或者是不被允许的请与我联系，我将删除，谢谢

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://allinu.github.io/"><img src="https://avatars.githubusercontent.com/u/32992109?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Allinu</b></sub></a><br /><a href="#infra-allinu" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/allinu/OAO/commits?author=allinu" title="Tests">⚠️</a> <a href="https://github.com/allinu/OAO/commits?author=allinu" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
