class MyMap {
  public map: number[];
  public table: { [_: number]: Coordinate };
  public mousedown: boolean;
  public clear: boolean;
  public queue: Coordinate[];
  public container: HTMLElement;
  constructor() {
    // 先检查是是否有值已经存储了,并初始化
    this.map = localStorage["map"]
      ? JSON.parse(localStorage["map"])
      : Array(10000).fill(0);
    this.table = Object.create(this.map);
    this.mousedown = false;
    this.clear = false;
    this.queue = [];
    this.container = document.querySelector("#container")! as HTMLElement;
    document.addEventListener("mousedown", (e) => {
      console.log("e", e);
      this.mousedown = true;
      this.clear = e.which === 3;
    });
    document.addEventListener("mouseup", () => (this.mousedown = false));
    document.addEventListener("contextmenu", (e) => e.preventDefault());
  }
  // 做一个100*100这样的一个 格子;
  public initialMap() {
    // 首先检查我们的数据是否已经在localStorage里面存储额,如果没有存储,就生成新的
    // 如果存储了, 就从localStorage里面拿出来

    for (let y = 0; y < 100; y++) {
      for (let x = 0; x < 100; x++) {
        let cell = document.createElement("div");
        cell.classList.add("cell");
        // 数据驱动显示
        if (this.map[100 * y + x] == 1) {
          cell.style.backgroundColor = "black";
        }
        cell.addEventListener("mousemove", () => {
          if (this.mousedown) {
            if (this.clear) {
              cell.style.backgroundColor = "";
              this.map[100 * y + x] = 0;
            } else {
              cell.style.backgroundColor = "black";
              this.map[100 * y + x] = 1;
            }
          }
        });
        this.container.appendChild(cell);
      }
    }
  }

  public async findPath(start_: Coordinate, end_: Coordinate) {
    this.queue = [start_];
    while (this.queue.length) {
      let targetPoint = this.queue.shift()!;

      // 如果targetPoint的点已经和我们要找的终点是一样,就停止
      if (targetPoint.x === end_.x && targetPoint.y === end_.y) {
        let path: number[] = [];
        while (targetPoint.x != start_.x || targetPoint.y !== start_.y) {
          // 回溯到起点 只要targetPoint 不是起点
          path.push(this.map[targetPoint.y * 100 + targetPoint.x]);
          // 让 targetPoint  = table里面记录的点的pre点
          targetPoint = this.table[targetPoint.y * 100 + targetPoint.x];
          await this.sleep(30);
          (this.container.children[
            targetPoint.y * 100 + targetPoint.x
          ] as HTMLElement).style.backgroundColor = "red ";
          console.log(this.table);
        }
        return path;
      } else {
        // 继续查找,把周围的点都加入到队列当中
        const insertTop: Coordinate = {
          x: targetPoint.x,
          y: targetPoint.y - 1,
        };
        const insertLeft: Coordinate = {
          x: targetPoint.x - 1,
          y: targetPoint.y,
        };

        const insertRight: Coordinate = {
          x: targetPoint.x + 1,
          y: targetPoint.y,
        };
        const insertDown: Coordinate = {
          x: targetPoint.x,
          y: targetPoint.y + 1,
        };
        const insertTopLeft: Coordinate = {
          x: targetPoint.x - 1,
          y: targetPoint.y - 1,
        };
        const insertTopRight: Coordinate = {
          x: targetPoint.x + 1,
          y: targetPoint.y - 1,
        };
        const insertBottomLeft: Coordinate = {
          x: targetPoint.x - 1,
          y: targetPoint.y + 1,
        };
        const insertBottomRight: Coordinate = {
          x: targetPoint.x + 1,
          y: targetPoint.y + 1,
        };
        await this.insertCoordinate(insertLeft, targetPoint);
        await this.insertCoordinate(insertTop, targetPoint);
        await this.insertCoordinate(insertRight, targetPoint);
        await this.insertCoordinate(insertDown, targetPoint);
        await this.insertCoordinate(insertTopLeft, targetPoint);
        await this.insertCoordinate(insertTopRight, targetPoint);
        await this.insertCoordinate(insertBottomLeft, targetPoint);
        await this.insertCoordinate(insertBottomRight, targetPoint);
      }
    }
    return null;
  }

  private async insertCoordinate(
    coordinate_: Coordinate,
    previousCoordinate_: Coordinate
  ) {
    // 如果超过了边缘 那么就返回, 什么也不做
    if (
      coordinate_.x < 0 ||
      coordinate_.x >= 100 ||
      coordinate_.y < 0 ||
      coordinate_.y >= 100
    ) {
      return;
    }
    // 如果遇到了标记过的,那么也返回,什么也不做
    if (this.table[coordinate_.y * 100 + coordinate_.x]) {
      return;
    }
    (this.container.children[
      coordinate_.y * 100 + coordinate_.x
    ] as HTMLElement).style.backgroundColor = "lightgreen";
    // 记录下当前该点的 前驱点
    this.table[coordinate_.y * 100 + coordinate_.x] = previousCoordinate_;
    this.queue.push(coordinate_);
  }

  private sleep(ms_: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms_);
    });
  }
}

interface Coordinate {
  x: number;
  y: number;
}
