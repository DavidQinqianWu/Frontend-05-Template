const { connect } = require("http2");

class Request {
	constructor(options) {
		this.method = options.method || "GET";
		this.host = options.host;
		this.port = options.port || 80;
		this.path = options.path || "/";
		this.body = options.body || {};
		this.headers = options.headers || {};
		if (!this.headers["Content-Type"]) {
			this.headers["Content-Type"] == "application/x-www-form-urlencoded";
		}
		if (this.headers["Content-Type"] === "application/json") {
			this.bodyText = JSON.stringify(this.body);
		} else if (
			this.headers["Content-Type"] === "application/x-www-form-urlencoded"
		) {
			this.bodyText = Object.keys(this.body)
				.map((key) => `${key}=${encodeURIComponent(this.body[key])}`)
				.join("&");
		}
		this.headers["Content-Length"] = this.bodyText.length;
	}

	send(connection) {
		return new Promise((resolve, reject) => {
			const parse = new ResponseParse();
			if (connection) {
				connection.write(this.toString());
			} else {
				connect = net.createConnection(
					{
						host: this.host,
						port: this.port,
					},
					() => {
						connection.write(this.toString());
					}
				);
			}
			connection.on("data", (data) => {
				console.log(data.toString());
				parser.receiver(data.toString());
				if (parser.isFinished) {
					resolve(parser.response);
					connection.end();
				}
			});
			connection.on("error", (error) => {
				reject(error);
				connection.end();
			});
		});
	}
	// 这里是具体制作 http 请求文本
	toString() {}
}

class ResponseParse {
	constructor() {
		// 状态机去写 逻辑
	}

	receiver(string) {
		for (let i = 0; i < string.length; i++) {
			this.receiveChar(string.charAt(i));
		}
	}

	receiveChar(char) {}
}
