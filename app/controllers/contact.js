const Koa = require('koa');
const app = new Koa();
const ModelsEmail = require('../models/sendEmail');
const Pug = require('koa-pug');
const pug = new Pug({
    viewPath: './views',
    basedir: './views',
    app: app
});

module.exports.contactPage = ctx => {
    ctx.set('Content-Type', 'text/html');
    ctx.body = pug.render('pages/contact-me', { title: 'Связаться со мной' });
}
module.exports.sendEmail = async ctx => {
        if (
            !ctx.request.body.name ||
            !ctx.request.body.email ||
            !ctx.request.body.message
        ) {
            return (ctx.body = { mes: 'Все поля нужно заполнить!', status: 'Error' });
        }
    
        let send = await ModelsEmail(
            ctx.request.body.name,
            ctx.request.body.email,
            ctx.request.body.message
        );
    
        if (send !== void 0) {
            return (ctx.body = { mes: 'Письмо не отправлено', status: 'Error' });
        } else {
            ctx.body = { mes: 'Сообщение отправлено! ', status: 'OK' };
        }
}