import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateCampaignDto {
  @IsString()
  public name: String;

  @IsString()
  public discountType: String;

  @IsString()
  public validTill: String;
}

export class UpdateCampaignDto {
  @IsOptional()
  @IsString()
  public name: String;

  @IsOptional()
  @IsString()
  public discountType: String;

  @IsOptional()
  @IsString()
  public validTill: String;

  @IsOptional()
  @IsNumber()
  public redemptions: String;

}