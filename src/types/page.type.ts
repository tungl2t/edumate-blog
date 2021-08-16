type PageType = {
  name: string;
  path: string;
  description: string;
  enabled: boolean;
  order: number;
  content: string;
  coverImage: {
    url: string;
  };
};

export default PageType;
