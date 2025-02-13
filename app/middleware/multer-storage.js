import multer from "multer";
import __dirname from "../../server.js";


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/public/assets/coffees')
  },
  filename: function (req, file, cb) {    
    cb(null, req.body.reference_number + '.png')
  }
});

export default storage;