import {
  IsNotEmpty,
  IsOptional,
  IsUUID,
  Length,
  Matches,
} from 'class-validator';
import Utils from '../../utils/utils';

export class CreateMenuDto {
  @IsOptional()
  @IsUUID()
  readonly parent: string;

  @IsNotEmpty()
  @Length(2, 256)
  @Matches(Utils.identifierRule)
  readonly name: string;

  @IsNotEmpty()
  @Length(1, 256)
  readonly title: string;
}
