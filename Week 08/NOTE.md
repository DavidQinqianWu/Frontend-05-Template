学习笔记

# 浏览器过程

URL=>(http)=> html=>(parse)=>DOM=>(CSS Computing) => DOM CSS =>(layout)=> DOM Position=>(render) =>bitmap

# 有限状态机

-   纯函数(本身没有状态)
-   统一的输入
-   每一个机器知道下一个状态
-   每一个机器都有确定的下一个状态(Moore)
-   每一个机器根据输入的决定下一个状态(Mealy)

# HTTP 协议

流 : 没有明确的分界, 只保证顺序
先由客户端主动发起: 一个 request 和 一个 response

## http 协议结构

> POST/HTTP/1.1 // request Line
> Host: 127.0.0.1 // headers
> Content-Type: application/x-www-form-urlencoded // header
> // 中间必须有空行, 用来区分 body 和 header
> field1=aaa&code //body

response 文本

> HTTP/1.1 200 OK // status line
> Content-Type: text/html //header 开始
> Date: Mon, 23 Dec 2019
> Connection: Keep-alive
> Transfer-Encoding:chunked // header 结束

> //body
