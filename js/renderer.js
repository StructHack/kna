const fs = require('fs')
const path=require('path')
const createPdf = require('./js/pdfCreator')
const alreadyExists = require('./js/utils')

const pathfinder = document.querySelector('form');
pathfinder.addEventListener('submit',(e)=>{
    handleSubmit(e)
})

const initiatePdf = async (path, id)=>{
    const x = await createPdf(path)
    const clickedButton = document.querySelector(`#x${id}`)
    if(x){
        clickedButton.innerHTML = 'Done'
        clickedButton.style.background='lime'


    }else{
        clickedButton.style.background='red'
        clickedButton.innerHTML='ERROR!'
    }
}




const handleSubmit = (e)=>{
    e.preventDefault()
    const directory = e.target[0].value;
    fs.readdir(directory,(err, files)=>{
        if(err){
            alert('Some error occured')
        }
        const today = new Date();
        today.setHours(0,0,0,0)
        //List all the files
        let allfiles = '<table>'
        files.forEach(file=>{
            const filePath = path.join(directory, file)
            const fileStat = fs.statSync(filePath)
            if(fileStat.isDirectory() && fileStat.mtime >today ){
                const checkfile = alreadyExists(file)
                allfiles+=`
                <tr>
                <td>${file}</td>
                <td>${fileStat.mtime}</td>
                <td>
                <button class='create'
                    id="x${file}" 
                    onClick=initiatePdf('${directory.replaceAll('\\','/')}/${file}','${file}') ${checkfile?"disabled style='background-color:lime'":""}>
                        ${checkfile?"Done":"Check"}</button>
                </td>
                </tr>
                `
            }
        })
        allfiles+='</table>'
        document.querySelector('.content-container').innerHTML=allfiles
    })
}


// const createPdf = (filePath)=>{
//     document.write(filePath)
// }
