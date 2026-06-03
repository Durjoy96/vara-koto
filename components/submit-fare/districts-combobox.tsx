import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { useEffect, useState } from "react";

interface districtsProps {
  setDistrict: (value: string | null) => void;
}

export function DistrictsCombobox({ setDistrict }: districtsProps) {
  const [districts, setDistricts] = useState<string[]>([]);

  useEffect(() => {
    fetch("/districts.json")
      .then((res) => res.json())
      .then((data) => {
        const names = data.districts.map((d: any) => d.bn_name);
        setDistricts(names);
      });
  }, []);

  return (
    <Combobox
      onValueChange={(value) => setDistrict(value as string | null)}
      items={districts}
    >
      <ComboboxInput
        className="text-sm lg:text-base h-11 lg:h-12"
        placeholder="এলাকা নির্বাচন করুন"
      />
      <ComboboxContent>
        <ComboboxEmpty>কিছু খুঁজে পাওয়া যায়নি</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
