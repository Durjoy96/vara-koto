import { Checkbox } from "../ui/checkbox";
import { Field, FieldContent, FieldTitle, FieldLabel } from "../ui/field";

interface radioVehiclesProps {
  id: string;
  title: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export default function CheckboxVehcileCard({
  id,
  title,
  checked,
  onCheckedChange,
}: radioVehiclesProps) {
  return (
    <FieldLabel htmlFor={id} className="cursor-pointer">
      <Field orientation="horizontal">
        <FieldContent>
          <FieldTitle>{title}</FieldTitle>
        </FieldContent>
        <Checkbox
          value={id}
          id={id}
          checked={checked}
          onCheckedChange={onCheckedChange}
        />
      </Field>
    </FieldLabel>
  );
}
