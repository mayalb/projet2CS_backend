
import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity("Tenant")
export class Tenant extends BaseEntity {

    @PrimaryGeneratedColumn()
    idTenant: number;
    @Column()
    idUser: number;
    @Column()
    profilePicture: string;
    @Column()
    permitPicture: string;
    @Column()
    accountState: string; 
    @Column()
    stateMessage: string; 
    @Column()
    dateSignUp: string; 
   
}