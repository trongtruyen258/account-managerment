import { FormGroup, Input, Label } from "reactstrap";

export default function InputField(props) {
  const { id, label, value, onChange, type, disabled } = props;
  return (
    <FormGroup>
      <Label for={id}>{label}:</Label>
      <Input
        id={id}
        placeholder={`Input ${label}`}
        onChange={onChange}
        value={value}
        name={id}
        type={type}
        disabled={disabled ? disabled : false}
      />
    </FormGroup>
  );
}
