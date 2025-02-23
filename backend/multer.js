const multer = require('multer');
const path =  require('path')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload/'); // cb(throw new error , null)
    },
    filename: (req, file, cb) => { // Fixed syntax error here
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const filename = file.originalname.split('.')[0];
        const fileExtension = path.extname(file.originalname)
        cb(null, filename + '-' + uniqueSuffix + fileExtension);
    }
});

const upload = multer({ storage: storage });

module.exports ={ upload};