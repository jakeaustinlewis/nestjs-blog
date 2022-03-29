import { IsNotEmpty } from 'class-validator';
import HttpMethod from 'src/common/enum/http-method.enum';

export class CreateTaskDto {
  @IsNotEmpty({ groups: [HttpMethod.Post] })
  title: string;

  @IsNotEmpty({ groups: [HttpMethod.Post] })
  description: string;
}
