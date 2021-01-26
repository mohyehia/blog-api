const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public');
    },
    filename: function (req, file, cb) {
        const fileName = `${Date.now()}_${file.originalname.replace('/\s+/g', '-')}`;
        cb(null, fileName);
    }
});

module.exports = multer({storage: storage});