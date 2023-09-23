import { FormGroup, Input, Label } from "reactstrap";

export default function SelectField(props) {
  const { id, label, value, onChange, type, listOption, name } = props;
  return (
    <FormGroup>
      <Label for={id}>{label}:</Label>
      <Input
        id={id}
        onChange={onChange}
        value={value}
        name={name}
        type={type}
        key={id}
      >
        <option key={`${id}0`}>{label}</option>
        {listOption.map((option) => {
          return (
            <option key={id + option.id} value={option.id}>
              {option.name}
            </option>
          );
        })}
      </Input>
    </FormGroup>
  );
}
