import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { TasksService } from './tasks.service';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
    private readonly taskService: TasksService,
  ) {}

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const { task_id, content, created_by } = createCommentDto;

    const task = await this.taskService.findOne(task_id);

    if (!task) {
      throw new NotFoundException('task not found');
    }

    const newComment = new Comment();
    newComment.content = content;
    newComment.created_by = created_by;
    newComment.task_id = task_id;
    newComment.created_at = new Date().toLocaleString();
    newComment.updated_at = new Date().toLocaleString();
    return await this.commentRepository.save(newComment);
  }

  async findAllByTask(task_id: number): Promise<Comment[]> {
    const task = await this.taskService.findOne(task_id);

    if (!task) {
      throw new NotFoundException('task not found');
    }

    return await this.commentRepository.find({ where: { task_id } });
  }

  async findOne(id: number): Promise<Comment> {
    return await this.commentRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateCommentDto: UpdateCommentDto,
  ): Promise<Comment> {
    const toUpdate = await this.commentRepository.findOne({
      where: { id },
    });

    const updated = Object.assign(toUpdate, updateCommentDto);

    updated.updated_at = new Date().toLocaleString();
    return await this.commentRepository.save(updated);
  }

  async remove(id: number): Promise<Comment> {
    const task = await this.commentRepository.findOne({ where: { id } });

    if (!task) {
      throw new NotFoundException('TaskStatus not found');
    }

    return await this.commentRepository.remove(task);
  }
}
