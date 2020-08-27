## xiaomi


### 版本管理工具 
用于管理软件源代码的工具
目前市面主流的 有两款版本管理工具  git svn
在现代编辑器中 都集成了版本管理工具的功能
git 分布式的版本管理工具
svn 集中式的版本管理工具

### git
Git（读音为/gɪt/）是一个开源的分布式版本控制系统，可以有效、高速地处理从很小到非常大的项目版本管理。
Git 是 Linus Torvalds 为了帮助管理 Linux 内核开发而开发的一个开放源码的版本控制软件。

官网 https://git-scm.com/
跨平台(可以运行在不同的操作系统 linux unix windows osx)


### github
https://github.com/
git 和 github  没有关系
github 是一个网站
github 是全球最大的IT社区

它提供了 免费的 git 仓库服务
免费的条件是   开源
私有仓库       收费

开源大法好
jQuery
bootstrap
Vue
React
Angular
ElementUI
...

2018年10月 微软收购了github
github 私有仓库 免费

### git操作
首先创建项目目录 
在项目根目录下创建 文件
README.md    项目说明文件
.gitignore   git忽略列表
gitignore每行写一个目录或文件 表示不需要git管理的内容


### 项目初始化
```bash
$ git init     # 初始化一个git仓库
$ npm init -y  # 初始化node项目
```

### 用户设置
```bash
# 用户设置 每台电脑只需要一次
$ git config --global user.name "Zhang Jun"
$ git config --global user.email "root@rootbk.cn"
```

### 常用命令
```bash
# 查看状态
$ git status

# 添加管理(添加到暂存区)
$ git add filename     # 添加指定文件
$ git add path/        # 添加指定目录
$ git add .            # 添加项目中所有文件和目录

# 从暂存区中移除(不管理)
$ git rm --cached filename

# 提交到本地仓库
$ git commit -m "v 1.0.0"

# 查看提交记录
$ git log

# 回复到历史提交版本
$ git reset --hard hash(前6位)

# 查看帮助
$ git --help
```