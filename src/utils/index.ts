import Jimp from "jimp";
import fs from 'fs'

const processaImagemLocal = async (file: Express.Multer.File, prefix: string,  w: number, h: number) : Promise<string> => {
    
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const nomeImagem = prefix + "-" + uniqueSuffix + ".jpg";
    try{    
        const imagem = await Jimp.read(file.path)
        imagem
            .resize(w, h) // resize
            .quality(80) // set JPEG quality
            .greyscale() // set greyscale
            .write("uploads/" + prefix + "-" + uniqueSuffix + ".jpg"); // save
        
        const imagemThumb = await Jimp.read(file.path)
        imagemThumb
            .resize(150, 150) // resize
            .quality(80) // set JPEG quality
            .greyscale() // set greyscale
            .write("uploads/thumb_" + prefix + "-" + uniqueSuffix + ".jpg");
        
    } catch(err){
        console.log("error")
        return Promise.reject("Cannot process Image")
    } finally {
        fs.unlinkSync(file.path);
    }
    return Promise.resolve(nomeImagem);
}

export default {
    processaImagemLocal
}