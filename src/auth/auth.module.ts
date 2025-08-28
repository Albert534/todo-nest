import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { DbModule } from 'src/db/db.module';
import { AuthService } from './auth.service';
@Module({
  imports : [DbModule],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
