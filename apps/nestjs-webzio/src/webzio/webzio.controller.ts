import { Body, Controller, Post } from '@nestjs/common';
import { WebzioService } from './webzio.service';
import { GetNewsRequestDTO, SyncNewResponseDto } from './dtos';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CustomLogger } from '@app/logger';

@Controller('webzio')
// TODO: AUTHENTICATION REQUIRED
export class WebzioController {
  constructor(
    private readonly webzioService: WebzioService,
    private readonly logger: CustomLogger,
  ) {
    this.logger.setContext(WebzioController.name);
  }

  @ApiOperation({
    summary: 'Synchronize news from Webzio',
    description: 'Fetches news from Webzio and saves them to the database.',
    tags: ['Webzio'],
  })
  @ApiResponse({
    status: 200,
    type: SyncNewResponseDto,
    description: 'Successfully synchronized news.',
  })
  @Post('sync-news')
  async syncNews(
    @Body() query: GetNewsRequestDTO,
  ): Promise<SyncNewResponseDto> {
    this.logger.log(
      `Received sync request with query: ${JSON.stringify(query)}`,
    );
    return this.webzioService.syncNews(query);
  }
}
