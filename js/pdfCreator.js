const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const constants = require('./constants');
const makeHtml = require('./htmlCreator')

const createPdf = async (filePath) =>{
    try{
    // Launch a new browser instance
    const browser = await puppeteer.launch({
        headless:"new"
    });

    const page = await browser.newPage();
    await page.emulateMediaType('screen');

    const images = []
    const files = fs.readdirSync(filePath)
    files.forEach(file=>{
        if((path.extname(file) == '.jpg' || path.extname(file)=='.png' || path.extname('.jpeg') )  ){
            const imageBase64 = fs.readFileSync(`${filePath}/${file}`).toString('base64');
            images.push(imageBase64)
        }
})
 
    let imageHtml = ''
    images.forEach((img)=>{
        imageHtml += `<img src="data:image/jpeg;base64,${img}" />` 
    })
    const htmlContent = makeHtml(imageHtml);
    await page.setContent(htmlContent,{waitUntil: 'networkidle0'});
    //makedir
    const f = filePath.split('/')
    const folder = f[f.length-1]
    try{

        fs.mkdirSync(constants.OUTPUT_PATH+`${folder}`)
         constants.FOLDERS.forEach(f=>{
             fs.mkdirSync(path.join(constants.OUTPUT_PATH,folder,f), { recursive: true });
         })
    }catch(e){
        error.innerHTML = 'Cannot make directory. '+e.msg
        return false
    }
    await page.pdf({ path: constants.OUTPUT_PATH+folder+`/Fielding/${folder}.pdf`, format: 'A4', printBackground: true });
    await browser.close();
    return true;
}catch(e){
    console.log(e)
    return false
}
} 

module.exports = createPdf