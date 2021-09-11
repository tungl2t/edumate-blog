type EventType = {
  title: string;
  slug: string;
  eventPath: string;
  location: string;
  startDate: string;
  endDate: string;
  detailLink: string;
  content: string;
  coverImage: {
    url: string;
    small: string;
    medium: string;
    large: string;
    thumbnail: string;
  };
};

export default EventType;
