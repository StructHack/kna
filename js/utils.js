const alreadyExists = (file)=>{
    //check if the pdf is already exists, if so disable the button
    const exists= fs.existsSync(path.join(process.cwd(),'output',file))
    if(exists){
        return true
    }{
        return false
    }


}

module.exports = alreadyExists