import { Link, useLoaderData, useSubmit } from 'react-router';
import FormInput from './FormInput';
import { useForm } from 'react-hook-form';

const BookFilters = () => {
  const { books, meta, params } = useLoaderData();
  const { search, company, category, shipping, order, price } = params;
  const { register, handleSubmit } = useForm();
  const submit = useSubmit();

  const onSubmit = (data) => {
    const queryParams = new URLSearchParams(data).toString();
    const customUrl = `/books/search?${queryParams}`;
    return submit(null, { action: customUrl, method: 'get' });
  };
  return (
    <>
      <form
        onSubmit={onSubmit}
        className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4  gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center"
      >
        <FormInput
          type="search"
          label="search product"
          name="search"
          size="input-sm"
          defaultValue={search}
          register={register}
          validationSchema={{
            required: 'password is required',
            minLength: {
              value: 3,
              message: 'Please enter a minimum of 3 characters',
            },
          }}
        />
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
