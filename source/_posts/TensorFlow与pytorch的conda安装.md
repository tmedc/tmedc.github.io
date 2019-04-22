---
title: 最简洁的TensorFlow与pytorch的conda安装
date: 2019-04-22 09:11:19
tags: [TensorFlow,pytorch]
categories: [Environment Configuration]
---

## 1.安装NVIDIA显卡驱动

介绍两种方法：

1.官网下载驱动文件，手动安装

去NVIDIA官网下载安装包，选择适配自己硬件的版本，然后本地安装（运行下载的runfile文件，运行时需要一些额外的参数，以及一些其他的操作）

https://www.nvidia.com/Download/index.aspx?lang=en-us

注意：使用该方法在安装显卡驱动过程中，可能存在一些问题，我尝试几次之后还是失败

2.PPA源安装

方法十分简便，添加ppa源后，在system settings -> Software & Updates -> Additional Drivers 中选择相应驱动即可。（据传该方法未必会有最新驱动，或者可能遇到问题，我运气比较好成功安装了）

添加ppa源的命令如下:

```shell
sudo add-apt-repository ppa:xorg-edgers/ppa #添加ppa源
sudo add-apt-repository ppa:graphics-drivers/ppa #添加ppa源
sudo apt-get update #更新apt-get
```

## 2. 安装CUDA和cuDNN

1.安装CUDA

- 下载对应版本的安装包 https://developer.nvidia.com/cuda-downloads

- 关闭图形界面`sudo service lightdm stop`

- 在命令行模式下登陆，进入下载的CUDA runfile目录 `sudo sh cuda_8.0.44_linux.run`

- 按照指示进行安装，大部分按照默认选项即可，在安装过程中关于`Install NVIDIA Accelerated Graphics Driver for Linux-x86_64 361.62?
  (y)es/(n)o/(q)uit: `问题的选择，我个人在安装过程中选择了n，在第一次选择y的尝试中，后面出现了无法进入图形界面的问题
- 打开图形界面`sudo service lightdm start` 回到图形界面，并把CUDA路径添加到环境变量（可自行Google，不再赘述）

2.安装CuDNN

- 下载CuDNNhttps://developer.nvidia.com/rdp/cudnn-download（需要注册账号）

- 下载对应版本和系统的cuDNN Library，得到tgz文件，解压后得到cuda目录，复制到CUDA安装目录中

  ```
  sudo cp cuda/include/cudnn.h /usr/local/cuda-10.0/include
  sudo cp cuda/lib64/libcudnn* /usr/local/cuda-10.0/lib64
  ```

## 3.conda 安装TensorFlow

- 执行命令`sudo conda install tensorflow-gpu==1.13.1`，自动安装即可

## 4.conda安装pytorch

- 执行命令`sudo conda install pytorch torchvision cudatoolkit=10.0 -c pytorch`，自动安装即可

安装完成后，可以导入TensorFlow和pytorch包检验是否正确安装