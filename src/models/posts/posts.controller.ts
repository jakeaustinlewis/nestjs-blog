import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { CollectionResponse } from '../../common/dtos/collection-response.dto';
import HttpMethod from '../../common/enum/http-method.enum';
import { ValidationPipe } from '../../common/pipes/validation.pipe';
import { User } from '../auth/entities/user.entity';
import { GetPostsFilterDto } from './dtos/get-posts-filter.dto';
import { PostDto } from './dtos/post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
@UseGuards(AuthGuard())
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  async getPosts(
    @Query(new ValidationPipe(HttpMethod.Get)) filterDto: GetPostsFilterDto,
  ): Promise<CollectionResponse<GetPostsFilterDto>> {
    const posts = await this.postsService.getPosts(filterDto);
    return new CollectionResponse(posts, posts.length);
  }

  @Get('/:id')
  getPost(@Param('id') id: string): Promise<PostDto> {
    return this.postsService.getPostById(id);
  }

  @Post() createPost(
    @Body(new ValidationPipe(HttpMethod.Post)) createPostDto: PostDto,
    @GetUser() user: User,
  ): Promise<PostDto> {
    return this.postsService.createPost(createPostDto, user);
  }

  @Patch('/:id') async updatePost(
    @Param('id') id: string,
    @Body(new ValidationPipe(HttpMethod.Patch))
    postDto: PostDto,
  ): Promise<PostDto> {
    return this.postsService.updatePost(id, postDto);
  }

  @Delete('/:id') deletePost(@Param('id') id: string): Promise<void> {
    return this.postsService.deletePost(id);
  }
}
