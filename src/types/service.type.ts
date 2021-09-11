type ServiceType = {
  slug: string;
  title: string;
  content: string;
  coverImage: {
    url: string;
    small: string;
    medium: string;
    large: string;
    thumbnail: string;
  };
};

export default ServiceType;
