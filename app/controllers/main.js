const Koa = require('koa');
const app = new Koa();
const Pug = require('koa-pug');
const pug = new Pug({
    viewPath: './views',
    basedir: './views',
    app: app
});

module.exports =  ctx => {
    ctx.set('Content-Type', 'text/html');
    ctx.body = pug.render('pages/index', { title: 'Главная страница' });
};