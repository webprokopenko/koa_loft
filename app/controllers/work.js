const Koa = require('koa');
const app = new Koa();
const db = require('../models/db')();
const path = require('path');
const fs = require('fs');
const koaBody = require('koa-body');
const Pug = require('koa-pug');
const pug = new Pug({
    viewPath: './views',
    basedir: './views',
    app: app
});
app.use(koaBody({
    formidable:{uploadDir: './public/upload'},    //This is where the files would come
    multipart: true,
    urlencoded: true
 }));  

module.exports.workPage = ctx => {
    ctx.set('Content-Type', 'text/html');
    ctx.body = pug.render('pages/my-work', { title: 'Мои работы', isAdmin: ctx.session.login , pic: db.stores.file.store });
}
module.exports.workSend = async ctx=>{

        let files = ctx.request.body.files;
        let fields = ctx.request.body.fields;
        let upload = 'public/upload';
        let fileName;
    
        if (!fs.existsSync(upload)) {
            fs.mkdirSync(upload);
        }
        
    
        if (files.file.name === '' || files.file.size === 0) {
            return (ctx.body = { mes: 'Проект не загружен Ошибка!', status: 'Error' });
        }
    
        if (!fields.projectName) {
            fs.unlink(files.file.path);
            console.log("project name is null");
            return (ctx.body = { mes: 'Проект не загружен Заполните все поля!', status: 'Error' });
        }
    
        fileName = path.join(upload, files.file.name);
        fileNamedb = path.join('upload',files.file.name);
    
        fs.rename(files.file.path, fileName, function (err) {
                if (err) {
                    console.error(err);
                    fs.unlink(fileName);
                    fs.rename(files.file.path, fileName); 
                }
                let dir = fileName.substr(fileName.indexOf('\\'));
                db.set(fields.projectName, {directory:fileNamedb,url:fields.projectUrl,description:fields.text});
                db.save();
                return (ctx.body = { mes: 'Проект успешно загружен', status: 'OK' });
                
        });
    
}