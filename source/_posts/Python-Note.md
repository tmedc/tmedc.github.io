---
title: Python Note
date: 2018-3-4 16:19:38
tags: [Python]
categories: [Programing Language]
---

## String

### 1. 字符串变量常用方法

1. "+" 用于连接两个字符串
2. `str.title()` 、`str.upper()`、 `str.lower()`  大小写 不改变原字符串
3. `str.strip()`、 `str.lstrip()`、 `str.rstrip()` 删除空格
4. `str.split()` 分割字符串
5. `str.find()` 查找子串，返回第一个索引  没有找到返回`-1`
6. `str.index()` 与find类似，找不到引发异常
7. `str.startswith()`  `str.endswith()` 返回bool值
8. `str.isdigit()`  检查是否由数字组成   `str.isalpha`检查是否由字母组成    `str.isalnum`检查是否由字母数字组成 返回bool值
9. `str.join(sequence)`   返回一个字符串，这个字符串是用`str`把sequence中元素连接起来。sequence必须是由字符元素组成的
10. `str.count('s')`  返回字符串中`s`字符的个数
11. 字符串也有切片  和 list切片用法一样  使用切片时的index使用方法和`range`的index使用方法一样

**注意:** 加()和不加()区别很大，不加时为python的内置函数名，加上才是调用函数，才会返回字符串的处理结果。

1. `ord(char)` 把char按照ASCII转化为integer;  对应的`chr(int)` 把integer转化为char

### 2. 数字变量常用方法

- `+` `-` `*` `/`
- `**`乘方、 `//`取整、 `%`取余 
- `&` `|` `^` `~`  按位与  按位或 按位异或  按位取反  `<<` `>>` 左移  右移
- `int(str, 2)`   输入为字符串，第二个参数为输入字符串采用的进制，默认为10；输出为10进制integer
- `int(float)`  可以直接向下取整；`round(float)`  四舍五入取整；`math.ceil(float)` 向上取整
- `bin(int)`  输入为integer(不一定是10进制)， 输出为二进制形式的字符串，以`0b`开头
- `oct(int)`  输入为integer(不一定是10进制)， 输出为八进制形式的字符串，以`0o`开头
- `hex(int)`  输入为integer(不一定是10进制)， 输出为十六进制形式的字符串，以`0x`开头





------

## List & Tuple

### 1. 列表

- 列表的访问     `list[index]`
- 添加    `list.append(value)`     合并另外一个list `list.extend(list1)`  
- 插入    `list.insert(index, value)`
- 彻底删除   `del list[index]`   不返回删除值
- 弹出        `list.pop(index/null)`  返回删除值
- 删除第一个确定值 `list.remove(value)`  存在多个时，只删除一个；不返回删除值，返回None
- 永久排序 `list.sort(null/ reverse=Ture)` 在原有list上直接修改。对于字符串列表默认排序方式是按字母表，`list.sort(key=len)` 可以按照字符串长度排序
- 临时排序 `sorted(list)`  返回一个新的list 并不会改变原有list。附加参数和`list.sort()`一样，可以加reverse，可以加key
- 反转列表列表顺序  `list.reverse()`
- 列表长度 `len(list)`
- 列表的遍历 `for`



- 带索引的循环 `for i, value in enumerate(listname)`，  `enumerate` 会把list变为索引-元素对



### 2. 数值列表

- `range(start_int, end_int+1, step_int)` 配合 `for` 循环生成需要的数值列表

  **注意：**`setp_int` 可以是负数 例如`range(5, 0, -1)` 转为list后为5 4 3 2 1 

  **再注意：** 当`step_int` 是负数的时候，前边两个必须是从大到小的；是正数的时候，前部两个必须是从小到大的，否则就会出来个寂寞，就是说会出来个屁，就是说会出来空的

  **再再注意：** 使用切片的时候，上面的规则都是一样一样的

- `list()` 可以把`range()` 强制转换为列表

- `min(list)` `max(list)` `sum(list)`

- 列表解析 `list = [f(value) for value in range()]`

- 切片 `list[start_index : end_index+1]` 用于复制列表



### 3. 元组tuple

- 一般用于在整个程序周期内不变的列表，比列表简单，不能修改元素，可以重新对整个元组赋值



------

## Dictionary & Set

### 1. 字典

**注意** dictionary的key必须是不可变对象，像list这种就不能作为key  

