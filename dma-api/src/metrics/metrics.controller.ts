import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, Req, UseGuards, HttpStatus, HttpCode } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { GetUser } from '../auth/decorator';
import { CreateMetricsDto, EditMetricsDto } from './dto';

@UseGuards(JwtGuard)
@Controller('metrics')
export class MetricsController {
  constructor(private metricsService: MetricsService) {}


@Get()  
getMetrics(@GetUser('id') userId: number){
  return this.metricsService.getMetrics(
    userId,)
}

@Get(':id')
getMetricsById(@GetUser('id') userId: number,
@Param('id', ParseIntPipe) metricsId: number)
{
  return this.metricsService.getMetricsById(
    userId,
    metricsId,
  )
}

@Post()
createMetrics(@GetUser('id') userId: number,
 @Body() dto: CreateMetricsDto){
  return this.metricsService.createMetrics(
    userId,
    dto,)
 }

@Patch(':id')
editMetricsById(@GetUser('id') userId: number,
@Body() dto: EditMetricsDto,
@Param('id', ParseIntPipe) metricsId: number){
  return this.metricsService.editMetricsById(
    userId,
    metricsId,
    dto,)
}

@HttpCode(HttpStatus.NO_CONTENT)
@Delete(':id')
deleteMetricsById(@GetUser('id') userId: number,
@Param('id', ParseIntPipe) metricsId: number){
  return this.metricsService.deleteMetricsById(userId, metricsId)
}

  
}
