import { IsNotEmpty } from 'class-validator';

export class UserDTO {
  @IsNotEmpty({ message: 'Name is mandatory.' })
  name: string;

  @IsNotEmpty({ message: 'Email is mandatory.' })
  email: string;

  avatar?: string;
}
