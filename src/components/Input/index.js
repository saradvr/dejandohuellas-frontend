export function Input({ type, name, id, value, onChange, required }) {
  return (
    <input
      type={type}
      name={name}
      id={id}
      required={required}
      value={value}
      onChange={onChange}
    />
  );
}
