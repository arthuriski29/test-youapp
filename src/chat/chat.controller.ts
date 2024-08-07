import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  Query,
  Put,
  Param,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { JwtAuthGuard } from 'src/guard/jwt.guards';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @UseGuards(JwtAuthGuard)
  @Post('send')
  async sendMessage(
    @Request() req,
    @Body() messageDto: { recipient: string; content: string },
  ) {
    await this.chatService.sendMessage(
      req.user.username,
      messageDto.recipient,
      messageDto.content,
    );
    return { success: true };
  }

  @UseGuards(JwtAuthGuard)
  @Get('messages')
  async getMessages(
    @Request() req,
    @Query('otherUser') otherUser: string,
    @Query('page') page: 1,
    @Query('limit') limit: 20,
  ) {
    return this.chatService.getMessages(
      req.user.username,
      otherUser,
      page,
      limit,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Put('messages/:messageId/read')
  async markAsRead(@Request() req, @Param('messageId') messageId: string) {
    return this.chatService.markAsRead(messageId, req.user.username);
  }
}
