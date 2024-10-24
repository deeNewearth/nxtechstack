import { Module } from '@nestjs/common';
import { BeCoreModule } from "@kiss/be-core";

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [BeCoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
