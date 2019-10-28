import { IsString, IsOptional } from 'class-validator';

export class UpdateAuthorDTO {
    @IsString()
    @IsOptional()
    firstName: string;

    @IsString()
    @IsOptional()
    lastName: string;
}
