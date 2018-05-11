import { JsonController, Get, Post, Put, Delete, Param, Body, OnUndefined, NotFoundError } from 'routing-controllers';
import { FsContext } from '../entities/FsContext';
import { myGetRepository } from '../db/Connection';
import { FsContextExtention } from '../entities/FsContextExtension';
@JsonController('/contexts')
export class FsContextController {
    get repo() {
        return myGetRepository(FsContext);
    }
    get extRepo() {
        return myGetRepository(FsContextExtention);
    }
    @Get("/")
    async getAll() {
        return this.repo.find({ relations: ["extensions"] });
    }

    @Get("/:id")
    getOne(@Param("id") id: number) {
        return this.repo.findOneById(id, { relations: ["extensions"] });
    }

    @Post("/")
    async create(@Body() b: FsContext) {
        return this.repo.save(b);
    }

    @Put("/:id")
    @OnUndefined(204)
    async update(@Param("id") id: number, @Body() d: FsContext) {
        return this.repo.updateById(id, d);
    }

    @Delete("/:id")
    @OnUndefined(204)
    remove(@Param("id") id: number) {
        return this.repo.deleteById(id);
    }

    @Get("/:id/extensions")
    async getExtensions(@Param('id') contextId) {
        let c = await this.getOne(contextId);
        return !c?c:c.extensions;        
    }

    @Get("/:id/extensions/:eid")
    getOneExtension(@Param("eid") id: number) {
        return this.extRepo.findOneById(id);
    }

    @Post("/:id/extensions")
    async addExtension(@Param("id") id: number, @Body() b: FsContextExtention) {
        let c = await this.repo.findOneById(id);
        if(!c){
           return;
        }
        b.context = c;
        return this.extRepo.save(b);
    }

    @Put("/:id/extensions/:eid")
    @OnUndefined(204)
    async updateExtension(@Param("eid") id: number, @Body() b: FsContextExtention) {
        return this.extRepo.updateById(id, b);
    }

    @Delete("/:id/extensions/:eid")
    @OnUndefined(204)
    removeExtension(@Param("eid") id: number) {
        return this.extRepo.deleteById(id);
    }
}