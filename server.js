const http2 = require('http2');
const fs = require('fs');
const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const router = new Router();
const serve = require('koa-static');
const options = {
	key: fs.readFileSync('./config/server.key'),
	cert:  fs.readFileSync('./config/server.crt')
};

const { HTTP2_HEADER_PATH } = http2.constants;
const mime = require('mime');
const push = (stream, path) => {
	const filePath = `$(__dirname)/src/${path}`;
	const file = {
		content: () => fs.openSync(filePath),
		headers: {
			'content-type': () => mime.getType(filePath)
		}
	};
	if (!file) {
		return;
	}
	stream.pushStream({ [HTTP2_HEADER_PATH]: path }, (pushStream) => {
		pushStream.respondWithFD(file.content, file.headers)
		
	});
}

app.use(serve('./src'));
router.get('/test', require('./test').get);
app.use(router.routes());



http2.createSecureServer(options, app.callback()).listen(5001);

// let server = http.createServer( (req ,res) => {
// 	console.log(req);
// 	fs.readFile(__dirname + '/index.html', (err, content) => {
// 		if (err) throw err;
// 		res.setHeader('Content-Type', 'text/html;charset=utf-8');
// 		res.end(content);
// 	});
// 	return;
// });
// server.listen(5000);
