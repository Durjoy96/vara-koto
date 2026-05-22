"use client";

import { supabase } from "@/lib/supabase";
import BanglishToBangla from "@/utils/banglish-to-bangla";
import isBangla from "@/utils/isBangla";
import { useEffect, useRef, useState } from "react";

interface AutoCompleteProps {
  value: string;
  setValue: (v: string) => void;
}

export default function AutoCompleteCard({
  value,
  setValue,
}: AutoCompleteProps) {
  const [autocompleteVisible, setAutocompleteVisible] =
    useState<Boolean>(false);
  const [fromData, setFromData] = useState<Array<string | boolean> | null>(
    null,
  );
  const skipSearch = useRef(false);

  useEffect(() => {
    if (skipSearch.current) {
      skipSearch.current = false;
      return;
    }

    const delayTimer = setTimeout(async () => {
      if (value.length > 1) {
        let queryText = "";

        if (!isBangla(value)) {
          queryText = await BanglishToBangla(value);
        } else {
          queryText = value;
        }

        const { data, error } = await supabase
          .from("fares")
          .select("standardized_from_bn, standardized_to_bn")
          .or(
            `standardized_from_bn.ilike.%${queryText}%,standardized_to_bn.ilike.%${queryText}%`,
          )
          .limit(8);

        if (error) {
          console.error(error);
          return;
        }

        if (data) {
          const allPlaces = [
            ...data.map(
              (r) =>
                r.standardized_from_bn.includes(queryText) &&
                r.standardized_from_bn,
            ),

            ...data.map(
              (r) =>
                r.standardized_to_bn.includes(queryText) &&
                r.standardized_to_bn,
            ),
          ];
          const uniquePlaces = [...new Set(allPlaces)];
          setFromData(uniquePlaces);
          setAutocompleteVisible(true);
        }
      }
    }, 300);

    return () => clearTimeout(delayTimer);
  }, [value]);
  return (
    <>
      {fromData !== null &&
        fromData?.length > 0 &&
        autocompleteVisible === true && (
          <div className="z-50 absolute left-0 right-0 -bottom-10 bg-card px-1 py-1 rounded-xl border">
            {fromData?.map(
              (i, idx) =>
                i !== false && (
                  <div
                    key={idx}
                    onClick={() => {
                      skipSearch.current = true;
                      setValue(i as string);
                      setAutocompleteVisible(false);
                    }}
                    className="text-sm hover:bg-secondary hover:text-secondary-foreground px-1 py-1 rounded-lg truncate"
                  >
                    {i}
                  </div>
                ),
            )}
          </div>
        )}
    </>
  );
}
