function InputField({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  icon: Icon,
  name,
}) {
  return (
    <div className="field">
      {label && <label htmlFor={name}>{label}</label>}

      <div className="input-wrapper">
        {Icon && <Icon size={17} />}

        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

export default InputField;