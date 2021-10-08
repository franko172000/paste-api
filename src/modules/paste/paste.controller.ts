import { Service } from 'typedi';
import PasteService from './paste.service';
import { Body, Controller, Param, Post, Req } from 'routing-controllers';
import { IPaste } from './interfaces/paste.interface';
import { BaseController } from '../../controller/base_controller';

@Controller('paste')
@Service()
export default class PasteController extends BaseController {
  constructor(private readonly pasteService: PasteService) {
    super();
  }

  @Post('/')
  async addPaste(@Body() body: IPaste) {
    return this.pasteService.addPaste(body);
  }

  @Post('/')
  async getPastes(@Req() req: any) {
    return this.pasteService.getUserPastes(this.getUserIdFromRequest(req));
  }

  @Post('/:code')
  async getPaste(@Param('code') code: string) {
    return this.pasteService.getPaste(code);
  }
}
