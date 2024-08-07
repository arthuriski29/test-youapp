import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Message } from '../schemas/chat.message.schema';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Message.name)
    private messageModel: Model<Message>,
    private authService: AuthService,
  ) {}

  async sendMessage(sender: string, recipient: string, content: string) {
    const senderUser = await this.authService.findOne(sender);
    const recipientUser = await this.authService.findOne(recipient);

    if (!senderUser || !recipientUser) {
      throw new Error('Sender or recipient not found');
    }

    const message = new this.messageModel({
      sender: senderUser._id,
      recipient: recipientUser._id,
      content,
    });

    return message.save();
  }

  async getMessages(
    username: string,
    otherUsername: string,
    page = 1,
    limit = 20,
  ) {
    const user = await this.authService.findOne(username);
    const otherUser = await this.authService.findOne(otherUsername);

    if (!user || !otherUser) {
      throw new Error('User not found');
    }

    const messages = await this.messageModel
      .find({
        $or: [
          { sender: user._id, recipient: otherUser._id },
          { sender: otherUser._id, recipient: user._id },
        ],
      })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('sender', 'username')
      .populate('recipient', 'username')
      .exec();

    return messages.reverse();
  }

  async markAsRead(messageId: string, username: string) {
    const user = await this.authService.findOne(username);
    if (!user) {
      throw new Error('User not found');
    }

    return this.messageModel
      .findOneAndUpdate(
        { _id: messageId, recipient: user._id },
        { read: true },
        { new: true },
      )
      .exec();
  }
}
