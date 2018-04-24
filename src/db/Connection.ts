import { createConnection, Connection, Entity, ObjectType, Repository } from 'typeorm';


export let connection:Connection;
createConnection().then(c=>connection = c).catch(error => {
    console.log(error);
    process.exit(1);
});

export function myGetRepository<Entity>(target: ObjectType<Entity> | string){
    return connection.getRepository(target);
}
