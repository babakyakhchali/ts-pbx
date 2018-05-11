import { JsonController, Get, Post, Put, Delete, Param, Body, OnUndefined } from 'routing-controllers';
import { FsDomain } from "../entities/FsDomain";
import { myGetRepository } from '../db/Connection';
import { FsUser } from '../entities/FsUser';

@JsonController('/domains')
export class FsDomainController{
    get repo() {
        return myGetRepository(FsDomain);
    }
    get userRepo() {
        return myGetRepository(FsUser);
    }
    @Get("/")
    async getAll() {
        return this.repo.find({ relations: ["users"] });
    }

    @Get("/:id")
    getOne(@Param("id") id: number) {
        return this.repo.findOneById(id);
    }

    @Post("/")
    create(@Body() d: FsDomain) {
        return this.repo.save(d);
    }

    @Put("/:id")
    @OnUndefined(204)
    update(@Param("id") id: number, @Body() d: FsDomain) {
        return this.repo.updateById(id,d);
    }

    @Delete("/:id")
    @OnUndefined(204)
    remove(@Param("id") id: number) {
        return this.repo.deleteById(id);
    }

    @Get("/:id/users")
    getAllUsers() {
        return this.userRepo.find();
    }

    @Get("/:id/users/:uid")
    getOneUser(@Param("uid") id: number) {
        return this.userRepo.findOneById(id);
    }

    @Post("/:id/users")
    async postUser(@Param("id") id: number,@Body() u: FsUser) {
        let d = await this.repo.findOneById(id);
        if(!d){
            return;
        }
        u.domain = d;
        return this.userRepo.save(u);
    }

    @Put("/:id/users/:uid")
    @OnUndefined(204)
    putUser(@Param("uid") id: number, @Body() u: FsUser) {
        return this.userRepo.updateById(id,u);
    }

    @Delete("/:id/users/:uid")
    @OnUndefined(204)
    removeUser(@Param("uid") id: number) {
        return this.userRepo.deleteById(id);
    }
}