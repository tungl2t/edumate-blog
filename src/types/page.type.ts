type PageType = {
  name: string;
  path: string;
  description: string;
  enabled: boolean;
  order: number;
  content: string;
  coverImage: {
    url: string;
    small: string;
    medium: string;
    large: string;
    thumbnail: string;
  };
};

export default PageType;
