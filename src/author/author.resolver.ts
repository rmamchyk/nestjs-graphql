import { Resolver, Query, Args, Mutation, ResolveProperty, Parent } from '@nestjs/graphql';
import { Author } from '../author/author.interface';
import { AuthorService } from './author.service';
import { CreateAuthorDTO } from './dto/CreateAuthorDTO';
import { UpdateAuthorDTO } from './dto/UpdateAuthorDTO';

@Resolver('Author')
export class AuthorResolver {
    constructor(
        private authorService: AuthorService,
    ) {}

    @Query()
    async allAuthors(): Promise<Author[]> {
        return await this.authorService.find();
    }

    @Query()
    async author(@Args('id') id: string): Promise<Author> {
        return await this.authorService.findById(id);
    }

    @ResolveProperty()
    posts(@Parent() author: Author) {
        // fetch all the posts from mongodb post collection by authorId
        return [
            {
                id: '1',
                title: 'GraphQL vs REST'
            },
        ];
    }

    @ResolveProperty()
    address(@Parent() author) {
        // fetch the address by authorId
        return {
            id: '1',
            zipCode: '123123',
            phone: '123456789',
            city: 'LHR',
        };
    }

    @Mutation()
    async createAuthor(@Args('author') author: CreateAuthorDTO): Promise<Author> {
        return await this.authorService.create(author);
    }

    @Mutation()
    async deleteAuthor(@Args('id') id): Promise<string> {
        return await this.authorService.delete(id);
    }

    @Mutation()
    async updateAuthor(
        @Args('id') id: string,
        @Args('author') author: UpdateAuthorDTO,
    ): Promise<Author> {
        return await this.authorService.update(id, author);
    }
}
