import { Injectable } from '@nestjs/common';
import { EntityBase } from '@app/entities';
import {
  DataSource,
  EntityTarget,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';

@Injectable()
export class BaseRepository<
  TEntity extends EntityBase,
> extends Repository<TEntity> {
  protected readonly alias: string;

  constructor(
    target: EntityTarget<TEntity>,
    dataSource: DataSource,
    alias: string,
  ) {
    super(target, dataSource.createEntityManager());
    this.alias = alias;
  }

  protected selectQueryBuilder(
    id: number,
    ...includeRelations: string[]
  ): SelectQueryBuilder<TEntity> {
    const queryBuilder = this.createQueryBuilder(this.alias);
    this.addDirectRelationsToQueryBuilder(queryBuilder, ...includeRelations);
    return queryBuilder.andWhere(`${this.alias}.id = :id`, { id });
  }

  protected selectManyQueryBuilder(
    ...includeRelations: string[]
  ): SelectQueryBuilder<TEntity> {
    const queryBuilder = this.createQueryBuilder(this.alias);
    if (includeRelations)
      this.addDirectRelationsToQueryBuilder(queryBuilder, ...includeRelations);
    return queryBuilder;
  }

  protected addDirectRelationsToQueryBuilder(
    queryBuilder: SelectQueryBuilder<TEntity>,
    ...includeRelations: string[]
  ): void {
    for (const relation of includeRelations) {
      const entities = relation.split('.');
      if (entities.length > 1) {
        const nestedRelation = relation.replace('.', '_');
        queryBuilder.leftJoinAndSelect(relation, nestedRelation);
      } else {
        queryBuilder.leftJoinAndSelect(
          `${queryBuilder.alias}.${relation}`,
          relation,
        );
      }
    }
  }

  getById(id: number): Promise<TEntity | null> {
    return this.createQueryBuilder(this.alias)
      .where(`${this.alias}.id =:id`, { id })
      .getOne();
  }

  getByIdOrFail(id: number): Promise<TEntity | null> {
    return this.createQueryBuilder(this.alias)
      .where(`${this.alias}.id =:id`, { id })
      .getOneOrFail();
  }

  getByIds(ids: number[]): Promise<TEntity[]> {
    return this.createQueryBuilder(this.alias)
      .where(`${this.alias}.id IN (:ids)`, { ids })
      .getMany();
  }
}
