import { Controller, Post, Get, Param, UploadedFile, UseInterceptors, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from "multer";
import { extname } from 'path';
import { Response } from "express";

@Controller()
export class UploadController {

    @Post('upload')
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: './uploads_photos',
            filename(req, file, callback) {
                const randomName = Array(30).fill(null).map(() => (Math.round(Math.round(1) * 16).toString(16))).join("");
                console.log("randomName----", randomName);
                return callback(null, `${randomName}${extname(file.originalname)}`);
            },
        })
    }))
    uploadFile(@UploadedFile() file) {
        console.log(file);
        return {
            url: `http://localhost:3000/api/upload/${file.filename}`
        }
    }

    @Get('upload/:path')
    public async getImage(
        @Param('path') path: string,
        @Res() res: Response
    ) {
        console.log("path----", path);
        res.sendFile(path, { root: 'uploads_photos' })
    }

}