- 字典的定义：`dictionary = {'key1':value, 'key2', value}`
- 字典的访问：字典名+['键名']
- 添加与修改：字典名+['键名'] = 值
- 一次性添加多个：`dict.update(key1=value1, key2=value2)`  没有那么好用，key_name最好是字符串，而且不用带`""`
- 元素的删除： `del dicitonary['key']` 
- 字典键-值对的排列顺序和添加顺序无关不同， 也不关心，只关心对应关系
- 字典的遍历：
  1. `for key, v in dictionary.items()`，`items()`方法返回字典的键值对列表  
  2. `for key in dictionary.keys()`，`keys()`方法返回字典的键列表；不使用任何方法时，默认遍历键 
  3. `for value in dictionary.values()`，`values()`方法返回字典的值列表，提取出所有的值，会重复，用`set()`剔除重复项
- 字典的一些方法：
  1. ` in` 判断key是否存在于dictionary中，
  2. `dict.get('key_name', -1)` dictionary提供了get方法，判断key是否存在于dictionary中，不存在时返回`None`,  可以自己指定返回值， 此例中指定为-1， 如果返回None就可以的话 省略第二个参数即可
  3. `dict.pop(key_name)`  删除一个key，同时删除对应的value。和get方法一样可以加默认值，不存在时就返回该默认值，否则就会生成Key Error
  4. `dict.popitem()` 删除并返回一对键值对，字典为空的时候会引发 Key Error；删除的顺序可能比较随机
  5. `dict.clear()` 清空字典

**和list对比：** 查找和插入极快且为O(1)时间复杂度，但是需要占用大量内存 ；list特性与之相反

### 2. 字典列表

- 以字典作为列表的元素，可以使用切片修改列表中的字典。

**注意：** 列表使用切片后，若在等号右侧，则会直接改变原列表  (这一条我已经看不懂了...可能是在循环中修改列表时，不能直接`for i in list` 需要 `for i in list[:]` 可能是这样吧，好像也不对... 2018.5.3注)

### 3. 字典中嵌套列表

- 用列表作为字典的值，来实现一个键对应多个值
  **注意：** 字典和列表的嵌套等级不应该太多

### 4. 字典中嵌套字典

- 这样会使代码变得复杂，尽量保证内部字典中键值一致

### 5. 集合

- set 和 dictionary 类似，也是一组key的集合，但是不存储value。由于key不能重复，所以在set中没有重复的key。

  **注意**  set和dictionary的唯一区别在于set没有存储value，二者的原理是一样的，都不能放入可变对象(因为无法判断两个可变对象是否相等，无法保证没有重复元素)

  **再注意**  tuple作为不可变对象，当tuple中不包含不可变对象时，可以做key，否则不行。例如`(1, 2)`可以，`(1, [1, 2])`不可以

- set的创建：需要提供一个list或者string(生成的set元素会是单个字符)作为输入，例如`s = set([1, 2, 3])`  或者`s = {1, 2, 3}`      **注意: 集合是无序的 也无法使用数字索引** 

- set的方法：

  `set1.add(key)`  添加元素

  `set1.update(list)`   一次性添加多个元素

  `set1.pop()`  删除并返回一个元素，有一定随机性；若set1为空，则引发Key Error

  `set1.remove(key)`  删除元素 如果不存在会引发Key Error；`set1.discard(key)`  如果存在就会删除

  `set1.clear()`  清空set

  `set1 & set2`  取交集

  `set1 | set2`  取并集

  `set1 - set2`  取差集： 在set1中不在set2 中

  `set1 ^ set2`  对称差集：在set1 或set2 中 ，但不会同时出现在两者中（即，两者各自特有的元素） 

  `set1 <= set2`  判断set1 是否为 set2 的子集

  `set1 >=set2`  判断set1 是否为 set2 的超集

  `len(set1)`  set1的长度

  `x in set1`  `x not in set1`



## None & False      Is & `==`

- 在python中 `None`,  `False`, 空字符串`""`, `0`, 空列表`[]`, 空字典`{}`, 空元组`() `都相当于False 



## if & for & while

### 1. if语句的使用

- `and`、`or` 连接表达式时无需括号 
- `in`、`not in` 用于判断列表中是否有该元素
- 可以适当使用`elif`来代替`else`
- `if-elif-else` 用来执行一个代码块，多个并列`if`用来执行多个代码块
- 把列表名用在`if`语句中时，若列表为空，返回`False`，否则为`True`

### 2. While循环

- While循环中如果存在多个条件，程序才可以执行，可以设置标志，仅对标志进行判断即可
- `break`和`continue`的区别  
- `for`循环适用于遍历列表，而`while`循环适合修改列表

### 3. for-else & while-else

- 当for 或者 while代码块被完整执行时， else块才会被执行

