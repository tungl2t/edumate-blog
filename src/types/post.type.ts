import AuthorType from './author.type';

type PostType = {
  slug: string;
  title: string;
  date: string;
  coverImage: {
    url: string;
  };
  author: AuthorType;
  excerpt: string;
  content: string;
};

export default PostType;
