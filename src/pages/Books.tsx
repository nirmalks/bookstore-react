import BookFilters from '../components/BookFilters';
import BooksContainer from '../components/BooksContainer';
import { api } from '../utils/api';

const booksSearchUrl = '/books/search';
const getGenreUrl = '/genres';

const allBooksQuery = (queryParams) => {
  const { search, genre, sort, minPrice, maxPrice, shipping, page } =
    queryParams;

  return {
    queryKey: [
      'books',
      search ?? '',
      genre ?? '',
      sort ?? 'a-z',
      minPrice ?? 0,
      maxPrice ?? 1000,
      shipping ?? false,
      page ?? 1,
    ],
    queryFn: () =>
      api.get(booksSearchUrl, {
        params: queryParams,
      }),
  };
};

const genreQuery = () => {
  return {
    queryKey: ['getGenres'],
    queryFn: () => {
      return api.get(getGenreUrl);
    },
  };
};
export const booksLoader =
  (queryClient) =>
  async ({ request }) => {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    const response = await queryClient.ensureQueryData(allBooksQuery(params));
    const genreResponse = await queryClient.ensureQueryData(genreQuery());
    const { content: books, ...meta } = response.data;
    const { content: genres } = genreResponse.data;
    return { books, params, meta, genres };
  };

const Books = () => {
  return (
    <>
      <BookFilters />
      <BooksContainer />
    </>
  );
};
export default Books;
