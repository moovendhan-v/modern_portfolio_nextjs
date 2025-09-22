import HomePage from '@/app/components/HomePage';
import type { Testimonial, Service } from '@/lib/types';

export default async function Page() {
  try {
    const [testimonialsResponse, servicesResponse] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/testimonials`),
      fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/service`),
    ]);

    if (!testimonialsResponse.ok || !servicesResponse.ok) {
      console.error('Failed to fetch testimonials or services');
      return <HomePage testimonials={[]} services={[]} />;
    }

    const testimonials: Testimonial[] = await testimonialsResponse.json();
    const services: Service[] = await servicesResponse.json();

    console.log("TESTIMONIALS:::", testimonials);
    console.log("SERVICES:::", services);

    if (!Array.isArray(testimonials) || !Array.isArray(services)) {
      console.error('Invalid testimonials or services data');
      return <HomePage testimonials={[]} services={[]} />;
    }

    return <HomePage testimonials={testimonials} services={services} />;
  } catch (error) {
    console.error('Error fetching data:', error);
    return <HomePage testimonials={[]} services={[]} />;
  }
}
