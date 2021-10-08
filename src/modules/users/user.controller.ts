import { Body, Controller,HttpCode,Post, UseBefore} from 'routing-controllers';
import { Service } from 'typedi';
import {
  UserLoginDTO,
  UserRegisterDTO
} from './dto/auth.dto';
import UserService from './user.service';

@Controller('user/')
@Service()
export default class UserController {
  /**
   * User constructor
   * @param userService UserService
   */
  constructor(private userService: UserService) {}

  /**
   *  handle login authentication
   * @param body request body
   * @returns json
   */
  @Post('login')
  async login(@Body() body: UserLoginDTO) {
    return this.userService.login(body);
  }

  /**
   * Controller method for user registration
   * @param body request body
   * @returns json
   */
  @Post('register')
  @HttpCode(201)
  async register(@Body() body: UserRegisterDTO) {
    return await this.userService.registerUser(body);
  }
}
