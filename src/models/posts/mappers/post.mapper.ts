import { Entity } from 'typeorm';
import { PostDto } from '../dtos/post.dto';
import { Post } from '../entities/post.entity';

@Entity()
export class PostMapper {
  public static toEntity(postDto: PostDto): Post {
    const post = new Post();
    post.title = postDto.title;
    post.description = postDto.description;
    post.image = postDto.image;
    post.user = postDto.user;

    return post;
  }

  public static fromEntity(post: Post): PostDto {
    const postDto = new PostDto();
    postDto.id = post.id;
    postDto.title = post.title;
    postDto.description = post.description;
    postDto.image = post.image;
    postDto.createdAt = post.createdAt;
    postDto.updatedAt = post.updatedAt;
    postDto.user = post.user;

    return postDto;
  }

  public static toEntityUpdate(postDto): Post {
    const post = new Post();

    if (postDto.title) {
      post.title = postDto.title;
    }

    if (postDto.description) {
      post.description = postDto.description;
    }

    if (postDto.image) {
      post.image = postDto.image;
    }

    return post;
  }
}
