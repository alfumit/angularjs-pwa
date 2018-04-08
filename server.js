const http = require('http');
const fs = require('fs');
const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const router = new Router();
const serve = require('koa-static');

app.use(serve('./src'));


app.use(router.routes());
app.listen(5001);

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
