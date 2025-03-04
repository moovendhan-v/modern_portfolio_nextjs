import {
  LucideIcon
} from 'lucide-react';

export interface Testimonial {
  id: number;
  name: string;
  image: string;
  rating: number;
  text: string;
  additionalInfo: {
    projectDuration: string;
    servicesUsed: string;
    completionDate: string;
  };
}

export interface Service {
  title: string;
  description: string;
  image: string;
  icon: LucideIcon;
}

export interface Gallery {
  title: string;
  description: string;
  icon: string;
  image: string;
  category: string;
}