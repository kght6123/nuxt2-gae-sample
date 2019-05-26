export default {
	path: '/api/private',
	handler (req, res, next) {
		// req は Node.js の HTTPリクエストオブジェクトです
		//console.log(req.url)

		// res は Node.js の HTTPレスポンスオブジェクトです

		const admin = require('firebase-admin');
		const url = require("url");

		const firebaseConfig = {
			"type": "service_account",
			"project_id": "miraiblog-kght6123",
			"private_key_id": "fd5e31edb929a8a76557cfd354ba162e8b7e8338",
			"private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDYnoAP+tTfVyqR\nB96EX+v9c5YzxqhLhqxotwTSlGhN/9Xg0wwpMH9ZHKPiyfb28r3XonpC5yhUEjtc\nDCD7HrvgCn+lJJo088rbshapFpHZP8jW89uPUTAR4rpI7vT1ssuTldmny7adX57s\n59hYuEqSlhQ58+jmhUAuWTPmlGkIlfNkX4eowcLuoAGWkCbxPvVMV+QWYi6h01fl\nLXVb7Q8LZBUuvVUCjRYKXxDdrpm3NUkpGHY9XsVJR9UPbMtMc6cYtO87csCG89LT\n+oWHDYqkq+upZ5Mk1/fkgNdSNpb6ue+A8QDyU2fC1Rkqy0H59/qjit2vTlRtxiin\njUhCzpaLAgMBAAECggEABsEediEYnSQvKBmKNy90gNEnWFLz8XLwEk3OoTBOdkwp\nY5rBENG5ztIFTC+G+1lDUSN4U3i4ubJd1ndsWdgx/IDnTQNwqYEGjMYnTbtt7cu+\n2/D7oiLicFRVAawtyDF8howQHtrLxWlzX6i1BsMsVBjI5au00edKwoc2hpSPF9zi\nYTz3JQaY7sa8BLcmQYPU3fwzmQYekSVhN/cobMqZ3mvy0hYoKAXD17YeAOpcviw9\nk3IkiXwPmBTpJY5lLPicrbmtSysXOlea9t/lfHpIOIgfOBEX1lrR+p+6I+iUi72D\nt214eeoLxXBx6DYju6TtgLmiDcdia83TqgfwDR4K1QKBgQD98kfkywPeZCutGHbD\n9xD8IA+n0UgvfX1B8GOitY10guy3fxW3OqBIcaE4H3qV2Tp5Sd+iwuEy23063yy2\nqz1vqexZkPRJHuShowZmo8A8wP8vKPT8G9iizrixV8ZgjrVxXDmFggqWew70DKa6\nM0zHRZKm43D1iDIeBKy2k5WzPwKBgQDaXvHRWCsDP8T4a+nJHl+I0vPKHaze2a3L\nn+4Kh21dJTVg0EqxvWloAFlpXoJ679Vi2+/7DKyqZrZ3jdNgD+tIfZWIV/O8sS2o\nhLexWbdTLJrKYjeY67nTTpF+yAzP+CFfxXvtA9sdozKnEjxW8h5/g+k1bep/4hon\nF27fGQFltQKBgAoFN2UFxb9OwJJx9q3A4ACy2ytKDMki8IBblfLjqxM/30tWTmsO\neyigozXtuA6VpcMHcTWg7vXsx0I9cCw9EY2IbPUTzS/dcjQWlLgUGg/LpcYcnZ4d\nEy1JbuxAhGlm+C3i77oe6YAKlwp2PVX3lD4AtsqzCtAFccTRdmc156BNAoGBALtr\ncbBzM7d+K9frBqQO5X/RTlvSTGSX/4ocoXl38m1XWhDVtMYIA0e3xQWij+pjnYlT\nqwyVPDykG0dQ+nIgN5fn8Ucr9Y2lo8JW5jHZBnbkeZXp5j3hU4QAku91U0nLdRl1\nrX8nKBCv2PF7vT4CYBqhZK7uv60yqa+TdR0VoRVhAoGBAOv5BXQsMOnvr/jOFnHn\nNYOFkHsPnTNPW3may0B/IY8S5xnSdJ67SBBcRqauChlzq2MtsXl4HECce3d/op4r\nkm7eDM4/8sfVbXdYA/tftkam1ivEb+fwct7isUKjAml71eU0IHaCjZJx5Kzju0SM\ngCXHO9sCKd3EKUwq4ljQIKTV\n-----END PRIVATE KEY-----\n",
			"client_email": "firebase-adminsdk-g05co@miraiblog-kght6123.iam.gserviceaccount.com",
			"client_id": "108115638861000666265",
			"auth_uri": "https://accounts.google.com/o/oauth2/auth",
			"token_uri": "https://oauth2.googleapis.com/token",
			"auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
			"client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-g05co%40miraiblog-kght6123.iam.gserviceaccount.com"
		};

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