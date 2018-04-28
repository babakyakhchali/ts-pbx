import { JsonController,Get,Put,Delete,Post,Param,Body } from "routing-controllers";
import { Group } from "../entities/Group";
import { myGetRepository } from '../db/Connection';

@JsonController('/groups')
export class GroupController{
    get repo() {
        return myGetRepository(Group);
    }

    @Get("/")
    getAll() {
        return this.repo.find();
    }

    @Get("/:id")
    getOne(@Param("id") id: number) {
        return this.repo.findOneById(id);
    }

    @Post("/")
    create(@Body() b: Group) {
        return this.repo.save(b);
    }

    @Put("/:id")
    update(@Param("id") id: number, @Body() b: Group) {
        return this.repo.save(b);
    }

    @Delete("/:id")
    remove(@Param("id") id: number) {
        return this.repo.deleteById(id);
    }
}