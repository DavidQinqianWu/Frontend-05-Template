# flex 分行原理

1. 根据主轴尺寸进行分行

-   如果设置了 no-wrap 则强行分配进第一行, 反之如果没有设置, 则能塞进就塞进,不能就换行,并记录下上一行剩余了多少
-   如果是一行,则拿到那个最大 max flex 元素 height 的最高值
-   如果放进去了, 那么要对所有的 flex 元素 进行等比压缩
-   根据 main space, 这个根据设置的时候, 进行比例划分, 在这是 main Start 和 main end
-   根据 `justifyContent`去调整 currentMain, 也就是当前在 main 轴上的位置

2. 分析交叉轴

-   检测如果已经插入了那么多的 flex element, 看是否 flex element 是否沾满了空间
-   检测是否有其他的设置, 如 'wrap-reverse', 等等去处理 crossBase
-   遍历每一个元素, 去决定 每个元素的 交叉轴尺寸
    > 根据每一行中最大元素尺寸计算行高, 根据 flex-align 和 item-align 确定元素具体位置

# 绘制功能
