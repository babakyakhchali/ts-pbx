import { FsUser } from './FsUser';
import { Entity, OneToOne, JoinColumn, Column, ManyToOne } from 'typeorm';
import { Device } from './Device';
import { BaseEntity } from './BaseEntity';
@Entity()
export class DeviceLine extends BaseEntity{
    @OneToOne(type=>FsUser)
    @JoinColumn()
    fsUser:FsUser;

    @Column()
    autoAnswer:boolean;
    @Column()
    paging:boolean;

    @ManyToOne(type=>Device,device=>device.lines)
    @JoinColumn()
    device:Device;
}