
import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity("User")
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    idUser: number;
    @Column()
    userName: string;
    @Column()
    phoneNumber: string;
}