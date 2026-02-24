import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, Req, UseGuards, HttpStatus, HttpCode } from '@nestjs/common';
import { MedsService } from './meds.service';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { GetUser } from '../auth/decorator';
import { CreateMedsDto , EditMedsDto} from './dto';

@UseGuards(JwtGuard)
@Controller('meds')
export class MedsController {
  constructor(private medsService: MedsService) {}


@Get()  
getMeds(@GetUser('id') userId: number){
  return this.medsService.getMeds(
    userId,)
}

@Get(':id')
getMedsById(@GetUser('id') userId: number,
@Param('id', ParseIntPipe) medsId: number)
{
  return this.medsService.getMedsById(
    userId,
    medsId,
  )
}

@Post()
createMeds(@GetUser('id') userId: number,
 @Body() dto: CreateMedsDto){
  return this.medsService.createMeds(
    userId,
    dto,)
 }

@Patch(':id')
editMedsById(@GetUser('id') userId: number,
@Body() dto: EditMedsDto,
@Param('id', ParseIntPipe) medsId: number){
  return this.medsService.editMedsById(
    userId,
    medsId,
    dto,)
}

@HttpCode(HttpStatus.NO_CONTENT)
@Delete(':id')
deleteMedsById(@GetUser('id') userId: number,
@Param('id', ParseIntPipe) medsId: number){
  return this.medsService.deleteMedsById(userId, medsId)
}

  
}
