import PageCharacteristicType from '@/types/page-characteristic.type';

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
  characteristics: PageCharacteristicType[];
};

export default PageType;
