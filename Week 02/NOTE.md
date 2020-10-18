# 学习笔记

- 如何 disable 右键点击
- localStorage
- eventListener: contextmenu
- e.which
- 删除数组中的某一个元素, 可以才用与最后一个位置的元素,被覆盖,然后把最后一位元素 pop 出去就可以了
- 上传完整代码,比较重要的感想,都写了 comment

```

<style>
  .cell {
    display: inline-block;
    line-height: 6px;
    width: 6px;
    height: 6px;
    background-color: gray;
    border-bottom: solid 1px white;
    border-right: solid 1px white;
    vertical-align: top;
  }
  #container {
    width: 701px;
  }
</style>
<div id="container"></div>
<button onclick="localStorage['map']=JSON.stringify(map)">save</button>
<script>
  class Sorted {
    constructor(data, compare) {
      this.data = data.slice();
      this.compare = compare || ((a, b) => a - b);
    }

    take() {
      if (!this.data.length) {
        return;
      }
      // 默认给与第一个
      let min = this.data[0];
      let minIndex = 0;
      // 拿到最小值
      for (let i = 1; i < this.data.length; i++) {
        if (this.compare(this.data[i], min) < 0) {
          min = this.data[i];
          minIndex = 1;
        }
      }
      // 这个方法是 O(1)
      // 把最后一个值复制到要被删除的的位置, 交换
      this.data[minIndex] = this.data[this.data.length - 1];
      // 然后删除
      this.data.pop();
      return min;
    }

    give(v) {
      this.data.push(v);
    }
    get length() {
      return this.data.length;
    }
  }

  let map = localStorage["map"]
    ? JSON.parse(localStorage["map"])
    : Array(10000).fill(0);
  let container = document.getElementById("container");
  for (let y = 0; y < 100; y++) {
    for (let x = 0; x < 100; x++) {
      let cell = document.createElement("div");
      cell.classList.add("cell");
      // 如果该数据被选中了那么就是黑色背景
      if (map[100 * y + x] === 1) {
        cell.style.backgroundColor = "black";
      }

      cell.addEventListener("mousemove", () => {
        if (mousedown) {
          if (clear) {
            cell.style.backgroundColor = "";
            map[100 * y + x] = 0;
          } else {
            cell.style.backgroundColor = "black";
            map[100 * y + x] = 1;
          }
        }
      });
      container.appendChild(cell);
    }
  }
  let mousedown = false;
  let clear = false;
  document.addEventListener("mousedown", (e) => {
    mousedown = true;
    clear = e.which === 3;
  });
  document.addEventListener("mouseup", () => (mousedown = false));
  document.addEventListener("contextmenu", (e) => e.preventDefault());

  function sleep(t) {
    return new Promise((resolve) => {
      setTimeout(resolve, t);
    });
  }

  async function findPath(map, start, end) {
    // map 和 table 数据不互相影响
    // table 里面记录的是前驱节点, 或 墙
    let table = Object.create(map);

    let queue = new Sorted([start], (a, b) => distance(a) - distance(b));

    // 在 insert 的时候, 记录是有当前那个节点去触发的这个 insert
    async function insert(x, y, pre) {
      // 如果已经到了边界,就返回
      if (x < 0 || x >= 100 || y < 0 || y >= 100) {
        return;
      }
      // 如果改 insert 的点已经被标记了前驱节点, 或者该点是一个墙
      if (table[y * 100 + x]) {
        console.log(table[y * 100 + x]);
        return;
      }

      // 如果以上两种都不是 , 那么说明该点可走, 把他标为绿色
      container.children[y * 100 + x].style.backgroundColor = "lightgreen";
      // 记录下这个点的前驱节点
      table[y * 100 + x] = pre;
      // 把这个点推入到queue, 作为下一步的起始点
      queue.give([x, y]);
    }

    function distance(point) {
      return (point[0] - end[0]) ** 2 + (point[1] - end[1]) ** 2;
    }

    while (queue.length) {
      let [x, y] = queue.take();
      console.log(x, y);
      // 如果找到终点了
      if (x === end[0] && y === end[1]) {
        let path = [];

        while (x !== start[0] || y !== start[1]) {
          // 这的 path 应该是从 map 里面取得值, 因为 map 里面存的 是所有有没有走过的值
          path.push(map[y * 100 + x]);
          // 拿到前驱记录节点, 这里应该从 table 里面取, 因为 table 里面记录的是 每个点的前驱节点
          [x, y] = table[y * 100 + x];
          await sleep(30);
          container.children[y * 100 + x].style.backgroundColor = "purple";
        }
        return path;
      }
      // 上下左右四个方向
      // 因为 insert async 方法里面有 sleep async 函数,是异步用的是 await(标记绿色背景格子).
      // 所以这里应该也是需要 await, 等待标记完成之后 ,在运行下一步的 await
      // 否则就会一下全执行,而 那个时候的 queue 由于有 sleep 函数, queue还是没有被 push,
      // 而此时的 while 已经开始进行下一个判断了,这个时候由于 queue 的 length 为 0, 会退出 while 循环, 不会进行下一次轮的 4 个 insert
      // 从而程序终止了, 且只进行了一轮的 4  个 insert , 是以开的是一轮, queue 里面是 [0,0] 的那一轮
      // 因此必须要 添加 await 一次等到 queue 被 push 了之后 才能进行一下次的运行

      await insert(x - 1, y, [x, y]);
      await insert(x, y - 1, [x, y]);
      await insert(x + 1, y, [x, y]);
      await insert(x, y + 1, [x, y]);

      // leftTop rightTop, leftBottom. rightBottom
      await insert(x - 1, y - 1, [x, y]);
      await insert(x + 1, y - 1, [x, y]);
      await insert(x + 1, y + 1, [x, y]);
      await insert(x - 1, y + 1, [x, y]);
    }
    return null;
  }
</script>



```
