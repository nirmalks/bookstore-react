import BookFilters from '../components/BookFilters';
import BooksContainer from '../components/BooksContainer';
import { api } from '../utils/api';

const url = '/books';

const allBooksQuery = (queryParams) => {
  const { search, category, company, sort, price, shipping, page } =
    queryParams;

  return {
    queryKey: [
      'books',
      search ?? '',
      category ?? 'all',
      company ?? 'all',
      sort ?? 'a-z',
      price ?? 100000,
      shipping ?? false,
      page ?? 1,
    ],
    queryFn: () =>
      api.get(url, {
        params: queryParams,
      }),
  };
};
export const booksLoader =
  (queryClient) =>
  async ({ request }) => {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    const response = await queryClient.ensureQueryData(allBooksQuery(params));
    return { products, meta, params };
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
