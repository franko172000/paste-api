import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { PasteRepository } from './repositories/pastes.repository';
import { BaseService } from '../../services/base.service';
import config from '../../config';
import { PasteDTO } from './dto/paste.dto';

@Service()
export default class PasteService extends BaseService {
  constructor(@InjectRepository(PasteRepository) private readonly pasteRepo: PasteRepository) {
    super();
  }

  async addPaste(data: PasteDTO, userId: number) {
    const paste = await this.pasteRepo.createPaste(data, userId);
    const url = config.baseUrl + config.api.prefix + 'paste/' + paste.code;
    return this.okResponse('Content successfully created!', { url });
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
