import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMetricsDto, EditMetricsDto } from './dto';



@Injectable()
 export class MetricsService {
  constructor(private prisma: PrismaService) {}

  
getMetrics(userId: number){
  return this.prisma.metrics.findMany ({
    where : {
      userId
    }
  })
}


getMetricsById(userId: number, metricsId: number){
  return this.prisma.metrics.findFirst ({
    where : {
      id: metricsId,
      userId,
    }
  })
}


async createMetrics(userId: number, dto: CreateMetricsDto){
  const metrics = await this.prisma.metrics.create({
    data: {
      userId,
      ...dto,
    }
  })
  return metrics;
}


async editMetricsById(userId: number, metricsId: number,dto: EditMetricsDto){

  // get metrics by id
   const metrics = await this.prisma.metrics.findFirst({
    where:{
      id: metricsId,
    }
  }) 
  // check if user owns metrics
  if (!metrics || metrics.userId !== userId)
    throw new ForbiddenException("access denied");

//return metricsById
return this.prisma.metrics.update({
  where: {
    id: metricsId,
  },
  data : {
    ...dto,
  },
});
}


async deleteMetricsById(userId: number, metricsId: number){
// get metrics by id
const metrics = await this.prisma.metrics.findFirst({
  where:{
    id: metricsId,
  }
}) 
// check if user owns metrics
if (!metrics || metrics.userId !== userId)
  throw new ForbiddenException("access denied");

//delete metrics
await this.prisma.metrics.delete({
  where: {
    id: metricsId,
   },
  });
 }
}



  
