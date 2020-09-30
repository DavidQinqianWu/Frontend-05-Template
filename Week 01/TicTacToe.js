let border = document.getElementById("border");
let borderData = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];
let color = 1;
function show(borderData) {
  border.innerHTML = "";
  for (let i = 0; i < borderData.length; i++) {
    let eachLine = borderData[i];
    for (let j = 0; j < eachLine.length; j++) {
      let cell = document.createElement("div");
      cell.classList.add("cell");
      cell.innerText =
        borderData[i][j] == 2 ? "X" : borderData[i][j] == 1 ? "O" : "";
      cell.addEventListener("click", () => move(i, j));
      border.appendChild(cell);
    }
    border.appendChild(document.createElement("br"));
  }
}

function move(i, j) {
  borderData[i][j] = color;
  if (check(borderData, color)) {
    alert(color === 2 ? "X is winner" : " O is winner");
  }
  color = 3 - color;
  show(borderData);
  // 自动检查是否要取胜
  console.log(bestChoice(borderData, color));
}

function clone(data) {
  return JSON.parse(JSON.stringify(data));
}

// 检查下一步对方会不会赢, 如果对方会赢的话, 就生成会赢的点, 并返回出来
function willWin(data, color) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      // 如果那个位置有子, 就不检查, 否则就放去 ,看看会不会赢
      if (data[i][j]) {
        continue;
      } else {
        let temp = clone(data);
        temp[i][j] = color;
        if (check(temp, color)) {
          // 返回一个点
          return [i, j];
        }
      }
    }
  }
  // 如果不会赢, 就应该返回一个null
  return null;
}

// 此方法用来检查当前棋局会不会赢
function check(data, color) {
  // 横
  for (let i = 0; i < 3; i++) {
    let win = true;
    for (let j = 0; j < 3; j++) {
      if (data[i][j] !== color) {
        win = false;
      }
    }
    if (win) {
      return true;
    }
  }
  // 纵
  for (let i = 0; i < 3; i++) {
    let win = true;
    for (let j = 0; j < 3; j++) {
      if (data[j][i] !== color) {
        win = false;
      }
    }
    if (win) {
      return true;
    }
  }
  // 向下斜
  {
    let win = true;
    for (let j = 0; j < 3; j++) {
      if (data[j][j] !== color) {
        win = false;
      }
    }
    if (win) {
      return true;
    }
  }

  // 向上斜
  {
    let win = true;
    for (let j = 0; j < 3; j++) {
      if (data[j][2 - j] !== color) {
        win = false;
      }
    }
    if (win) {
      return true;
    }
  }
  return false;
}

function bestChoice(data, color) {
  let p;
  // 如果下一步对方直接会赢,就直接返回会赢的点
  if ((p = willWin(data, color))) {
    return {
      point: p,
      result: 1,
    };
  }
  // 初始化结果为 -2; -1 代表我会输, 0 平, 1 赢
  let result = -1;
  let point = null;
  // 这里的遍历是把每一种可能都给走一遍
  outer: for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (data[i][j]) continue;
      let temp = clone(data);
      temp[i][j] = color;
      // 此处 是一直相互去找对方的最好路径
      let opp = bestChoice(temp, 3 - color).result;
      let ourResult = -opp;
      // 对方的最好路径,就是我们的最差 结果
      // 如果对方是1, 那么我们就 -1, 取相反
      if (ourResult >= result) {
        result = ourResult;
        point = [i, j];
      }
      if (result == 1) {
        break outer;
      }
    }
  }
  return {
    point: point,
    result: point ? result : 0,
  };
}

show(borderData);
