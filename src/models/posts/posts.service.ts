import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GetPostsFilterDto } from './dtos/get-posts-filter.dto';
import { PostDto } from './dtos/post.dto';
import { Post } from './entities/post.entity';
import { PostMapper } from './mappers/post.mapper';
import { PostsRepository } from './posts.repository';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsRepository)
    private postsRepo: PostsRepository,
  ) {}

  public async getPosts(filterDto?: GetPostsFilterDto): Promise<Post[]> {
    return this.postsRepo.getPosts(filterDto);
  }

  public async getPostById(id: string): Promise<PostDto> {
    const post = await this.postsRepo.findOne({ id });

    if (!post) {
      throw new NotFoundException(`post with ID "${id}" not found`);
    }
    return PostMapper.fromEntity(post);
  }

  public async createPost(postDto: PostDto): Promise<PostDto> {
    const post = PostMapper.toEntity(postDto);
    await this.postsRepo.save(post);
    return PostMapper.fromEntity(post);
  }

  public async updatePost(id: string, postDto: PostDto): Promise<PostDto> {
    const post = await this.getPostById(id);
    const postToUpdate = PostMapper.toEntityUpdate(postDto);

    const updatedPost = { ...post, ...postToUpdate } as Post;

    await this.postsRepo.save(updatedPost);

    return PostMapper.fromEntity(updatedPost);
  }

  public async deletePost(id: string): Promise<void> {
    const { affected } = await this.postsRepo.delete(id);

    if (affected !== 1) {
      throw new NotFoundException(`post with ID "${id}" not found`);
    }
  }
}
