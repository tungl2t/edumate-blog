import TestimonialType from './testimonial.type';
import TrainerType from './trainer.type';

type CourseType = {
  title: string;
  slug: string;
  coursePath: string;
  excerpt: string;
  content: string;
  coverImage: {
    url: string;
    small: string;
    medium: string;
    large: string;
    thumbnail: string;
  };
  testimonials: TestimonialType[];
  trainers: TrainerType[];
};

export default CourseType;
