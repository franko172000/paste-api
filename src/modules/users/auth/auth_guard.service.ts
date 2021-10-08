import { verify } from 'jsonwebtoken';
import moment from 'moment';
import { UnauthorizedError } from 'routing-controllers';
import { Service } from 'typedi';
import config from '../../../config';

@Service()
export default class AuthGuardSerivce {
  constructor() {}

  /**
   * Validate token
   * @param token
   * @returns string
   */
  async validateToken(token: string){
    try {
      const decoded = verify(token, config.jwtSecret);
      return decoded;
    } catch (err) {
      throw new UnauthorizedError('Invalid or expired token');
    }
  }
}
