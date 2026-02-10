import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import * as qs from 'qs'; // Ensure you run: npm install qs @types/qs
import { EnvConfig } from 'src/config/env.validation';

@Injectable()
export class MicrosoftService {
  constructor(private config: ConfigService<EnvConfig, true>) {}

  // Getter to ensure ConfigService is ready before accessing variables
  private get tokenEndpoint() {
    return `https://login.microsoftonline.com/${this.config.get('TENANT_ID', 'common')}/oauth2/v2.0/token`;
  }
  
  private readonly userEndpoint = 'https://graph.microsoft.com/v1.0/me';

  async validateCode(code: string): Promise<any> {
    try {
      const payload = {
        client_id: this.config.get('CLIENT_ID'),
        client_secret: this.config.get('CLIENT_SECRET'),
        code: code,
        redirect_uri: this.config.get('REDIRECT_URI'),
        grant_type: 'authorization_code',
      };

      const tokenResponse = await axios.post(
        this.tokenEndpoint,
        qs.stringify(payload),
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        },
      );

      const access_token = tokenResponse.data.access_token;

      const userResponse = await axios.get(this.userEndpoint, {
        headers: { Authorization: `Bearer ${access_token}` },
      });

      return userResponse.data;
    } catch (error) {
      console.error(
        'Microsoft Auth Error:',
        error.response?.data || error.message,
      );
      throw new UnauthorizedException('Invalid Microsoft Authorization Code');
    }
  }
}