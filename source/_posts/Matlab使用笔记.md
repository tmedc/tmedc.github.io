---
title: Matlab使用笔记
date: 2017-10-18 21:26:12
tags: [Matlab]
categories: [Programing Language]
---





#### 自动对齐
全选之后，使用`ctrl+i` 可以自动对齐代码块 

#### figure窗口最大化
	    figure;
	    set(gcf,'outerposition',get(0,'screensize'));

#### 文件打开对话框函数uigetfile
	    [fname, fpath] = uigetfile(...
	     				     {'*.txt', '*.*'}, ...
	      				     'Pick a file');
		a = load(fullfile(fpath, fname));

#### 数据太长转下行
一行末尾加`...`即可敲回车换行后继续输入本行内容