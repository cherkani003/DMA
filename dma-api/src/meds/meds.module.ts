

import { Module } from '@nestjs/common';
import { MedsController } from './meds.controller';
import { MedsService } from './meds.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
    controllers : [MedsController],
    providers : [MedsService, PrismaService],
})
export class MedsModule {}