import { Response } from 'express';

export const setCookie = (response: Response, refreshToken: string) => {
  response.cookie('refresh_token', refreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    // secure: true, => if you use https
  });
};
