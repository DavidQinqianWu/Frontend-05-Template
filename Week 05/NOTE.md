# Proxy

-   Proxy 代理,能够帮助我们了解到 js 内部运转机制
-   Proxy 可以去**拦截**或者**覆盖**我们原来已经的 js 内部的函数代码
-   有常用的: set, get, apply 等

> 需要注意的是如果我们一旦去改写覆盖默认的内置函数之后,我们需要考虑其他的默认函数会不会也受到影响

# 拖拽

1 普通的拖拽:

-   利用`eventListener`中的 mouseup mousemove mosedown 等等事件去监听,在利用我们 css3 中的 transform 中的 translate 属性去改变,从而变成拖拽的效果
-   注意点: 当 mousedown 的时候, mousemove 和 mouseon 事件监听应该放的是在 document 上

2 影响文档流中的拖拽

-   又一次的用到了 range, (这块可以复习下 toy React 中对 range 的使用 )
-   `getBoundingClientRect()` 这方法能够拿到我们创建 range 的位置(cssom)
-   `insertNode` 方法,如果要插入的元素在 dom 上已经有, 那么就会默认的把之前的删除, 然后在添加上

# CSSOM