- 用途：

  1. 在循环结束仍为找到目标值时， 生成错误：

     ```python
     for i in range(5):
     	if i == 5:
     		break
     else:
     	print('not find 5')
     ```

  2. 用于跳出多层循环（也可以写成函数，使用`return`跳出多层循环）

     ```python
     for condition1:
         for condition2:
             if condition3:
                 do something
             else:
                 break
         else:
             continue
         break
     ```

     也就是说在多层循环中，最内层的`break`是无法跳出外层循环的。如果要跳出外层循环，必须对外层循环的每一层都加上以下代码：

     ```python
     for ...
     	...
     else:
     	continue
     break
     ```


## Input & Output

### 1. 用户输入

- `input()`函数得到的输入默认情况下是字符串，如果需要使用数字，需要类型转换



## Function & Module

### 1. 函数

- 实参的传递方式包括：位置实参、关键字实参、默认值
- 一个函数尽量完成一个工作
- 传递任意数量的实参时，在函数定义中使用 `*name` ，其中`name` 是一个空元组tuple
- 传递任意数量的关键字实参时，在定义函数中使用 `**name` ，其中`name`是一个空的字典

### 2. 模块

- 模块就是一个包含代码块的独立文件，可以`import file_name`导入，注意不包含文件后缀名
- 使用模块内函数的格式为`module_name.function_name()`
- 只导入函数的格式为`from module import function`
- 导入所有函数`from module import *` 不推荐这样使用，可能引起函数名或变量名的冲突

### 3. 函数和模块的格式

- 函数和模块命名使用小写字母和下划线，要有意义
- 函数定义后要紧跟文档字符串，描述函数名称、实参、返回值
- 函数括号中`=`两侧不加空格，形参、实参都是如此
- 使用两个空行分割相邻函数
- 函数定义行需要换行时，下一行使用两个tab缩进



## Variable & Class

### 1. 变量作用域

- 变量作用域包括`内置作用域`、`全局作用域`、`嵌套作用域`、`局部作用域`
- `gloabl`用于在局部函数中声明变量是全局变量，将会在全局作用域中搜索改变量，如果没有搜到则在生成该变量时，把变量生成在全局作用域
- `nolocal`用于在局部函数中声明变量是嵌套作用域的变量，用法和`gloabl`一致

### 2. 类

- 通常类的首字母大写，实例则是小写的
- 为类设置默认属性，不需要在定义中列出形参
- 修改属性时，可以直接访问实例属性进行修改、添加可以修改属性的方法
- 子类定义：  

```
class name(super_name)
    def __inti__(self, params..)
        super().__inti__(params..)
```

- 子类中定义同名函数可以覆盖父类函数
- 对象可以作为类中属性
- 导入模块中类的方式和导入模块中函数的方法类似。需要导入模块中多个类时，最好直接导入整个模块。
- 类的命名使用驼峰法，首字母大写，不加下划线。对象实例和模块名都是用小写格式
- 类中一个空行分隔方法。两个空行分隔类
- 先导入标准库，空一行再导入自己的模块



## Open File & Close File

### 1. 读取文件

- 打开文件：  不适用文件后会自动关闭，不需要手动调用`close()`

```
with open('file_name') as file_obj:
    pass
```

- 读取整个文件：`file_obj.read()` 该方法返回字符串，并且在结尾多一个空字符。
- 逐行读取文件：

```
with open('file_name') as file_obj:
    for line in file_obj:
        pass
```

- 将文件内容存在列表中：

```
with open('file_name') as file_obj:
    lines = file_obj.readlines()
```

### 2. 写入文件

- 在`open()` 函数中添加额外的参数，默认只读  
  `w` 写入模式，会先清空原有内容  
  `r` 读取模式  
  `a` 附加模式  
  `r+` 读取写入模式
- 使用`file_obj.write('str')`方法写入字符串，注意只能写入字符串格式



## Try - Except - Else

### 1. 处理异常

- 使用`try-except-else`处理异常：  

```
try:
    the codes may have bugs
except Error_name:
    do when codes have bugs
else:
    do when codes have no bugs
```

- 处理异常的优势在于可以使程序出错之后继续运行，同时反馈的是可控的内容，而不是traceback



## Save Data with json

### 1. 存储数据

- 使用json来存储数据：  

```
import json
json.dump(data, file_obj)
json.load(file_obj)
```

## Refactoring

### 1. 代码重构

- 代码重构就是把一个复杂函数的功能提取出来，分别用功能更加具体的函数实现



## Test

### 1. 测试

- 测试代码的格式：  

