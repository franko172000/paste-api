import { IsString, IsNotEmpty } from 'class-validator';

export class PasteDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}
