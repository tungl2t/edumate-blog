import AuthorType from './author.type';
import { FormatImages } from './shared';

type PostType = {
  slug: string;
  title: string;
  date: string;
  coverImage: FormatImages;
  author: AuthorType;
  excerpt: string;
  content: string;
};

export default PostType;
