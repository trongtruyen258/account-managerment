import { FormGroup, Input, Label } from "reactstrap";

export default function SelectField(props) {
  const { id, label, value, onChange, type, listOption } = props;
  return (
    <FormGroup>
      <Label for={id}>{label}:</Label>
      <Input id={id} onChange={onChange} value={value} name={id} type={type}>
        <option key={0}>{label}</option>
        {listOption.map((option) => {
          return (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          );
        })}
      </Input>
    </FormGroup>
  );
}
