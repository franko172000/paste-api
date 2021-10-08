import { NotFoundError, UnauthorizedError } from 'routing-controllers';
import { Service } from 'typedi';
import { BaseService } from '../../services/base.service';
import { UserRegisterDTO, UserLoginDTO} from './dto/auth.dto';
import { UsersRepository } from './repositories/users.repository';
import config from '../../config';
import { sign } from 'jsonwebtoken';
import { InjectRepository } from 'typeorm-typedi-extensions';

@Service()
export default class UserService extends BaseService {
  constructor(
    @InjectRepository(UsersRepository) private readonly userRepo: UsersRepository
  ) {
    super();
  }

  /**
   * Login handler
   * @param data login data
   * @returns object
   */
  async login(data: UserLoginDTO) {
    const { email, password } = data;
    //get user info
    const user = await this.userRepo.getUserByEmail(email);

    //check if user exists
    if (user && password === user.password) {
      //sign JWT token
      const token = this.generateToken(user.id, user.email);

      return this.okResponse('Login Successful', { token });
    }

    throw new UnauthorizedError('Invalid credentials');
    
  }

  /**
   * User registration handler
   * @param user user registration data
   * @returns
   */
  async registerUser(user: UserRegisterDTO) {
    //destruct user object
    const { name, email, age, password } = user;
    //create user record
    await this.userRepo.createUser({ name, email, password, age });
    
    return this.okResponse('User created!');
  }

  /**
   * Generate JWT token
   * @param userId user id
   * @param email user email
   * @returns string
   */
  private generateToken(userId: number, email: string, duration?: string) {
    return sign(
      {
        data: { email, id: userId },
      },
      config.jwtSecret,
      { expiresIn: duration ?? '1h' },
    );
  }
}
