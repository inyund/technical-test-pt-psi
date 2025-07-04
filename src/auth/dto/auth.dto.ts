export class ValidateUserDTO {
  email: string;
  name: string;
}

export class ValidateUserReponseDTO {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
}

export class DecodedTokenDTO {
  sub: string;
  username: string;
  exp: number;
  iat: number;
}

export class ValidateJWTPayloadDTO {
  sub: string;
  username: string;
}
