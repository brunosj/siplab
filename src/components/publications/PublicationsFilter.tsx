import React, { useState, useMemo, useEffect, useCallback } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { formatPublicationType } from "@/utils/utils";
import { PublicationTypes } from "@/types/ResponsesInterface";

interface PublicationFilterProps {
  publications: PublicationTypes[];
  locale: string;
  onFilterChange: (selectedType: string[]) => void;
}

const PublicationFilter: React.FC<PublicationFilterProps> = ({
  publications,
  locale,
  onFilterChange,
}) => {
  const [selectedType, setSelectedType] = useState<string[]>([]);

  const types = useMemo(
    () =>
      Array.from(
        new Set(
          publications
            .map((pub) => pub.attributes.type)
            .sort((a, b) => a.localeCompare(b))
        )
      ),
    [publications]
  );

  const handleSelectAllTypes = () => {
    if (selectedType.length === types.length) {
      setSelectedType([]);
    } else {
      setSelectedType(types);
    }
  };

  const handleTypeCheckboxChange = useCallback(
    (type: string) => {
      if (selectedType.includes(type)) {
        setSelectedType(selectedType.filter((selected) => selected !== type));
      } else {
        setSelectedType([...selectedType, type]);
      }
    },
    [selectedType]
  );

  const filteredPublications = useMemo(() => {
    if (selectedType.length === 0) {
      return publications;
    }
    return publications.filter((pub) =>
      selectedType.includes(pub.attributes.type)
    );
  }, [selectedType, publications]);

  // Notify the parent component about the filter change when selectedType changes
  useEffect(() => {
    onFilterChange(selectedType);
  }, [selectedType, onFilterChange]);

  return (
    <div className="w-full border-t border-pri-dark  text-xs text-fontPri  dark:border-t-pri-dark  dark:text-fontPri-dark lg:w-3/5 lg:text-sm">
      <div className="pt-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-pri-dark lg:text-base">
            Type
          </span>
          {/* <PlusIcon className="h-4 w-4 rotate-45" /> */}
        </div>
        <div className="grid grid-cols-2 gap-2 py-4 lg:grid-cols-1">
          <label className="">
            <input
              type="checkbox"
              value="All"
              className="mr-2 accent-orange lg:mr-4"
              checked={selectedType.length === types.length}
              onChange={handleSelectAllTypes}
            />
            {locale === "en" ? "All" : "Tout"}
          </label>
          {types.map((type, index) => (
            <label key={index} className="">
              <input
                type="checkbox"
                value={type}
                className="mr-2 accent-orange lg:mr-4"
                checked={selectedType.includes(type)}
                onChange={() => handleTypeCheckboxChange(type)}
              />
              {formatPublicationType(type, locale)}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PublicationFilter;
