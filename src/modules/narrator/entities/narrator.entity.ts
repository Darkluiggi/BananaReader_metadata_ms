import { Reading } from "src/modules/reading/entities/reading.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Narrator{
    @PrimaryGeneratedColumn()
    id_narrator: number;

    @Column({type: "varchar", length: 15, unique: true, nullable: false})
    name: string;

    @Column({type: "varchar", length: 15, unique: true, nullable: false})
    surname: string;

    @ManyToMany(Type => Reading, (reading) => reading.narrators)
    @JoinTable({
        name: "reading-narrator",
        joinColumn: {
            name: "narrator-id",
            referencedColumnName: "id_narrator"
        }, 
        inverseJoinColumn: {
            name: "reading-id",
            referencedColumnName: "id_reading"
        }
    })
    readings: Reading[];

    @Column({type: 'varchar', default: 'ACTIVE', length: 8})
    status: string;
}