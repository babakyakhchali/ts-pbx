import { JsonController, Get, Post, Put, Delete, Param, Body, OnUndefined } from 'routing-controllers';
import { myGetRepository } from '../db/Connection';
import { Device } from '../entities/Device';
import { DeviceLine } from '../entities/DeviceLine';

@JsonController('/devices')
export class DeviceController{
    get repo() {
        return myGetRepository(Device);
    }
    get lineRepo(){
        return myGetRepository(DeviceLine);
    }

    @Get("/")
    getAll() {
        return this.repo.find({ relations: ["lines","lines.fsUser"] });
    }

    @Get("/:id")
    getOne(@Param("id") id: number) {
        return this.repo.findOneById(id);
    }

    @Post("/")
    create(@Body() b: Device) {
        return this.repo.save(b);
    }

    @Put("/:id")
    @OnUndefined(204)
    update(@Param("id") id: number, @Body() b: Device) {
        return this.repo.updateById(id,b);
    }

    @Delete("/:id")
    @OnUndefined(204)
    async remove(@Param("id") id: number) {
        return this.repo.deleteById(id);        
    }

    @Post("/:id/lines")
    async addLine(@Param("id") id:number,@Body() line:DeviceLine){
        let d = await this.repo.findOneById(id);
        if(!d){
            return;
        }
        line.device = d;        
        return this.lineRepo.save(d);
    }
    @Put("/:id/lines/:lid")
    @OnUndefined(204)
    updateLine(@Param("id") id:number,@Body() line:DeviceLine){
        return this.lineRepo.updateById(id,line);
    }
    @Delete("/:id/lines/:lid")
    @OnUndefined(204)
    async removeLine(@Param("id") id:number,@Param("lid") lid:number){
        await this.lineRepo.removeById(lid);
        return 'ok';
    }
}