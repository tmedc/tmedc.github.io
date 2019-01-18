---
title: Python数字、字符串、字节串相互转换
date: 2019-01-02 10:37:57
tags: [Python]
categories: [Programing Language]
---
近期用到了一些有关Python字节串的内容，整理一下相关数据类型之间的转换方法。
### 一.整型数据向其他类型的转换

以下代码中a为int类型

1. 整型

   进制转换：转换后就变成了字符串！！！

   输出时进制转换：`print("%#x"%a)`  或者 `print("%#o"%a)`

2. 浮点型

   隐式转换

   或者`float(a)`

3. 字符串

   直接转换：`str(a)`

   改变进制：`hex(a`) ， `oct(a)`

   数字到单个ASCII字符转换：`chr(a)`

4. 字节串

   `bytes([a, a1, a2])`（解释：将需要转换的整型数字放入list中，再传给`bytes()`函数，如果直接将整型数字N传过去，会返回N个空字节。

   ```python
   # 10进制数组直接转换:
   bytes([1,2,3])  ==> b'\x01\x02\x03' 
   
   # 16进制数组直接转换:
   bytes([0x01,0x02,0x31,0x32])  ==>  b'\x01\x0212' 
   ```

   ----

   `a.to_bytes(len, byteorder='big'/'little', signed=True/False)`其中len为转换后的字节串长度

   ---

   ```python
   import struct
   struct.pack('B'/'<H'/'>H', a) # 第一个参数是格式字符串，指定了字节格式的长度，字节顺序等
   
   # 转为两个字节: 
   struct.pack('<HH', 1,2)  ==>  b'\x01\x00\x02\x00'
   
   # 转为四个字节:
   struct.pack('<LL', 1,2)  ==>  b'\x01\x00\x00\x00\x02\x00\x00\x00'
   ```


### 二、浮点型向其他类型的转换

以下代码中f为float类型

1. 整型

   取整：`int(f)`

   四舍六入五成双：`round(f)` *注意:* `round()`函数可以接收第二个参数调整舍入的位置，默认为1，如果是-1则舍入十位，如果是2则舍入百分位

2. 字符串

   `str(f)`



### 三、字符串向其他类型的转换

以下代码中s为字符串类型

1. 整型

   十进制字符串转为int：`int(s)`

   N进制字符串转为int：`int(s, N)`

   二进制字符串转为int：`int(s, 2)`

   八进制字符串转为int：`int(s,8)`

   十六进制字符串转为int：`int(s, 16)`

​	单个字符转换为ASCII序号：`ord(s)`

2. 浮点型

   `float(s)`

3. 字节串

在这里先介绍在Python3中`str`和`bytes`类型的区别，两种类型都用来表示字符序列，`str`包含的是Unicode字符，`bytes`包含的是原始的8位值。从原始二进制数据到Unicode（或者任意一种编码方式）字符的过程叫做decode，从字符到二进制数据的过程叫做encode。

```python
# 普通字符串encode方式:
'123abc'.encode('ascii') ==> b'123abc' 

 # 16进制字符串转换方式:
bytes().fromhex('010210') ==> b'\x01\x02\x10'

# 16进制字符串先转换为int再转为字节串:
bytes(map(ord, '\x01\x02\x31\x32'))  ==>  b'\x01\x0212' 

```


### 四、字节串向其他类型的转换

以下代码中b为字节串类型

1. 整型

   ```python
   import struct
   
   # 转义为short型整数: 
   struct.unpack('<hh', bytes(b'\x01\x00\x00\x00'))  ==>  (1, 0)
   struct.unpack('<hh', b'\x01\x00\x00\x00')  ==>  (1, 0)
   
   # 转义为long型整数: 
   struct.unpack('<L', bytes(b'\x01\x00\x00\x00'))  ==>  (1,)
   ```

2. 字符串

   ```python
   # 字节码解码为字符串:
   bytes(b'\x31\x32\x61\x62').decode('ascii')  ==>  12ab
   
   # 字节串转为16进制字符串数组
   [hex(x) for x in bytes(b'\x01\x0212')]  ==>  ['0x1', '0x2', '0x31', '0x32']
   ```

### 附：字节数组

字节串和字符串一样是不可变序列，字节数组就是可变版本的字节，类似与`list`与`tuple`

```python
bytearray(b'hello')  ==> bytearray(b'hello')

bytearray()  ==> bytearray(b'')

bytearray([1,2,3]) ==> bytearray(b'\x01\x02\x03')

bytearray('runoob', 'utf-8') ==> bytearray(b'runoob')
```

