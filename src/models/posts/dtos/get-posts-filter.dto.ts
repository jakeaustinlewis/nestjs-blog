import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';
import HttpMethod from 'src/common/enum/http-method.enum';

export class GetPostsFilterDto {
  @IsOptional({ groups: [HttpMethod.Get] })
  @Type(() => Number)
  limit?: number;

  @IsOptional({ groups: [HttpMethod.Get] })
  @Type(() => Number)
  offset?: number;
}
