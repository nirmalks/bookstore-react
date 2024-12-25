import FeaturedBooks from '../components/FeaturedBooks';
import Hero from '../components/Hero';
import { queryClient } from '../queryClient';
import { api } from '../utils/api';

const url = '/books';

const featuredBooksQuery = {
  queryKey: ['featuredBooks'],
  queryFn: () => {
    const response = api.get(url);
    return response;
  },
};

export const landingLoader = (queryClient) => async () => {
  try {
    const response = await queryClient.ensureQueryData(featuredBooksQuery);
    const books = response.data.content;
    return { books };
  } catch (error) {
    console.error('Error fetching featured books:', error);
    return {};
  }
};

const Landing: React.FC = () => {
  return (
    <>
      <Hero></Hero>
      <FeaturedBooks></FeaturedBooks>
    </>
  );
};
export default Landing;
