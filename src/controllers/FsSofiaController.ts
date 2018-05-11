import { JsonController, Get, Post, Body, Put, Param, Delete, OnUndefined } from 'routing-controllers';
import { myGetRepository } from '../db/Connection';
import { FsSipProfile } from '../entities/FsSipProfile';
import { FsGateway } from '../entities/FsGateway';

@JsonController('/sofia')
export class FsSofiaController{
    get profileRepo(){
        return myGetRepository(FsSipProfile); 
    }
    get gwRepo(){
        return myGetRepository(FsGateway);
    }
    @Get('/profiles')
    getProfiles(){
        return this.profileRepo.find({relations:['gateways']});
    }

    @Post("/profiles")
    addProfile(@Body() b:FsSipProfile){
        return this.profileRepo.save(b);
    }

    @Put("/profiles/:id")
    @OnUndefined(204)
    updateProfile(@Param('id') id:number,@Body() b:FsSipProfile){        
        return this.profileRepo.updateById(id,b);
    }
    @Delete("/profiles/:id")
    @OnUndefined(204)
    async removeProfile(@Param('id') id:number){
        return this.profileRepo.removeById(id);
    }

    @Get('/profiles/:pid/gateways')
    async getGw(@Param('pid') pid){
        let r = await this.profileRepo.findOneById(pid,{relations:['gateways']});
        return !r?r:r.gateways;        
    }

    @Post("/profiles/:pid/gateways")
    async addGw(@Param('pid') pid,@Body() b:FsGateway){
        let p = await this.profileRepo.findOneById(pid);   
        if(!p){
            return;
        }     
        b.sipProfile = p;
        return this.profileRepo.save(b);
    }

    @Put("/profiles/:pid/gateways/:gid")
    @OnUndefined(204)
    updateGw(@Param('gid') id:number,@Body() b:FsGateway){        
        return this.gwRepo.updateById(id,b);
    }
    @Delete("/profiles/:pid/gateways/:gid")
    @OnUndefined(204)
    removeGw(@Param('gid') id:number){
        return this.gwRepo.removeById(id);
    }
}