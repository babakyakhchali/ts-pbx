import { JsonController, Get,Post,Put,Delete,Param,Body } from 'routing-controllers';
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
    update(@Param("id") id: number, @Body() b: Device) {
        return this.repo.save(b);
    }

    @Delete("/:id")
    async remove(@Param("id") id: number) {
        await this.repo.deleteById(id);
        return 'ok';
    }

    @Post("/:id/lines")
    async addLine(@Param("id") id:number,@Body() line:DeviceLine){
        let d = await this.repo.findOneById(id,{relations:['lines']});
        d.lines.push(line);
        return this.repo.save(d);
    }
    @Put("/:id/lines/:lid")
    updateLine(@Param("id") id:number,@Body() line:DeviceLine){
        return this.lineRepo.save(line);
    }
    @Delete("/:id/lines/:lid")
    async removeLine(@Param("id") id:number,@Param("lid") lid:number){
        await this.lineRepo.removeById(lid);
        return 'ok';
    }
}