import { Controller, Get, UseGuards,Req, Res, Param } from "@nestjs/common";
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

    @Get('/allVideos/:token')
    getAllVideos(@Param('token') token:string){
        token = 'AIzaSyBrv2XwNbYVOddM_O3tYh5ZgkXyEUfENK0';
        this.authService.getAllVideos(token);
    }

    @Get('/uploadVideo')
    uploadVideo(){
        this.authService.uploadVideo();
    }
}