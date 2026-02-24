import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";



@Injectable()
export class AuthService{
    constructor(
        private prisma: PrismaService, 
        private jwt: JwtService,
        private config: ConfigService,
        ) {}
    async signup(dto: AuthDto) {
        // generate the password
        const hash = await argon.hash(dto.password);

        try {
        // save the new user in db
        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                firstName : dto.firstName,
                lastName : dto.lastName,
                hash,
            }, 
        });
        // return the saved user
        return  this.signToken(user.id, user.email); 
    }catch(error) {
        if (error instanceof PrismaClientKnownRequestError) {
            //unique field error code
            if (error.code === 'P2002')  {     
                throw new ForbiddenException('email already used');                 
            }       
        }
        throw error;
    }
    }



    async signin(dto: AuthDto) {
// find user by email
const user =
 await this.prisma.user.findUnique ({
    where:{
email: dto.email,
},
})
// if not exist throw exception
if (!user) throw new ForbiddenException(' email doesnt exist')

//compare password
const pwMatches = await argon.verify(
    user.hash,
    dto.password,
);
//not same throw exception
if (!pwMatches) 
throw new ForbiddenException('Incorrect password or email doesnt exist')

//get back user
return this.signToken(user.id, user.email); 
    }
 async signToken(
    userId: number,
    email: string,
    ): Promise<{access_token:string}>
    {
        const payload = {
            sub: userId,
            email,
        };
        const secret = this.config.get('JWT_SECRET')
        const token = await this.jwt.signAsync(
            payload, 
            {
            expiresIn: '30d',
            secret: secret,
        },
        );
        return {
            access_token : token
        };
    }
}
