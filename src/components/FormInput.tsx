import { FieldValues, Path } from 'react-hook-form';
import { FormInputProps } from '../types/form';

const FormInput = <T extends FieldValues>({
  label,
  name,
  type,
  defaultValue = '',
  placeholder = '',
  size = 'w-full max-w-xs',
  register,
  validationSchema,
}: FormInputProps<T>) => {
  return (
    <div className="form-control">
      <label htmlFor={name} className="label">
        {label}
      </label>
      <input
        {...register(name as Path<T>, validationSchema)}
        type={type}
        name={name}
        value={defaultValue}
        placeholder={placeholder}
        className={`input input-bordered input-primary ${size}`}
      />
    </div>
  );
};

export default FormInput;
