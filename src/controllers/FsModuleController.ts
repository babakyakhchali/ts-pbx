import { JsonController, Get, Post, Put, Delete, Param, Body, OnUndefined } from 'routing-controllers';
import { FsModule } from '../entities/FsModule';
import { myGetRepository } from '../db/Connection';

@JsonController('/fs/modules')
export class FsModuleController{
    get repo() {
        return myGetRepository(FsModule);
    }    

    @Get("/")
    getAll() {
        return this.repo.find();
    }

    @Get("/:id")
    getOne(@Param("id") id: number) {
        return this.repo.findOneById(id);
    }

    getByName(name:string){
        return this.repo.findOne({name:name});
    }

    @Post("/")
    create(@Body() b: FsModule) {
        return this.repo.save(b);
    }

    @Put("/:id")
    @OnUndefined(204)
    update(@Param("id") id: number, @Body() b: FsModule) {
        return this.repo.updateById(id,b);
    }

    @Delete("/:id")
    @OnUndefined(204)
    remove(@Param("id") id: number) {
        return this.repo.deleteById(id);        
    }
}