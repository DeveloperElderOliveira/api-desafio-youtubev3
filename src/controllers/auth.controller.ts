import { Controller, Get, UseGuards,Req, Res, Param, Post } from "@nestjs/common";
import { AuthService } from "src/services/auth.service";

@Controller()
export class AuthController{
    constructor(private readonly authService: AuthService){}

    @Get('/auth')
    async auth(@Res() res,@Req() req) {
        let url = this.authService.auth();
        res.redirect(url);
    }

    @Get('/oauth2callback')
    async googleAuthRedirect(@Res() res, @Req() req){
        let token = await this.authService.getToken(req);
        let url = 'http://localhost:8080/signin/' + token.tokens.access_token;
        res.redirect(url);
    }
    @Post('/uploadVideo/:token')
    uploadVideo(@Res() res, @Req() req,@Param('token') token:string){
        const file = req.files.file;
        this.authService.uploadVideo(file,token);
    }
}