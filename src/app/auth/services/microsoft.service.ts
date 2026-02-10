import { Injectable, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';
import * as qs from 'querystring';

@Injectable()
export class MicrosoftService {
  private readonly tokenEndpoint = `https://login.microsoftonline.com/${process.env.TENANT_ID}/oauth2/v2.0/token`;
  private readonly userEndpoint = 'https://graph.microsoft.com/v1.0/me';

  async validateCode(code: string) {
    try {
      const tokenResponse = await axios.post(
        this.tokenEndpoint,
        qs.stringify({
          client_id: '',
          client_secret: '',
          code: code,
          redirect_uri: '',
          grant_type: 'authorization_code',
        }),
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        },
      );
      const access_token = tokenResponse.data?.access_token;
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
