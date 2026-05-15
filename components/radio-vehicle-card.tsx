import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "./ui/field";
import { RadioGroupItem } from "./ui/radio-group";

interface radioVehiclesProps {
  id: string;
  title: string;
}

export default function RadioVehicleCard({ id, title }: radioVehiclesProps) {
  return (
    <FieldLabel htmlFor={id} className="cursor-pointer">
      <Field orientation="horizontal">
        <FieldContent>
          <FieldTitle>{title}</FieldTitle>
        </FieldContent>
        <RadioGroupItem value={id} id={id} />
      </Field>
    </FieldLabel>
  );
}
