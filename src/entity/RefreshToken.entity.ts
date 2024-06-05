import 'reflect-metadata';

import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn, OneToMany, BaseEntity, ManyToOne, JoinColumn, Unique,
} from "typeorm";
import {User} from "./User.entity";


@Entity()
export class RefreshToken {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, unique: true})
    deviceId: string;

    @Column({nullable: true, unique: true})
    token: string;

    @Column({nullable: false})
    userId: number;

    @ManyToOne(() => User, user => user.refreshTokens)
    @JoinColumn({name: "userId"})
    user: User

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}