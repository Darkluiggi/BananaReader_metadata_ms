import { EntityRepository, Repository } from "typeorm";
import { Narrator } from "./entities/narrator.entity";

@EntityRepository(Narrator)
export class NarratorRepository extends Repository<Narrator>{}