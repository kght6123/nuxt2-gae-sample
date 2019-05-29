export default {
	path: '/api/index',
	handler (req, res, next) {
		//console.time('index')

		// req は Node.js の HTTPリクエストオブジェクトです
		console.log('url=%s', req.url)
		console.error('error test : %j', next) // stderr に出力する。

		// res は Node.js の HTTPレスポンスオブジェクトです

		res.writeHead(200, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify({ 'foo': 'bar' }));
		
		//console.trace('trace test : %o', req)

		// next は 次のミドルウェアを呼び出すための関数です。
		// あなたのミドルウェアが最後でない場合、関数の最後で next を呼び出すのを忘れないでください！
		//next()

		//console.timeEnd('index')
	}
}