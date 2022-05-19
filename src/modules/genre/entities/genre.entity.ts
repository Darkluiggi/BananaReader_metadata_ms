import { Type } from "class-transformer";
import { type } from "os";
import { Book } from "src/modules/book/entities/book.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Genre{
    @PrimaryGeneratedColumn()
    id_genre: number;

    @Column({type: "varchar", length: 25, unique: true, nullable: false})
    name: string;

    @Column({type: 'varchar', default: 'ACTIVE', length: 8})
    status: string;

    @ManyToMany(Type => Book, (book) => book.genres)
    @JoinTable({
        name: "book-genre",
        joinColumn: {
            name: "genre-id",
            referencedColumnName: "id_genre"
        }, 
        inverseJoinColumn: {
            name: "book-id",
            referencedColumnName: "id_book"
        }
    })
    books: Book[];
}