import { Injectable } from "@nestjs/common";
const Youtube = require("youtube-api")
import { google } from "googleapis";
const fs = require('fs')

@Injectable()
export class AuthService{

    private oauth;

     constructor(){
        this.oauth = Youtube.authenticate({
            type: "oauth",
            client_id: "153474233747-8h134cug30vmas83tc464bge81vpserg.apps.googleusercontent.com",
            client_secret: "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",
            redirect_url: "http://localhost:3003/oauth2callback"
        });
     }

    auth(){

        let url = this.oauth.generateAuthUrl({
            access_type: "offline"
          , scope: ["https://www.googleapis.com/auth/youtube.upload"]
        })
        return url;

    }

    async getToken(lien){           
            return await this.oauth.getToken(lien.query.code);        
    }
    
   async uploadVideo(file,token){ 
        
        file.mv(file.name);
        this.oauth.setCredentials({access_token : token});
        var req = Youtube.videos.insert({
            resource: {
                snippet: {
                    title: "Desafio Youtube API Nestjs module"
                , description: "Desafio Youtube API Nestjs module"
                },
                status: {
                    privacyStatus: "private"
                }
            },
            part: "snippet,status",
            media: {
                body: fs.createReadStream('videoteste.mp4')
            }
        });
    }
}