const Koa = require('koa');
const app = new Koa();
const Pug = require('koa-pug');
const pug = new Pug({
    viewPath: './views',
    basedir: './views',
    app: app
});

module.exports.login = async ctx => {
    if(ctx.request.body.login === 'admin' && ctx.request.body.password === 'admin'){
        ctx.session.login = true;
        return (ctx.body = {msg:'Авторизация успешна', status: 'OK'});
    }else{
        ctx.session.login = true;
        return (ctx.body = {msg:'Логин и/или пароль введены не верно!', status: 'Error'});
    }
}
module.exports.loginPage = ctx => {
    ctx.set('Content-Type', 'text/html');
    ctx.body = pug.render('pages/login', { title: 'Авторизация' });
}