import { Link, redirect, useSubmit } from 'react-router';
import { toast } from 'react-toastify';
import { customFetch } from '../utils';
import { Form } from 'react-router';
import FormInput from '../components/FormInput';
import { SubmitBtn } from '../components/SubmitBtn';
import { useForm } from 'react-hook-form';

export const registerAction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    const response = await customFetch.post('/register', data);
    toast.success('User registered successfully');
    return redirect('/login');
  } catch (error) {
    const errorMessage =
      error?.response?.data?.error?.message || 'Incorrect credentials';
    toast.error(errorMessage);
    return null;
  }
};

const Register: React.FC = () => {
  const { register, handleSubmit } = useForm();
  const submit = useSubmit();

  const onSubmit = (data) => {
    return submit(data, { method: 'post' });
  };
  return (
    <section className="h-screen grid place-items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="card w-96 p-8 bg-base-200 shadow-lg flex flex-col gap-y-4"
      >
        <h4 className="text-center text-3xl font-bold">Register</h4>
        <FormInput
          type="text"
          label="Username"
          name="username"
          register={register}
          validationSchema={{
            required: 'username is required',
            minLength: {
              value: 3,
              message: 'Please enter a minimum of 3 characters',
            },
          }}
        />
        <FormInput
          type="email"
          label="Email"
          name="email"
          register={register}
          validationSchema={{
            required: 'username is required',
            minLength: {
              value: 3,
              message: 'Please enter a minimum of 3 characters',
            },
          }}
        />
        <FormInput
          type="password"
          label="Password"
          name="password"
          register={register}
          validationSchema={{
            required: 'username is required',
            minLength: {
              value: 3,
              message: 'Please enter a minimum of 3 characters',
            },
          }}
        />
        <div className="mt-4">
          <SubmitBtn text="Register" />
        </div>
        <p className="text-center">
          Already a member?
          <Link
            to="/login"
            className="ml-2 link link-hover link-primary capitalize"
          >
            Login
          </Link>
        </p>
      </form>
    </section>
  );
};
export default Register;
