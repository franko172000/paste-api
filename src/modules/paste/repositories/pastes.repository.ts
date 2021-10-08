import { Service } from 'typedi';
import { EntityRepository, Repository } from 'typeorm';
import { Pastes } from '../entity/paste.entity';
import { IPaste } from '../interfaces/paste.interface';

@Service()
@EntityRepository(Pastes)
export class PasteRepository extends Repository<Pastes> {
  /**
   * Create new paste
   * @param data paste data
   * @returns Promise<Pastes>
   */
  async createPaste(data: IPaste): Promise<Pastes> {
    return this.save(data);
  }

  /**
   * Get paste
   * @param code unique paste code
   * @returns Promise<Pastes>
   */
  async getPaste(code: string): Promise<Pastes> {
    return this.findOne({ code });
  }

  /**
   * Get pastes by user
   * @param userId
   */
  async getUserPastes(userId: number): Promise<Pastes[]> {
    return this.find({ userId });
  }
}
