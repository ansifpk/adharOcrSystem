import multer from "multer"


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,'uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + '.jpg')
    }
  })
  

const upload = multer({ storage: storage });
export default upload.fields([
    { name: 'frontImage', maxCount: 1 },
    { name: 'backImage', maxCount: 1 }
]);