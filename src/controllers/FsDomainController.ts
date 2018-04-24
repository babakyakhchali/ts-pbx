import { JsonController, Get, Post, Put, Delete, Param,Body } from 'routing-controllers';
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
    post(@Body() d: FsDomain) {
        return this.repo.save(d);
    }

    @Put("/:id")
    put(@Param("id") id: number, @Body() d: FsDomain) {
        return this.repo.save(d);
    }

    @Delete("/:id")
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
        u.domain = d;
        return this.userRepo.save(u);
    }

    @Put("/:id/users/:uid")
    putUser(@Param("uid") id: number, @Body() u: FsUser) {
        return this.userRepo.save(u);
    }

    @Delete("/:id/users/:uid")
    removeUser(@Param("uid") id: number) {
        return this.userRepo.deleteById(id);
    }
}