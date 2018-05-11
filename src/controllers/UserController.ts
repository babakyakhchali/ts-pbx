import { Param, Body, Get, Post, Put, Delete, JsonController, OnUndefined } from 'routing-controllers';

import { Repository } from "typeorm";
import { User } from "../entities/User";
import { Service } from "typedi";
import { Email } from '../entities/Email';
import { myGetRepository } from '../db/Connection';
import { Role } from "../entities/Role";
import { Group } from '../entities/Group';
import { findAndRemove } from '../utils/misc';


@JsonController('/users')
export class UserController {
    get repo() {
        return myGetRepository(User);
    }

    @Get("/")
    getAll() {
        return this.repo.find({ relations: ["emails", "roles","groups"] });
    }

    @Get("/:id")
    getOne(@Param("id") id: number) {
        return this.repo.findOneById(id,{ relations: ["emails", "roles","groups"] });
    }

    @Post("/")
    create(@Body() user: User) {
        return this.repo.save(user);
    }

    @Put("/:id")
    @OnUndefined(204)
    update(@Param("id") id: number, @Body() user: User) {
        return this.repo.updateById(id, user);
    }

    @Delete("/:id")
    @OnUndefined(204)
    async remove(@Param("id") id: number) {
        return this.repo.deleteById(id);
    }
    @Post("/:id/emails")
    async addEmail(@Param("id") id: number, @Body() email: Email) {
        let u = await this.repo.findOneById(id);
        if (!u) {
            return;
        }
        email.user = u;
        return myGetRepository(Email).save(email);
    }
    @Put("/:id/emails/:eid")
    @OnUndefined(204)
    async editEmail(@Param("id") id: number, @Param("eid") eid: number, @Body() email: Email) {
        return myGetRepository(Email).save(email);
    }

    @Delete("/:id/emails/:eid")
    @OnUndefined(204)
    async removeEmail(@Param("id") id: number, @Param("eid") eid: number) {
        return myGetRepository(Email).deleteById(eid);
    }

    @Post("/:id/roles")
    async addRole(@Param("id") id: number, @Body() role: Role) {
        let u = await this.repo.findOneById(id, { relations: ["roles"] });
        if (!u) {
            return;
        }
        u.roles.push(role);
        return this.repo.save(u);
    }
    @Delete("/:id/roles/:rid")
    @OnUndefined(204)
    async removeRole(@Param("id") id: number, @Param("rid") rid: number) {
        let u = await this.repo.findOneById(id, { relations: ["roles"] });
        if(u && findAndRemove(u.roles,r => r.id == rid)){
            return this.repo.save(u);
        }else{
            return;
        }
    }
    @Post("/:id/groups")
    async addGroup(@Param("id") id: number, @Body() group: Group) {
        let u = await this.repo.findOneById(id, { relations: ["groups"] });
        if(!u){
            return;
        }
        u.groups.push(group);
        return this.repo.save(u);
    }
    @Delete("/:id/groups/:rid")
    @OnUndefined(204)
    async removeGroup(@Param("id") id: number, @Param("rid") gid: number) {
        let u = await this.repo.findOneById(id, { relations: ["groups"] });
        if(u && findAndRemove(u.groups,g => g.id == gid)){
            return this.repo.save(u);
        }else{
            return;
        }
    }

}