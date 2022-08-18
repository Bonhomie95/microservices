import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity("tbl_organization")
@Unique(["name", "countryCode"])
class Organization extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public name!: string;

    @Column()
    public countryCode!: string;

    @Column({ type: "uuid" })
    public owner!: string;

    @CreateDateColumn({ type: "timestamp" })
    public createdAt!: Date;

    @Column({ type: "uuid", nullable: true })
    public updatedBy!: string;

    @UpdateDateColumn({
        type: "timestamp"
    })
    public updatedAt!: Date;

}

export default Organization;