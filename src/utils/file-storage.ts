import { diskStorage } from 'multer';
import * as path from 'path';

export const fileStorage = diskStorage({
  destination: path.join(__dirname, '../../uploads'),
  // 自定义上传的文件名字
  filename: (req, file, cb) => {
    console.log(file,'111111111111');
    
    const singFileArray = file.originalname.split('.');
    const fileExtension = singFileArray[singFileArray.length - 1]; // 文件后缀名
    const newFilename = `${singFileArray[0]}_${Date.now()}.${fileExtension}`;
    cb(null, newFilename);
  }
});
