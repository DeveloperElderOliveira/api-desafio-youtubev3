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
    // this.oauth.setCredentials(tokens);
    // var req = Youtube.videos.insert({
    //     resource: {
    //         snippet: {
    //             title: "Desafio YoutTube API Nestjs module"
    //           , description: "Desafio YoutTube API Nestjs module"
    //         },
    //         status: {
    //             privacyStatus: "private"
    //         }
    //     },
    //     part: "snippet,status",
    //     media: {
    //         body: fs.createReadStream('/Users/eldercarmo/Documents/api-desafio-youtubev3-nestjs/src/services/videoteste.mp4')
    //     }
    // },(err,data) => {
    //     console.log("Done.");
    //     process.exit();
    // })
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

   async uploadVideo(auth = 'ya29.a0AVvZVsp1NxMSvS-C2AgArFuR_GzkLEEMFafBIW_IhMLiEzeipHiGRlRNmaHH6EStB7Lw2EGelTXhno4DT53uOSvf4Gbgrv071ZbXDsEqhcurY-6jAHb--3vquqtDGHpOaQsNe0vhySgRdiICj9DkM133SpENzAaCgYKAWASARISFQGbdwaImnB6uQ0TpewzJhueH-e1OQ0165'){
        const videoFilePath = '/Users/eldercarmo/Documents/api-desafio-youtubev3-nestjs/src/services/videoteste.mp4'

        const videoTitle = 'teste upload ApiyoutubeV3'
        const videoTags = 'teste upload ApiyoutubeV3'
        const videoDescription = 'teste upload ApiyoutubeV3'

        let service = google.youtube('v3');

        const requestParameters = {
            auth: 'ya29.a0AVvZVso0FehvZYtSOC3XWQ_6VQZ3AZHQuLiKXb5kElUJEEtiLGTUKFtS7anBnSolRw0F-Gq-_0TtMmGJ9oOdByxbgvHffWiGRu732yzrXpUOF6a-Y0Vh2EV9tIja_TZFT1CVmTggAO1afQDktF35_cBFpGOICAaCgYKAaQSARASFQGbdwaIU8Sywrfo5MxT8o1bBVJiag0165',
            part: ['snippet','status'],
            requestBody: {
                snippet: {
                    title: videoTitle,
                    description: videoDescription,
                    tags: [videoTags]
                },
                status: {
                    privacyStatus: 'unlisted'
                }
            },
            media: {
                body: fs.createReadStream(videoFilePath)
            },
        }

        const youtubeResponse = await service.videos.insert(requestParameters)
        console.log(youtubeResponse);
    }
}