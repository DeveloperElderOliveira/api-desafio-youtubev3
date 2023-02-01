import { Controller, Get, UseGuards,Req, Res, Param } from "@nestjs/common";
import { AuthService } from "src/services/auth.service";
import { AuthGuard } from "@nestjs/passport";

@Controller()
export class AuthController{
    constructor(private readonly authService: AuthService){}

    @Get('/auth')
    @UseGuards(AuthGuard('google'))
    async auth(@Req() req) {}

    @Get('/oauth2callback')
    @UseGuards(AuthGuard('google'))
    googleAuthRedirect(@Res() res, @Req() req){
        let url = this.authService.auth(req)
        res.redirect(url);
    }

    @Get('/allVideos/:token')
    getAllVideos(@Param('token') token:string){
        token = 'AIzaSyBrv2XwNbYVOddM_O3tYh5ZgkXyEUfENK0';
        this.authService.getAllVideos(token);
    }
}