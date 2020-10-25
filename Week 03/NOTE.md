# 词法分析

## 正则

```javascript
// ()表示捕获
// ([0-9\.]+) 匹配 0-9 还有 . 的类型
// ([\t]+) 匹配所有的 空格
// ([\r\n]+) 匹配所有的换行回车
// 匹配 *
// 匹配 /
// 匹配 +
// 匹配 -
```

## generator 函数

> 异步代码同步化

## 利用递归

- 利用递归方法不断去寻找 MultiplicationExpression,
- 如果遇到 符号, 那么就合并, 然后生成出 MultiplicationExpression 然后再一次的去循环调取, 不断去合并, 最后只有 MultiplicationExpression 和最后的 EOF

## additiveExpression

- 一个单独的 乘法 也是特殊的加法, 所以在调用 additiveExpression 之前需要先调用下 MultiplicativeExpression

## MultiplicativeExpression

- push 三次, 第一次位置是合并之后的, 第二次的 push 是 中间的符号, 第三次 push 是符号右边的 number
