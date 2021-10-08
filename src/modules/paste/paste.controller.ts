import { Service } from 'typedi';
import PasteService from './paste.service';
import { Body, Controller, Param, Post, Req, Get, HttpCode, UseBefore } from 'routing-controllers';
import { BaseController } from '../../controller/base_controller';
import { PasteDTO } from './dto/paste.dto';
import { AuthGuard } from '../users/middleware/auth.middleware';

@Controller('paste')
@UseBefore(AuthGuard)
@Service()
export default class PasteController extends BaseController {
  constructor(private readonly pasteService: PasteService) {
    super();
  }

  @Post('/')
  @HttpCode(201)
  async addPaste(@Body() body: PasteDTO, @Req() req: any) {
    return this.pasteService.addPaste(body, this.getUserIdFromRequest(req));
  }

  @Get('/')
  async getPastes(@Req() req: any) {
    return this.pasteService.getUserPastes(this.getUserIdFromRequest(req));
  }

  @Get('/:code')
  async getPaste(@Param('code') code: string) {
    return this.pasteService.getPaste(code);
  }
}
