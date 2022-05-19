import { Type } from 'class-transformer';
import { Book } from 'src/modules/book/entities/book.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['name', 'surname'])
export class Author{
    @PrimaryGeneratedColumn()
    id_author: number;

    @Column({type: "varchar", length: 20, nullable: false})
    name: string;

    @Column({type: "varchar", length: 20, nullable: false})
    surname: string;

    @Column({type: 'varchar', default: 'ACTIVE', length: 8})
    status: string;

    @ManyToMany(Type => Book, (book) => book.authors)
    @JoinTable({
        name: "book-author",
        joinColumn: {
            name: "author-id",
            referencedColumnName: "id_author"
        }, 
        inverseJoinColumn: {
            name: "book-id",
            referencedColumnName: "id_book"
        }
    })
    books: Book[];
}