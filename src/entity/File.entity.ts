import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn, ManyToOne, JoinColumn,
} from "typeorm";
import {User} from "./User.entity";


@Entity()
export class File {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        length: 250,
    })
    name: string;

    @Column({
        type: 'varchar',
        length: 2000,
    })
    url: string;

    @Column({
        type: 'varchar',
        length: 100,
    })
    mimeType: string

    @Column({
        type: 'varchar',
    })
    extension: string

    @Column({
        type: 'int',
        nullable: true,
    })
    fileSize: number

    @Column({
        type: 'int',
        nullable: true,
    })
    userId: number

    @CreateDateColumn()
    uploadedAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    // Relations
    @ManyToOne(() => User, user => user.uploadFiles)
    @JoinColumn({name: "userId"})
    user: User
}