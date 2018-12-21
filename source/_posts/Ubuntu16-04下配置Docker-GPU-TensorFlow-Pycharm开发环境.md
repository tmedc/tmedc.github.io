---
title: Ubuntu16.04下配置Docker+GPU+TensorFlow+Pycharm开发环境
date: 2018-12-21 10:35:14
tags: [TF][Docker]
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

## 2. 安装Docker

同样有两种方式可以安装

1.ppa方式安装，但是速度太慢

https://docs.docker.com/install/linux/linux-postinstall/

按照提示操作即可

2.可以选择deb包安装，可以在清华镜像源下载

https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/

找到适合自己的版本后，需要依次安装 `container.io`、 `docker-ce-cli`、`docker-ce`

## 3.安装NVIDIA-docker

gtihub地址：https://github.com/NVIDIA/nvidia-docker

按照提示操作即可

## 4.pull TensorFlow Docker image

```
docker pull tensorflow/tensorflow                     # latest stable release
docker pull tensorflow/tensorflow:devel-gpu           # nightly dev release w/ GPU support
docker pull tensorflow/tensorflow:latest-gpu-jupyter  # latest release w/ GPU support and Jupyter
```
参考地址：https://www.tensorflow.org/install/docker

然后就可以run TensorFlow Docker image就可以了

## 5.配置Pycharm

完成上述操作后，可以在终端进行开发，为了在IDE中开发，需要使用Pycharm Professional（社区版没有Docker插件）

在Pycharm中需要完成以下操作：
- 提前准备工作：把用户添加到Docker用户组中：`sudo usermod -aG docker UserName`,如果不进行这一步，在后面Pycharm连接docker时会提示权限不够。
- “File -> Settings -> Build, Execution, Deployment -> Docker" 添加 Docker， 并选择”Unix Socket“
- “File -> Settings -> Project -> Project Interpreter" 添加新的Interpreter，选择 Docker类型，并选择对应的image
到此为止，已经成功添加Docker中的TensorFlow为解释器，但是此时如果运行，程序会提示无法找到脚本文件，下面要进行配置过程中最为关键的两步：
1.挂载host目录到container中：在“File -> Settings -> Project -> Project Interpreter"中， 添加“Path mapping”：“<Project root> -> /opt/project"
完成这一步后，运行代码，会提示无法找到`libcuda.so.1`的库，这是因为Pycharm默认使用的是`docker`而不是`nvidia-docker`，所以要进行下一步操作更改`nvidia-docker`为默认的docker
2.把`"default-runtime": "nvidia",`添加到`/etc/docker/daemon.json`文件中
```
{
    "default-runtime":"nvidia",
    "runtimes": {
        "nvidia": {
            "path": "nvidia-container-runtime",
            "runtimeArgs": []
        }
    }
}
```
然后要重启docker的守护进程：`sudo pkill -SIGHUP dockerd`,这样以来刚刚更改的配置就生效了，可以在Pycharm中正常run脚本了。

## 6.在TensorFlow image中导入新的库

在docker中，所有在container中进行的更改都不会影响image，所以如果想在image中导入新的库，需要在container中下载新的库之后，commit之后才能保存在image中，后续在继续更新具体操作方法