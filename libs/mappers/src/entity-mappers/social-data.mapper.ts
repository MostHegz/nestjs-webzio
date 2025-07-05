import { Injectable } from '@nestjs/common';
import { SocialDto } from '@app/webzio-client';
import { SocialData } from '@app/entities';

@Injectable()
export class SocialDataMapper {
  mapFromClientDTO(dto: SocialDto): SocialData {
    const socialData = new SocialData();
    socialData.updatedAt = dto.updated;
    socialData.facebook = dto.facebook;
    socialData.vk = dto.vk;
    return socialData;
  }
}
