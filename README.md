# 共享农机 概览

名称：共享农机（ShareNJ）

简介：农机发布和交易平台商城

技术栈：后端 SpringBoot + 前端 Umi.js

功能：类似于商城 + 公告栏，提供用户侧、商家侧、配送员侧、管理员侧，共4种用户

类型：前后端应用，WebApp，外包项目

## 功能介绍

用户侧：可发布需求，浏览商品，购买商品，下单结算等操作；

商家侧：可发布商品，修改订单状态；

配送员侧：可接收配送任务获得佣金；

管理员：可对所有实体进行增删改查，并监控全局所有数据状态。

## 文件夹结构

### 后端 Backend

SharedNJ-Backend目录，标准maven项目，基于SpringBoot框架构建的后端。

### 前端 Frontend

SharedNJ-Frontend目录，标准的Webpack项目，基于umi.js脚手架，收敛了React、Redux、Ant Design等前端技术栈。

### 数据库表结构

数据库表结构目录，使用前请根据SpringBoot工程，正确配置MySQL数据库。

## 运行效果图

### 登录页

![0-登录页](https://cdn.jsdelivr.net/gh/yangxu770409504/assets@main/20210527/4-管理员.5ioqio4yovk0.jpg)

### 用户侧功能

![1-用户侧-用户中心](https://cdn.jsdelivr.net/gh/yangxu770409504/assets@main/20210527/1-用户侧-用户中心.rxmmzg70o28.jpg)

[^1-用户侧-用户中心]: 1-用户侧-用户中心

![1-用户侧-商品列表](https://cdn.jsdelivr.net/gh/yangxu770409504/assets@main/20210527/1-用户侧-商品列表.5v6iq6fo1ao0.jpg)

[^1-用户侧-商品列表]: 1-用户侧-商品列表

![1-用户侧-商品详情](https://cdn.jsdelivr.net/gh/yangxu770409504/assets@main/20210527/1-用户侧-商品详情.5pg1hdfde400.jpg)

[1-用户侧-商品详情]: 1-用户侧-商品详情

![1-用户侧-订单结算页](https://cdn.jsdelivr.net/gh/yangxu770409504/assets@main/20210527/1-用户侧-订单结算页.493u0v166940.jpg)

![1-用户侧-订单提交成功](https://cdn.jsdelivr.net/gh/yangxu770409504/assets@main/20210527/1-用户侧-订单提交成功.20mj3r601c80.jpg)

![1-用户侧-需求列表](https://cdn.jsdelivr.net/gh/yangxu770409504/assets@main/20210527/1-用户侧-需求列表.20vze92tknwg.jpg)

### 商家侧功能

![2-商家中心](https://cdn.jsdelivr.net/gh/yangxu770409504/assets@main/20210527/2-商家中心.4i46a24kl180.jpg)

![2-商家处理订单](https://cdn.jsdelivr.net/gh/yangxu770409504/assets@main/20210527/2-商家处理订单.7y912sobi9o.jpg)

### 配送员侧功能

![3-配送员中心](https://cdn.jsdelivr.net/gh/yangxu770409504/assets@main/20210527/3-配送员中心.5bl0x6u87ww0.jpg)

### 管理员侧功能

![4-管理员](https://cdn.jsdelivr.net/gh/yangxu770409504/assets@main/20210527/4-管理员.5ioqio4yovk0.jpg)

