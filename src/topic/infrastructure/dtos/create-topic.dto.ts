import { IsHexColor, IsNotEmpty } from 'class-validator';

export class CreateTopicDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsHexColor()
  color: string;

  @IsNotEmpty()
  icon: string;
}
