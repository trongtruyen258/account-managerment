import { Button } from "reactstrap";

export default function ButtonComponent(props) {
  const { name, color, handleClick } = props;
  return (
    <Button color={color} onClick={handleClick}>
      {name}
    </Button>
  );
}
