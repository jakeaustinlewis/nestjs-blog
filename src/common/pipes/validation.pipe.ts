/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable class-methods-use-this */
import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import HttpMethod from '../enum/http-method.enum';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  constructor(private http?: HttpMethod) {}

  async transform(value: any, { metatype }: ArgumentMetadata): Promise<any> {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object, { groups: this.http });
    if (errors.length > 0) {
      throw new BadRequestException(ValidationPipe.formatErrors(errors));
    }

    return object;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  private static formatErrors(errors: any[]): any[] {
    const constraints = errors
      .filter((error) => error.constraints)
      .map((error) => error.constraints);
    return constraints.map((error) => {
      const [errorMessage] = Object.keys(error).map((key) => error[key]);
      return errorMessage;
    });
  }
}
