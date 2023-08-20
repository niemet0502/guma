import { ApiProperty } from '@nestjs/swagger';

export class CreateOrganizationDto {
  @ApiProperty()
  public name: string;
  @ApiProperty()
  public size: string;
  @ApiProperty()
  public logo: string;
}
