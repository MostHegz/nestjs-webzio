import { Type } from 'class-transformer';
import { FacebookSocialDto } from './facebook-social.dto';
import { VkSocialDto } from './vk-social.dto';

export class SocialDto {
  @Type(() => Date)
  updated: Date;

  @Type(() => FacebookSocialDto)
  facebook: FacebookSocialDto;

  @Type(() => VkSocialDto)
  vk: VkSocialDto;
}
