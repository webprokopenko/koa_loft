const session = require('koa-session');
const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const router = require('./routes/index');
const serve = require('koa-static');
const Pug = require('koa-pug');
const koaBody = require('koa-body');
const ModelsEmail = require('./models/sendEmail');
const fs = require('fs');
const path = require('path');
const db = require('./models/db')();

console.log(void 0);

const pug = new Pug({
    viewPath: './views',
    basedir: './views',
    app: app
});
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

app.use(koaBody({
    formidable:{uploadDir: './public/upload'},    //This is where the files would come
    multipart: true,
    urlencoded: true
 }));  

app.use(serve(__dirname + '/public'));

app.use(router.routes());


// router.get('/my-work', myWorkPage);
// router.post('/my-work', async ctx=>{

//     let files = ctx.request.body.files;
//     let fields = ctx.request.body.fields;

//     let upload = './public/upload';
//     let fileName;

//     if (!fs.existsSync(upload)) {
//         fs.mkdirSync(upload);
//     }
    

//     if (files.file.name === '' || files.file.size === 0) {
//         return (ctx.body = { mes: 'Проект не загружен Ошибка!', status: 'Error' });
//     }

//     if (!fields.projectName) {
//         fs.unlink(files.file.path);
//         return (ctx.body = { mes: 'Проект не загружен Заполните все поля!', status: 'Error' });
//     }

//     fileName = path.join(upload, files.file.name);
//     fileNamedb = path.join('upload',files.file.name);

//     fs.rename(files.file.path, fileName, function (err) {
//             if (err) {
//                 console.error(err);
//                 fs.unlink(fileName);
//                 fs.rename(files.file.path, fileName); 
//             }
//             let dir = fileName.substr(fileName.indexOf('\\'));
//             db.set(fields.projectName, {directory:fileNamedb,url:fields.projectUrl,description:fields.text});
//             db.save();
//             return (ctx.body = { mes: 'Проект успешно загружен', status: 'OK' });
            
//     });

// });

// app.use(router.routes());

app.listen(4100, function () {
    console.log('Server running on https://localhost:4100')
});
