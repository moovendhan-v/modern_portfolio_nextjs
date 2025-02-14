import HomePage from '@/app/components/HomePage';

export default async function Page() {
  const response = await fetch('http://localhost:3000/api/testimonials');
  const testimonials = await response.json();
  
  return <HomePage testimonials={testimonials} />;
}