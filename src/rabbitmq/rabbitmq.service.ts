import { Injectable, OnModuleInit } from '@nestjs/common';
import * as amqp from 'amqplib';

@Injectable()
export class RabbitMQService implements OnModuleInit {
  private connection: amqp.Connection;
  private channel: amqp.Channel;

  async onModuleInit() {
    this.connection = await amqp.connect('amqp://localhost:8000');
    this.channel = await this.connection.createChannel();
  }

  async sendMessage(queue: string, message: string) {
    await this.channel.assertQueue(queue, { durable: false });
    console.log('rabbit sendMessage invoked');
    this.channel.sendToQueue(queue, Buffer.from(message));
  }

  async consumeMessages(queue: string, callback: (message: string) => void) {
    await this.channel.assertQueue(queue, { durable: false });
    console.log('rabbit consumeMessage invoked');
    this.channel.consume(queue, (msg) => {
      if (msg !== null) {
        callback(msg.content.toString());
        this.channel.ack(msg);
      }
    });
  }
}
