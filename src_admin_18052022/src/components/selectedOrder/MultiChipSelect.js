import React from "react";
import Select from "react-select";
import { ClearIndicator } from "./ClearIndicator";

export const MultiChipSelect = ({
  selected,
  setSelected,
  flavors,
  setSaveVariantProduct,
  setSaveVariantId,
}) => {
  console.log('selected multichip', selected);
  const onChange = (selectedOptions) => {
    setSelected(selectedOptions);
    setSaveVariantProduct(selectedOptions);
    if (selectedOptions.length === 0) {
      setSaveVariantId(selectedOptions);
      return;
    }
    setSaveVariantId(selectedOptions[selectedOptions.length - 1]?.value);
  };
  const customStyles = {
    indicatorSeparator: () => {},
  };
  return (
    <Select
      isMulti
      isClearable={true}
      components={{ ClearIndicator }}
      defaultValue={selected}
      value={selected}
      styles={customStyles}
      onChange={onChange}
      options={flavors}
      isSearchable={true}
    />
  );
};
