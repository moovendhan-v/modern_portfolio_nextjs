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