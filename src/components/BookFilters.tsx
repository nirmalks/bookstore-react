import { Link, useLoaderData, useNavigate, useSubmit } from 'react-router';
import FormInput from './FormInput';
import { useForm } from 'react-hook-form';
import FormSelect from './FormSelect';
import FormRange from './FormRange';

const BookFilters = () => {
  const { books, meta, params, genres } = useLoaderData();
  const genreList = genres.map((genre) => genre.name);
  const sortByList = ['title', 'genres', 'price'];
  const sortOrderList = ['asc', 'desc'];
  const { search, price, genre, minPrice, maxPrice } = params;
  const { register, handleSubmit } = useForm();
  const submit = useSubmit();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    console.log('on submit');
    console.log(data);
    const queryParams = new URLSearchParams({
      ...data,
      minPrice: 0,
      maxPrice: data.price,
    });
    console.log(queryParams);
    const customUrl = `/books/search?${queryParams.toString()}`;
    console.log('custom url', customUrl);
    const formData = new FormData();
    for (const [key, value] of queryParams.entries()) {
      formData.append(key, value);
    }
    submit(formData, { method: 'get' });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 items-center"
      >
        <FormInput
          type="search"
          label="Search Book"
          name="search"
          size="input-sm"
          defaultValue={search}
          register={register}
        />
        <FormSelect
          label="Genre"
          name="genre"
          size="input-sm"
          list={genreList}
          register={register}
        ></FormSelect>
        <FormRange
          name="price"
          label="Choose price range"
          size="range-sm"
          value={price}
          maxValue="1000"
          register={register}
        ></FormRange>
        <FormSelect
          label="Sort By"
          name="sortBy"
          size="input-sm"
          list={sortByList}
          register={register}
        ></FormSelect>
        <FormSelect
          label="Sort Order"
          name="sortOrder"
          size="input-sm"
          list={sortOrderList}
          register={register}
        ></FormSelect>
        <button type="submit" className="btn btn-primary btn-sm">
          Search
        </button>
        <Link to="/books" className="btn btn-accent btn-sm">
          Reset
        </Link>
      </form>
    </>
  );
};
export default BookFilters;
