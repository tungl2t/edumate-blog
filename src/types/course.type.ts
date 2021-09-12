import TestimonialType from './testimonial.type';
import TrainerType from './trainer.type';
import { FormatImages } from './shared';

type CourseType = {
  title: string;
  slug: string;
  coursePath: string;
  excerpt: string;
  content: string;
  coverImage: FormatImages;
  testimonials: TestimonialType[];
  trainers: TrainerType[];
};

export default CourseType;
