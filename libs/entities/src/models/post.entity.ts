import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { EntityBase } from './entity.base';
import { Thread } from './thread.entity';

// TODO: ADD MISSING FIELDS IF NEEDED
@Entity('posts')
export class PostEntity extends EntityBase {
  @Column({ name: 'external_uuid' })
  externalUuid: string;

  @Column({ name: 'url' })
  url: string;

  @Column({ name: 'ord_in_thread', type: 'int', default: 0 })
  ordInThread: number;

  @Column({ name: 'parent_url', nullable: true })
  parentUrl?: string;

  @Column({ name: 'author' })
  author: string;

  @Column({ name: 'published_at', type: 'timestamptz' })
  publishedAt?: Date;

  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'text', type: 'text' })
  text: string;

  @Column({ name: 'highlight_text', type: 'text', nullable: true })
  highlightText?: string;

  @Column({ name: 'highlight_title', default: '' })
  highlightTitle: string;

  @Column({ name: 'highlight_thread_title', default: '' })
  highlightThreadTitle: string;

  @Column({ name: 'language', default: '' })
  language: string;

  @OneToOne(() => Thread)
  @JoinColumn({ name: 'thread_id' })
  thread: Thread;
}
