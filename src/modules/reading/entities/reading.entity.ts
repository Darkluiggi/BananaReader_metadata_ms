import { Type } from "class-transformer";
import { Book } from "src/modules/book/entities/book.entity";
import { Language } from "src/modules/language/entities/language.entity";
import { Narrator } from "src/modules/narrator/entities/narrator.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Reading{
    @PrimaryGeneratedColumn()
    id_reading: number;

    @Column({type: "int", nullable: false})
    user: number;

    @Column({type: "int", unique: true, nullable: false})
    storage: number;

    @Column({type: "time", nullable: false})
    duration: string;

    @Column({type: "int", default: 0, nullable: false})
    chapters: number;

    @OneToOne(Type => Language, {eager: true})
    @JoinColumn()
    language: Language;

    @ManyToMany(Type => Narrator, (narrator) => narrator.readings, {eager: true})
    @JoinColumn()
    narrators: Narrator[];

    @ManyToOne(Type => Book, (book) => book.readings)
    @JoinColumn()
    book: Book;

    @Column({type: 'varchar', default: 'ACTIVE', length: 8})
    status: string;
}