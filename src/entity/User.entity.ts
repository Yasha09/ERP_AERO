import 'reflect-metadata';

import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn, OneToMany, BaseEntity,
} from "typeorm";
import {RefreshToken} from "./RefreshToken.entity";


@Entity({ name: "user" })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: true, unique: true })
    phone: string;

    @Column({ nullable: true, unique: true })
    email: string;

    @Column({ nullable: false })
    password: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(()=> RefreshToken, refreshToken=>refreshToken.user)
    refreshTokens: RefreshToken[]
}