import { IsNotEmpty, IsString } from 'class-validator';

export class ClientCredentialsDto {
  @IsNotEmpty()
  @IsString()
  client_id: string;

  @IsNotEmpty()
  @IsString()
  client_secret: string;
}