```
import unittest
from your_file import your_function
class YourFunTest(unittest.TestCase):
    """必须继承unittest.TestCase"""

    def test_your_func(self):
        """必须以test开头"""
        result =  your_funciton(param)
        self.assertEqual(result, expected result)

unittest.main()
```

- 测试类：  
  测试类的格式和测试普通函数的格式类似，可以使用  

```
def setUp(self):
    """在这里创建一个被测实例，以及测试所需的其他数据，供整个类调用"""
    pass
```

- unittest中其他断言方法：  
  ```assertEqual(a, b)```  
  ```assertNotEqual(a, b)```  
  ```assertIn(item, list)```  
  ```assertNotIn(item, list)```  
  ```assertTrue(x)```  
  ```assertFalse(x)```



## 项目实践

### 1.项目规划

- 开发大型项目时，先做好规划十分重要，要分析最终需求，并把需求按阶段划分、实现

### 2.技巧

- for循环中不能修改列表，需要在其中修改列表时，可以使用列表副本设置循环，在循环内  
  修改原列表
- 在python中将输出写入终端花费时间很长，甚至超过在游戏窗口绘制图形







# python学习中发现的坑

## 函数对传过来的实参处理方式

- 如果传过来的实参是一个变量，那么运行函数不能修改原变量
- 如果传过来的实参是一个对象，那么运行函数会修改原对象





# python进阶

## 高级特性

### 列表生成式 List Comprehensions

- 可以把`for`和`if`语句写到列表生成语句中

```
alist = [x * x for x in range(0, 5) if x % 2 ==0]
```

### 生成器 Generator

- 和列表生成式相比把`[]`改成`()`

```
g = (x * x for x in range(0, 5))
```

- 如果要生成generator的下一个值，需要调用`next(g)`或者使用`for`循环
- 如果在一个函数中，把`return`变成了`yield`，函数就不再是一个普通函数，而是一个generator
- generator在执行时，遇到`yield`就会返回，下次执行从此处继续开始

### 迭代器  Iterator

- 凡是可以作用于`for`循环的都是`iterable`
- 凡是可以作用于`next()`的都是`iterator`
- 集合数据类型如`list`、`dict`、`str`、等是`iterable`不是`iterator`，可以通过`iter()`获得一个`iterator`对象

## 函数式编程

### 高阶函数 High-order-function

- 变量可以指向函数，函数名本身也是变量
- 将函数作为参数的函数叫做高阶函数
- `map()`传入一个函数、一个`iterable`，返回一个`iterator`，对`iterable`中每一个元素用函数进行处理
- `reduce()`传入参数和`map`类似，但是函数需要两个参数，其运行结果为`f(f(x1, x2), x3)...`
- `filter()`传入的参数和`map`类似，函数依次作用于序列中元素，根据返回的布尔值决定是否保留改元素，实现筛选功能。同样返回`iterator`
- `sorted()`也是一个高阶函数，可以传入`key=fun`函数实现自定义的排序，可以传入`reverse=True`实现反序

### 返回函数

- 将函数作为返回值的函数。在外部函数体内定义一个内部函数，并将其作为返回值返回
- 多次调用同一返回函数，返回的函数是不同的，即时调用时传入的参数一致
- **闭包Closure** 就是指内部函数可以引用外部函数的参数和局部变量
- 返回的函数不会立即执行，当再次被调用时，才会执行
- 正是由于返回的函数不会立即执行，所以在返回闭包时**返回函数不要引用任何循环变量或者后续会变化的变量**。一定要引用循环变量时，需要再创建一个函数，使其绑定变量当前值。

### 匿名函数

- `lambda x, y: x * y`
- 匿名函数没有函数名无需担心函数名冲突，同时匿名函数也是一个函数对象，可以赋值给变量，或者作为函数的参数、返回值

### 装饰器 Decorator

- 本质上`Decorator`是一个返回函数的高阶函数，当需要增强函数功能又不想修改函数定义时使用
- 使用Python的@语法，`@decorator_name`放在被装饰的函数定义前一行
- 传入参数的Decorator：需要编写一个返回Decorator的高阶函数
- 为了保证原始函数的`__name__`属性不被改变，需要在最内层的Decorator中第一行添加如下代码：

```
import functools
--snip--
@functools.wraps(func)
```

### 偏函数 Partial function

- 当函数参数太多时，使用`functools.partial`可以建立一个新的函数，固定部分参数，在调用时更简单
- 创建偏函数时，可以接收函数对象、`*args`、`**kw`这3个参数

### 传递可变参数

- `*args`表示可以接收非关键字参数，即`tuple`类
- `**kw`表示可以接收关键字参数，即`dict`类



