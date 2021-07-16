type EventType = {
  title: string;
  slug: string;
  url: string;
  location: string;
  detail: boolean;
  startDate: string;
  endDate: string;
  detailLink: string;
  content: string;
  coverImage: {
    url: string;
  };
};

export default EventType;
