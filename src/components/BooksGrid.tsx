import { Link, useLoaderData } from 'react-router';
import { formatPrice } from '../utils';
import { Book } from '../types/books';

const BooksGrid: React.FC = () => {
  const { books } = useLoaderData();

  return (
    <div className="pt-24 p-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {books &&
        books.map((book: Book) => {
          const { title, price, imagePath } = book;
          const formattedPrice = formatPrice(price);
          const image = `/images/${imagePath}`;
          return (
            <Link
              key={book.id}
              to={`/books/${book.id}`}
              className="card w-full shadow-xl hover:shadow-2xl transition duration-300"
            >
              <figure className="px-4 pt-4">
                <img
                  src={image}
                  alt={title}
                  className="rounded-xl h-64 md:h-48 w-full object-cover"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title capitalize tracking-wider">
                  {title}
                </h2>
                <span className="text-secondary">{formattedPrice}</span>
              </div>
            </Link>
          );
        })}
    </div>
  );
};

export default BooksGrid;
