import multer from "multer";
import __dirname from "./dirname.js";

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        let destination = `${__dirname}/../public/documents`;

        if (file.fieldname ==='profileImage'){
            destination = `${__dirname}/../public/profiles`;
        }else if (file.fieldname === "productImage"){
            destination = `${__dirname}/../public/products`;
        }
        cb(null,destination)
    },
    filename: function(req,file,cb){
        cb(null,`${Date.now()}-${file.originalname}`)
    }
})

const uploader = multer({storage})

export default uploader

