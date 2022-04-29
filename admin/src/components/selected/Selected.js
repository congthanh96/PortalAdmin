import React, { useState } from "react";
import { MultiChipSelect } from "./MultiChipSelect";

export default function Selected({
  downProduct,
  setSaveVariantProduct,
  setSaveVariantId,
}) {
  const [selected, setSelected] = useState([]);

  return (
    <MultiChipSelect
      selected={selected}
      setSelected={setSelected}
      flavors={downProduct}
      setSaveVariantProduct={setSaveVariantProduct}
      setSaveVariantId={setSaveVariantId}
    />
  );
}
