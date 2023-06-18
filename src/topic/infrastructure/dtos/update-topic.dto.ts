import { IsHexColor, IsNotEmpty } from 'class-validator';

export class UpdateTopicDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsHexColor()
  color: string;

  @IsNotEmpty()
  icon: string;
}
