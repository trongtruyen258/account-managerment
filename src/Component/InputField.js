import { FormGroup, Input, Label } from "reactstrap";

export default function InputField(props) {
  const { checked, id, label, value, onChange, type, disabled, name } = props;
  return (
    <FormGroup>
      <Label for={id}>{label}</Label>
      <Input
        id={id}
        placeholder={`Input ${label}`}
        onChange={onChange}
        value={value}
        name={name}
        type={type}
        disabled={disabled ? disabled : false}
        checked={checked}
        key={id}
      />
    </FormGroup>
  );
}
