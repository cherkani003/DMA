import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMedsDto , EditMedsDto} from './dto';



@Injectable()
 export class MedsService {
  constructor(private prisma: PrismaService) {}

  
getMeds(userId: number){
  return this.prisma.meds.findMany ({
    where : {
      userId
    }
  })
}


getMedsById(userId: number, medsId: number){
  return this.prisma.meds.findFirst ({
    where : {
      id: medsId,
      userId,
    }
  })
}


async createMeds(userId: number, dto: CreateMedsDto){
  const meds = await this.prisma.meds.create({
    data: {
      userId,
      ...dto,
    }
  })
  return meds;
}


async editMedsById(userId: number, medsId: number,dto: EditMedsDto){

  // get meds by id
   const meds = await this.prisma.meds.findFirst({
    where:{
      id: medsId,
    }
  }) 
  // check if user owns meds
  if (!meds || meds.userId !== userId)
    throw new ForbiddenException("access denied");

//return medsById
return this.prisma.meds.update({
  where: {
    id: medsId,
  },
  data : {
    ...dto,
  },
});
}


async deleteMedsById(userId: number, medsId: number){
// get meds by id
const meds = await this.prisma.meds.findFirst({
  where:{
    id: medsId,
  }
}) 
// check if user owns meds
if (!meds || meds.userId !== userId)
  throw new ForbiddenException("access denied");

//delete meds
await this.prisma.meds.delete({
  where: {
    id: medsId,
   },
  });
 }
}



  
