import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { MedsModule } from './meds/meds.module';
import { MetricsModule } from './metrics/metrics.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';


@Module({
  imports: [
          ConfigModule.forRoot({isGlobal : true,}),
          MedsModule, 
        MetricsModule,
         AuthModule,
          UserModule,
          PrismaModule,
        ],
          

})
export class AppModule {}
