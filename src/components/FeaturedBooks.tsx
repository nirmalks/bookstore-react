import BooksGrid from './BooksGrid';
import SectionTitle from './SectionTitle';

const FeaturedProducts = () => {
  return (
    <div className="pt-24 p-8">
      <SectionTitle text="Featured Books" />
      <BooksGrid />
    </div>
  );
};

export default FeaturedProducts;
