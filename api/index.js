const crypto = require('crypto');
// By default, the client will authenticate using the service account file
// specified by the GOOGLE_APPLICATION_CREDENTIALS environment variable and use
// the project specified by the GOOGLE_CLOUD_PROJECT environment variable. See
// https://github.com/GoogleCloudPlatform/google-cloud-node/blob/master/docs/authentication.md
// These environment variables are set automatically on Google App Engine
const {Datastore} = require('@google-cloud/datastore');

// Instantiate a datastore client
const datastore = new Datastore({
	//projectId: 'nuxt2-gae-sample',
});

/**
 * Insert a visit record into the database.
 *
 * @param {object} visit The visit record to insert.
 */
function insertVisit(visit) {
  return datastore.save({
    key: datastore.key('visit'),
    data: visit,
  });
}

/**
 * Retrieve the latest 10 visit records from the database.
 */
function getVisits() {
  const query = datastore
    .createQuery('visit')
    .order('timestamp', {descending: true})
    .limit(10);

  return datastore.runQuery(query);
}

export default {
	path: '/api/index',
	async handler (req, res, next) {
		//console.time('index')

		// req は Node.js の HTTPリクエストオブジェクトです
		console.log('url=%s', req.url)
		console.error('error test : %j', next) // stderr に出力する。

		// Create a visit record to be stored in the database
		const visit = {
			timestamp: new Date(),
			// Store a hash of the visitor's ip address
			userIp: crypto
				.createHash('sha256')
				.update(req.url)
				.digest('hex')
				.substr(0, 7),
		};

		var visits
		try {
			await insertVisit(visit);
			const results = await getVisits();
			const entities = results[0];
			visits = entities.map(
				entity => `Time: ${entity.timestamp}, AddrHash: ${entity.userIp}`
			);
			console.log(visits)
		} catch (error) {
			console.error(error)
		}
		
		// res は Node.js の HTTPレスポンスオブジェクトです

		res.writeHead(200, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify({ 'foo': 'bar', visits }));
		
		//console.trace('trace test : %o', req)

		// next は 次のミドルウェアを呼び出すための関数です。
		// あなたのミドルウェアが最後でない場合、関数の最後で next を呼び出すのを忘れないでください！
		//next()

		//console.timeEnd('index')
	}
}