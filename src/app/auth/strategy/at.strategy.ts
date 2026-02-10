import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config"; // 1. Import ConfigService
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { EnvConfig } from "../../../config/env.validation"; // 2. Import your type

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private config: ConfigService<EnvConfig, true>) { // 3. Inject it
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req: Request) => {
                    return req?.signedCookies?.['access_token'] || 
                           req?.cookies?.['access_token'] || 
                           null;
                }
            ]),
            
            secretOrKey: config.get('JWT_SECRET', { infer: true }), 
        });
    }

    validate(payload: any) {
        return payload;
    }
}