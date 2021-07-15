import TestimonialType from './testimonial.type';
import TrainerType from './trainer.type';

type CourseType = {
  title: string;
  slug: string;
  url: string;
  detail: boolean;
  excerpt: string;
  content: string;
  coverImage: {
    url: string;
  };
  testimonials: TestimonialType[];
  trainers: TrainerType[];
};

export default CourseType;
