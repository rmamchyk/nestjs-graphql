import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Author } from './author.interface';
import { CreateAuthorDTO } from './dto/CreateAuthorDTO';
import { UpdateAuthorDTO } from './dto/UpdateAuthorDTO';

@Injectable()
export class AuthorService {
    constructor(
        @InjectModel('Author') private authorModel: Model<Author>,
    ) {}

    async create(author: CreateAuthorDTO): Promise<Author> {
        return await this.authorModel.create(author);
    }

    async find(): Promise<Author[]> {
        return await this.authorModel.find();
    }

    async findById(id: string): Promise<Author> {
        const found = await this.authorModel.findById(id);
        if (!found) {
            throw new NotFoundException('Could not find author');
        }
        return found;
    }

    async delete(id: string): Promise<string> {
        const result = await this.authorModel.remove({ _id: id });
        if (!result.n) {
            throw new NotFoundException('Could not find author');
        }
        return `Author with ID ${id} has been deleted`;
    }

    async update(id: string, author: UpdateAuthorDTO): Promise<Author> {
        const found = await this.findById(id);
        const { firstName, lastName } = author;
        if (firstName) {
            found.firstName = firstName;
        }
        if (lastName) {
            found.lastName = lastName;
        }
        await found.save();

        return found;
    }

}
