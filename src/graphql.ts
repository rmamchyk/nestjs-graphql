
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export interface CreateAuthorInput {
    firstName: string;
    lastName: string;
}

export interface UpdateAuthorInput {
    firstName?: string;
    lastName?: string;
}

export interface Address {
    id: string;
    zipCode?: string;
    phone?: string;
    city?: string;
}

export interface Author {
    id: string;
    firstName?: string;
    lastName?: string;
    posts?: Post[];
    address?: Address;
}

export interface IMutation {
    createAuthor(author: CreateAuthorInput): Author | Promise<Author>;
    deleteAuthor(id: string): string | Promise<string>;
    updateAuthor(id: string, author?: UpdateAuthorInput): Author | Promise<Author>;
}

export interface Post {
    id: string;
    title: string;
}

export interface IQuery {
    allAuthors(): Author[] | Promise<Author[]>;
    author(id: string): Author | Promise<Author>;
}
