import { Param, Body, Get, Post, Put, Delete, JsonController } from "routing-controllers";

import { Repository } from "typeorm";
import { User } from "../entities/User";
import { Service } from "typedi";
import { Email } from '../entities/Email';
import { myGetRepository } from '../db/Connection';
import { Role } from "../entities/Role";
import { Group } from '../entities/Group';


@JsonController('/users')
export class UserController {
    get repo() {
        return myGetRepository(User);
    }

    @Get("/")
    getAll() {
        return this.repo.find({ relations: ["emails","roles"] });
    }

    @Get("/:id")
    getOne(@Param("id") id: number) {
        return this.repo.findOneById(id);
    }

    @Post("/")
    post(@Body() user: User) {
        return this.repo.save(user);
    }

    @Put("/:id")
    put(@Param("id") id: number, @Body() user: User) {
        return this.repo.save(user);
    }

    @Delete("/:id")
    remove(@Param("id") id: number) {
        return this.repo.deleteById(id);
    }
    @Post("/:id/emails")
    async addEmail(@Param("id") id: number, @Body() email: Email) {
        let u = await this.repo.findOneById(id);
        email.user = u;
        return myGetRepository(Email).save(email);
    }
    @Put("/:id/emails/:eid")
    async editEmail(@Param("id") id: number, @Param("eid") eid: number, @Body() email: Email) {
        return myGetRepository(Email).save(email);
    }

    @Delete("/:id/emails/:eid")
    removeEmail(@Param("id") id: number, @Param("eid") eid: number) {
        return myGetRepository(Email).deleteById(id);
    }

    @Post("/:id/roles")
    async addRole(@Param("id") id: number, @Body() role: Role) {
        let u = await this.repo.findOneById(id,{ relations: ["roles"]});
        u.roles.push(role);
        return this.repo.save(u);
    }
    @Delete("/:id/roles/:rid")
    async removeRole(@Param("id") id: number, @Param("rid") rid: number) {
        let u = await this.repo.findOneById(id, { relations: ["roles"] });
        const i =u.roles.findIndex(r=>r.id == rid);
        if(i>=0){
            u.roles.splice(i,1);
            return this.repo.save(u);
        }else{
            return null;
        }
        
    }
    @Post("/:id/groups")
    async addGroup(@Param("id") id: number, @Body() group: Group) {
        let u = await this.repo.findOneById(id,{ relations: ["groups"]});
        u.groups.push(group);
        return this.repo.save(u);
    }
    @Delete("/:id/groups/:rid")
    async removeGroup(@Param("id") id: number, @Param("rid") gid: number) {
        let u = await this.repo.findOneById(id, { relations: ["groups"] });
        const i =u.groups.findIndex(g=>g.id == gid);
        if(i>=0){
            u.groups.splice(i,1);
            return this.repo.save(u);
        }else{
            return null;
        }
        
    }

}