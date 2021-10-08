import { Service } from 'typedi';
import { EntityRepository, Repository } from 'typeorm';
import { Users } from '../entities/users.entity';
import { IUsers } from '../interfaces';

@Service()
@EntityRepository(Users)
export class UsersRepository extends Repository<Users> {
  /**
   * Create new user
   * @param data user data
   * @returns Promise<Users>
   */
  async createUser(data: IUsers): Promise<Users> {
    return this.save(data);
  }

  /**
   * Get user by email
   * @param email user email
   * @returns Promise<Users>
   */
  async getUserByEmail(email: string): Promise<Users> {
    return this.findOne(
      { email }
    );
  }
}
