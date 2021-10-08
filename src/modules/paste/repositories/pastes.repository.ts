import { Service } from 'typedi';
import { EntityRepository, Repository } from 'typeorm';
import { Pastes } from '../entity/paste.entity';
import { PasteDTO } from '../dto/paste.dto';

@Service()
@EntityRepository(Pastes)
export class PasteRepository extends Repository<Pastes> {
  /**
   * Create new paste
   * @param data paste data
   * @returns Promise<Pastes>
   */
  async createPaste(data: PasteDTO, userId: number): Promise<Pastes> {
    const { name, content } = data;
    return this.save(
      this.create({
        name,
        content,
        userId,
      }),
    );
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
