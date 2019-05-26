export default {
	path: '/api/private',
	handler (req, res, next) {
		// req は Node.js の HTTPリクエストオブジェクトです
		//console.log(req.url)

		// res は Node.js の HTTPレスポンスオブジェクトです

		const admin = require('firebase-admin');
		const url = require("url");

		const firebaseConfig = {/* 認証情報を書く */};

		let queryData = url.parse(req.url, true).query
		const token = queryData.token;

		// initialize SDK -> 1回だけにする
		const credential = admin.credential.cert(firebaseConfig);
		const app = admin.initializeApp({ credential });

		// verify
		const auth = app.auth();
		
		auth.verifyIdToken(token)
			.then(decoded => {
				res.writeHead(200, { 'Content-Type': 'application/json' });
				res.end(JSON.stringify({ 'uid': decoded.uid, 'email': decoded.email }));
			})
			.catch(err => {
				console.log('err:', err);
			})
			.finally(() => {
				console.log('Auth is end.')
			})
		
		// next は 次のミドルウェアを呼び出すための関数です。
		// あなたのミドルウェアが最後でない場合、関数の最後で next を呼び出すのを忘れないでください！
		//next()
	}
}