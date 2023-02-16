import {
  BaseEntity,
  Entity,
  Unique,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@Unique(['nome'])
export class EmpresaEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  nome: string;

  @Column({ nullable: false, type: 'varchar', length: 1 })
  classificacao: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // constructor(empresa?: Partial<EmpresaEntity>) {
  //   super();
  //   this.id = empresa?.id;
  //   this.nome = empresa?.nome;
  //   this.classificacao = empresa?.classificacao;
  //   this.createdAt = empresa?.createdAt;
  //   this.updatedAt = empresa?.updatedAt;
  // }
}
