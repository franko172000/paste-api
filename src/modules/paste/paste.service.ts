import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { PasteRepository } from './repositories/pastes.repository';
import { IPaste } from './interfaces/paste.interface';
import { BaseService } from '../../services/base.service';
import config from '../../config';

@Service()
export default class PasteService extends BaseService {
  constructor(@InjectRepository(PasteRepository) private readonly pasteRepo: PasteRepository) {
    super();
  }

  async addPaste(data: IPaste) {
    const paste = await this.pasteRepo.createPaste(data);
    return this.okResponse('Content successfully', { url: config.baseUrl + '/' + paste });
  }

  async getPaste(code: string) {
    const paste = await this.pasteRepo.getPaste(code);
    return this.okResponse('Ok', paste);
  }

  async getUserPastes(userId: number) {
    const pastes = await this.pasteRepo.getUserPastes(userId);
    return this.okResponse('Ok', pastes);
  }
}
