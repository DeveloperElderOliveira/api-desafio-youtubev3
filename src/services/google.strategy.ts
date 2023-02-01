import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback  } from "passport-google-oauth20";
import { Injectable } from "@nestjs/common";

@Injectable()

export class GoogleStrategy extends PassportStrategy(Strategy, 'google'){
    constructor(){
        super({
            clientID : "153474233747-8h134cug30vmas83tc464bge81vpserg.apps.googleusercontent.com",
            clientSecret: "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",
            callbackURL: "http://localhost:3003/oauth2callback",
            scope: ['email','profile']
        });
    }

    async validate(accessToken: string, refreshToken:string, profile:any, done: VerifyCallback): Promise<any>{
        const {name, emails, photos} = profile
        const user = {
            email: emails[0].value,
            firstName: name.giveName,
            lastName: name.familyName,
            picture: photos[0].value,
            accessToken
        }
        done(null,user)
    }
}