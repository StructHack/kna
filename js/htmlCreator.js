
const makeHtml = (imgHtml)=>{
    return `     <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; }
                h1 { text-align: center; }
                img { display: block; margin: 0 auto; max-width: 100%; height: auto; }
                .page-break { page-break-after: always; }
            </style>
        </head>
        <body>
            <h1>My PDF with Images</h1>
            ${imgHtml}
        </body>
        </html>
        
        `
}

module.exports = makeHtml