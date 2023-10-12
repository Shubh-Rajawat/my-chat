const multer  = require('multer')
const uuid = require('uuid')
const path = require('path')

const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null,'./uplode')
        
        //     for (let key in obj) {
        //         if (key==file.fieldname) {
        //             cb(null,obj[key])
        //         }
        //     }

    },
    filename: (req,file,cb) =>{
        cb(null,uuid.v4()+path.extname(file.originalname))
    }
})

const uplode = multer({storage:storage})
module.exports=uplode;