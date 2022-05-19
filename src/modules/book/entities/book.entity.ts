import { Type } from "class-transformer";
import { Author } from "src/modules/author/entities/author.entity";
import { Genre } from "src/modules/genre/entities/genre.entity";
import { Reading } from "src/modules/reading/entities/reading.entity";
import { Column, Entity, JoinColumn, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Book{
    @PrimaryGeneratedColumn()
    id_book: number;

    @Column({type: "varchar", length: 30, unique: true, nullable: false})
    title: string;

    @Column({type: "text", nullable: false})
    sinopsis: string;

    @Column({type: "int", nullable: false})
    year: number;

    @ManyToMany(Type => Author, (author) => author.books, {eager: true})
    authors: Author[];

    @ManyToMany(Type => Genre, (genre) => genre.books, {eager: true})
    genres: Genre[];

    @OneToMany(Type => Reading, (reading) => reading.book, {eager: true})
    @JoinColumn()
    readings: Reading[];

    @Column({type: 'varchar', default: 'ACTIVE', length: 8})
    status: string;
}