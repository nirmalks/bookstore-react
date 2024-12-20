const FormInput: React.FC = ({
  label,
  name,
  type,
  defaultValue = '',
  placeholder = '',
  size = 'w-full max-w-xs',
  register,
  validationSchema,
}) => {
  return (
    <div className="form-control">
      <label htmlFor={name} className="label">
        {label}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className={`input input-bordered input-primary ${size}`}
        {...register(name, validationSchema)}
      />
    </div>
  );
};

export default FormInput;
