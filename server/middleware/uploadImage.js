const multer = require('multer');

const imageUpload = async (req,res,next)=>{
    if( req.user == undefined ){
        req.user = {
            email : "sakib90@gmail.com"
        }
    }
    
    var storage = await multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, '../client/public/uploads');
        },
        filename: function (req, file, cb) {
            imageName = req.user.email + "." + file.mimetype.split('/')[1];
            //imageName += "_randomstring"
            cb(null, imageName);
        }
    });
    

    const upload = multer({
        storage,
        fileFilter: (req,file,cb) => {
            if( file.mimetype == "image/jpeg" || file.mimetype == "image/png" ){
                cb(null, true);
            }
            else {
                cb( null, false );
            }
        }
    });

    
    let uploadFile = upload.single('image');
    
    uploadFile(req, res, function (err) {
        next();
    });
}

module.exports = {
    imageUpload
}