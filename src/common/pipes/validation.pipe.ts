import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform {
  constructor(public http: string) {}

  // /** Method to implement a custom pipe. Called with two parameters
  //  * @param value  — argument before it is received by route handler method
  //  * @param metadata — contains metadata about the value
  //  * @returns any
  //  */
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const entity = this;
    // Dynamically determine the groups
    const { metatype } = metadata;

    const object = plainToInstance(metatype, value);
    console.log('object: ', object);

    const errors = await validate(object);

    if (errors.length > 0) {
      throw new HttpException(
        `Validation failed: ${ValidationPipe.formatErrors(errors)}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    console.log('value: ', value);
    console.log('metadata: ', metadata);
    console.log('http: ', this.http);

    return object;
  }

  private static formatErrors(errors: any[]): string {
    return errors
      .map((error) =>
        Object.keys(error.contraints).forEach((key) => error.contraints[key]),
      )
      .join(', ');
  }
}
