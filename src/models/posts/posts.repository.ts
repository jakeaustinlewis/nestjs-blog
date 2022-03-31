import { EntityRepository, Repository } from 'typeorm';
import { GetPostsFilterDto } from './dtos/get-posts-filter.dto';
import { Post } from './entities/post.entity';

@EntityRepository(Post)
export class PostsRepository extends Repository<Post> {
  async getPosts(filterDto: GetPostsFilterDto): Promise<Post[]> {
    const { limit, offset } = filterDto;

    const query = this.createQueryBuilder('task');

    if (limit) {
      query.take(limit);
    }
    if (offset) {
      query.skip(offset);
    }

    const tasks = await query.getMany();
    return tasks;
  }
}
