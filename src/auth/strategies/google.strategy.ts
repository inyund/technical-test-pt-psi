import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.getOrThrow<string>('GOOGLE_CLIENT_ID'),
      clientSecret: configService.getOrThrow<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.get<string>(
        'GOOGLE_CALLBACK_URL',
        'http://localhost:8080/api/auth/google/callback',
      ),
      scope: ['email', 'profile'],
      passReqToCallback: true,
    });
  }

  validate(
    request,
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ) {
    const { name, emails } = profile;

    if (!emails || emails.length === 0) {
      throw new Error('No email found in Google profile');
    }

    return {
      email: emails[0].value,
      name: name?.givenName + ' ' + name?.familyName,
    };
  }
}
