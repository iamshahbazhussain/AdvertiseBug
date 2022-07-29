const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    },
    id: (req, file, cb) => {
        cb(null, '1')
    }
});
const filefilter = (req, file, cb) => {
    let images = ['image/png', 'image/jpg', 'image/jpeg', 'image/png'];
    let videos = ['video/mp4', 'video/3gp', 'video/mov'];
    if ( images.includes(file.mimetype) || videos.includes(file.mimetype)){
        cb(null, true);
    }else {
        cb(null, false);
    }
}


const upload = multer({storage: storage, fileFilter: filefilter});

module.exports = {upload}