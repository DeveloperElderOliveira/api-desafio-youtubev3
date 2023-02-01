import { Injectable } from "@nestjs/common";
import { response } from "express";
import { google } from "googleapis";

@Injectable()
export class AuthService{

    auth(req){
        
        if(!req.user){
            return 'No user from google';
        }

        console.log(req.user);

        return 'http://localhost:8080/signin/' + req.user.accessToken + '/' + req.user.email;

    }

    async getAllVideos(auth){
        let part = ['snippet','contentDetails','statistics'];
        let service = google.youtube('v3');

        await service.videos.list({
            auth: auth,
            part: part,
            chart: 'mostPopular',
            maxResults: 20,
            regionCode: 'BR'
        },async (err,response) => {
           console.log(response);
        });

    }
}