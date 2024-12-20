const Button = ({ type = 'button', btnClass, btnText }) => {
  return (
    <button type={type} className={`btn ${btnClass}`}>
      {btnText}
    </button>
  );
};

export default Button;
