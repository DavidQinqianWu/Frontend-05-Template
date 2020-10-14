"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var MyMap = /** @class */ (function () {
    function MyMap() {
        var _this = this;
        // 先检查是是否有值已经存储了,并初始化
        this.map = localStorage["map"]
            ? JSON.parse(localStorage["map"])
            : Array(10000).fill(0);
        this.table = Object.create(this.map);
        this.mousedown = false;
        this.clear = false;
        this.queue = [];
        this.container = document.querySelector("#container");
        document.addEventListener("mousedown", function (e) {
            _this.mousedown = true;
            _this.clear = e.which === 3;
        });
        document.addEventListener("mouseup", function () { return (_this.mousedown = false); });
        document.addEventListener("contextmenu", function (e) { return e.preventDefault(); });
    }
    // 做一个100*100这样的一个 格子;
    MyMap.prototype.initialMap = function () {
        // 首先检查我们的数据是否已经在localStorage里面存储额,如果没有存储,就生成新的
        // 如果存储了, 就从localStorage里面拿出来
        var _this = this;
        var _loop_1 = function (y) {
            var _loop_2 = function (x) {
                var cell = document.createElement("div");
                cell.classList.add("cell");
                // 数据驱动显示
                if (this_1.map[100 * y + x] == 1) {
                    cell.style.backgroundColor = "black";
                }
                cell.addEventListener("mousemove", function () {
                    if (_this.mousedown) {
                        if (_this.clear) {
                            cell.style.backgroundColor = "";
                            _this.map[100 * y + x] = 0;
                        }
                        else {
                            cell.style.backgroundColor = "black";
                            _this.map[100 * y + x] = 1;
                        }
                    }
                });
                this_1.container.appendChild(cell);
            };
            for (var x = 0; x < 100; x++) {
                _loop_2(x);
            }
        };
        var this_1 = this;
        for (var y = 0; y < 100; y++) {
            _loop_1(y);
        }
    };
    MyMap.prototype.findPath = function (start_, end_) {
        return __awaiter(this, void 0, void 0, function () {
            var targetPoint, path, insertTop, insertLeft, insertRight, insertDown, insertTopLeft, insertTopRight, insertBottomLeft, insertBottomRight;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.queue = [start_];
                        _a.label = 1;
                    case 1:
                        if (!this.queue.length) return [3 /*break*/, 15];
                        targetPoint = this.queue.shift();
                        if (!(targetPoint.x === end_.x && targetPoint.y === end_.y)) return [3 /*break*/, 5];
                        path = [];
                        _a.label = 2;
                    case 2:
                        if (!(targetPoint.x != start_.x || targetPoint.y !== start_.y)) return [3 /*break*/, 4];
                        // 回溯到起点 只要targetPoint 不是起点
                        path.push(this.map[targetPoint.y * 100 + targetPoint.x]);
                        // 让 targetPoint  = table里面记录的点的pre点
                        targetPoint = this.table[targetPoint.y * 100 + targetPoint.x];
                        return [4 /*yield*/, this.sleep(30)];
                    case 3:
                        _a.sent();
                        this.container.children[targetPoint.y * 100 + targetPoint.x].style.backgroundColor = "red ";
                        return [3 /*break*/, 2];
                    case 4: return [2 /*return*/, path];
                    case 5:
                        insertTop = {
                            x: targetPoint.x,
                            y: targetPoint.y - 1,
                        };
                        insertLeft = {
                            x: targetPoint.x - 1,
                            y: targetPoint.y,
                        };
                        insertRight = {
                            x: targetPoint.x + 1,
                            y: targetPoint.y,
                        };
                        insertDown = {
                            x: targetPoint.x,
                            y: targetPoint.y + 1,
                        };
                        insertTopLeft = {
                            x: targetPoint.x - 1,
                            y: targetPoint.y - 1,
                        };
                        insertTopRight = {
                            x: targetPoint.x + 1,
                            y: targetPoint.y - 1,
                        };
                        insertBottomLeft = {
                            x: targetPoint.x - 1,
                            y: targetPoint.y + 1,
                        };
                        insertBottomRight = {
                            x: targetPoint.x + 1,
                            y: targetPoint.y + 1,
                        };
                        return [4 /*yield*/, this.insertCoordinate(insertLeft, targetPoint)];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, this.insertCoordinate(insertTop, targetPoint)];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, this.insertCoordinate(insertRight, targetPoint)];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, this.insertCoordinate(insertDown, targetPoint)];
                    case 9:
                        _a.sent();
                        return [4 /*yield*/, this.insertCoordinate(insertTopLeft, targetPoint)];
                    case 10:
                        _a.sent();
                        return [4 /*yield*/, this.insertCoordinate(insertTopRight, targetPoint)];
                    case 11:
                        _a.sent();
                        return [4 /*yield*/, this.insertCoordinate(insertBottomLeft, targetPoint)];
                    case 12:
                        _a.sent();
                        return [4 /*yield*/, this.insertCoordinate(insertBottomRight, targetPoint)];
                    case 13:
                        _a.sent();
                        _a.label = 14;
                    case 14: return [3 /*break*/, 1];
                    case 15: return [2 /*return*/, null];
                }
            });
        });
    };
    MyMap.prototype.insertCoordinate = function (coordinate_, previousCoordinate_) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // 如果超过了边缘 那么就返回, 什么也不做
                        if (coordinate_.x < 0 ||
                            coordinate_.x >= 100 ||
                            coordinate_.y < 0 ||
                            coordinate_.y >= 100) {
                            return [2 /*return*/];
                        }
                        // 如果遇到了标记过的,那么也返回,什么也不做
                        if (this.table[coordinate_.y * 100 + coordinate_.x]) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.sleep(30)];
                    case 1:
                        _a.sent();
                        this.container.children[coordinate_.y * 100 + coordinate_.x].style.backgroundColor = "lightgreen";
                        // 记录下当前该点的 前驱点
                        this.table[coordinate_.y * 100 + coordinate_.x] = previousCoordinate_;
                        this.queue.push(coordinate_);
                        return [2 /*return*/];
                }
            });
        });
    };
    MyMap.prototype.sleep = function (ms_) {
        return new Promise(function (resolve) {
            setTimeout(resolve, ms_);
        });
    };
    return MyMap;
}());
var Sorted = /** @class */ (function () {
    function Sorted(data, compare) {
        this.data = data.slice();
        this.compare = compare || (function (a, b) { return a - b; });
    }
    Sorted.prototype.take = function () {
        if (!this.data.length) {
            return;
        }
        // 设置一个默认值
        var min = this.data[0];
        var minIndex = 0;
        for (var i = 0; i < this.data.length; i++) {
            if (this.compare(this.data[i], min) < 0) {
                min = this.data[i];
                minIndex = i;
            }
        }
        // 直接把数组里面的最后一位覆盖掉还要被删掉的位置
        this.data[minIndex] = this.data[this.data.length - 1];
        // 然后把最后以为的数据给pop掉,因为已经把最后一位的数据给放到了 要被删除的位置, 所以出现两个一样的最后一位数据
        // 这样我们的数组就用最低的时间成本,把那个要被删除的元素给抹去
        this.data.pop();
        // 返回那个最小的被删除的元素
        return min;
    };
    Sorted.prototype.give = function (v) {
        this.data.push(v);
    };
    return Sorted;
}());
