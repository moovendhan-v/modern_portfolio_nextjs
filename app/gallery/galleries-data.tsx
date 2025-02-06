// galleries-data.ts
// types.ts
export interface GalleryImage {
  src: string;
  alt: string;
  title: string;
}

export interface Gallery {
  title: string;
  description: string;
  images: GalleryImage[];
}

export const galleries: Record<string, Gallery> = {
  photoshop: {
    title: 'Photoshop Edits',
    description: 'Creative photo manipulations and digital artwork',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1633177317976-3f9bc45e1d1d?w=800&q=80',
        alt: 'Cinematic Edit',
        title: 'Marvel Style Portrait',
      },
      {
        src: 'https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=800&q=80',
        alt: 'Fantasy Edit',
        title: 'Mystical Forest Scene',
      },
      {
        src: 'https://images.unsplash.com/photo-1633267538438-2d49aeb844f7?w=800&q=80',
        alt: 'Double Exposure',
        title: 'Urban Nature Blend',
      },
      {
        src: 'https://images.unsplash.com/photo-1633364036552-47307441d7ee?w=800&q=80',
        alt: 'Color Grading',
        title: 'Moody Portrait',
      },
      {
        src: 'https://images.unsplash.com/photo-1633358860515-fb1768a2c414?w=800&q=80',
        alt: 'Composite Art',
        title: 'Surreal Landscape',
      },
    ],
  },
  photography: {
    title: 'Photography',
    description: 'Portrait and lifestyle photography shots',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80',
        alt: 'Portrait',
        title: 'Natural Light Portrait',
      },
      {
        src: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?w=800&q=80',
        alt: 'Street',
        title: 'Urban Life',
      },
      {
        src: 'https://images.unsplash.com/photo-1541823709867-1b206113eafd?w=800&q=80',
        alt: 'Lifestyle',
        title: 'Coffee Shop Vibes',
      },
      {
        src: 'https://images.unsplash.com/photo-1526382925646-27b5eb86796e?w=800&q=80',
        alt: 'Portrait',
        title: 'Golden Hour',
      },
      {
        src: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&q=80',
        alt: 'Fashion',
        title: 'Street Style',
      },
    ],
  },
  gaming: {
    title: 'Gaming',
    description: 'Gaming moments and creative edits',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80',
        alt: 'Gaming Setup',
        title: 'Battle Station',
      },
      {
        src: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80',
        alt: 'Console Gaming',
        title: 'Game Night',
      },
      {
        src: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=80',
        alt: 'Retro Gaming',
        title: 'Classic Console',
      },
      {
        src: 'https://images.unsplash.com/photo-1586182987320-4f376d39d787?w=800&q=80',
        alt: 'Gaming Gear',
        title: 'RGB Setup',
      },
      {
        src: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=800&q=80',
        alt: 'Gaming Peripherals',
        title: 'Gaming Essentials',
      },
    ],
  },
  personal: {
    title: 'Personal',
    description: 'Personal moments and memories',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80',
        alt: 'Team Work',
        title: 'Collaboration',
      },
      {
        src: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80',
        alt: 'Office Life',
        title: 'Creative Meeting',
      },
      {
        src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80',
        alt: 'Travel',
        title: 'Adventure Time',
      },
      {
        src: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&q=80',
        alt: 'Workspace',
        title: 'Home Office',
      },
      {
        src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
        alt: 'Team',
        title: 'Company Culture',
      },
    ],
  },
};
