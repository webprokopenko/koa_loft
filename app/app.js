const session = require('koa-session');
const Koa = require('koa');
const app = new Koa();
const router = require('./routes/index');
const serve = require('koa-static');
const CONFIG = {
    key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
    maxAge: 86400000,
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: true, /** (boolean) httpOnly or not (default true) */
    signed: true, /** (boolean) signed or not (default true) */
    rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. default is false **/
};
app.keys = ['secret', 'key'];

app.use(session(CONFIG, app));

app.use(serve(__dirname + '/public'));

app.use(router.routes());

app.listen(4100, function () {
    console.log('Server running on https://localhost:4100')
});
