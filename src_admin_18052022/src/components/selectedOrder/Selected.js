import React, { useState } from "react";
import { MultiChipSelect } from "./MultiChipSelect";

export default function Selected({
  status,
  downProduct,
  setSaveVariantProduct,
  setSaveVariantId,
}) {
  console.log('status', status);
  const [selected, setSelected] = useState([status]);

  return (
    <MultiChipSelect
      selected={selected || status}
      setSelected={setSelected}
      flavors={downProduct}
      setSaveVariantProduct={setSaveVariantProduct}
      setSaveVariantId={setSaveVariantId}
    />
  );
}
