# Member expressions

-   a.b
-   a[b]
-   foo`string`
-   new.target
-   new Foo()

# call expression

-   call
    -   foo()
    -   left()
-   left expression, right expressions
-   update expression
-   unary expressions

> 只有 `**` 运算符是右结合, 在运算符当中

```
 3**2**3 // 是 2 先 进行 3 次方运算, 然后在做最左边的 3 的 8 次方
         // 相当于 3** (2**3)
```

# UnBoxing object 转成普通类型

-   ToPrimitive
-   toString vs valueOf
-   Symbol.toPrimitive

1. 如果遇到关于 数字的运算, 一定会先调用 `valueOf()`
2. 如果遇到关于 字符串的运算, 一定会先调用 `toString()`

# 声明

-   function 声明

```
function
function *
async function
async function *
var
```

-   新的变量声明

```
class
let
const

```

-   作用域
    在编写代码时候, 所确定的作用范围
