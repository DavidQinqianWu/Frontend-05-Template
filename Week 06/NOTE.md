学习笔记

```
<MultiplicativeExpression>::=<Number>|
        <MultiplicativeExpression>*<Number>|
        <MultiplicativeExpression>"/"<Number>|

<AddtiveExpression>::= <MultiplicativeExpression>|"(" <AddtiveExpression>"+"<MultiplicativeExpression>")"|
<AddtiveExpression>"-"<MultiplicativeExpression>

```

# Object

对象是每一个是独立的

1. state
2. behavior
3. identifier

## 分类

## 归类

## 设计类的时候的注意重点:

1. 我们不应该受到语言的干扰
2. 在设计对象的状态和行为时候, 我们应该总是遵循"行为改变状态"的原则
   Function Object: [[call]] [[Construct]]
   Function.prototype.bind: [[call]] [[Construct]], [[HasInstance]]
   Function Instance : [[HasInstance]],[[Get]]
   Array Instance: [[DefineOwnProperty]]
   String Instance: [[GetOwnProperty]]
