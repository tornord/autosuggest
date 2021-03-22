import React from "react";
import CustomAutosuggest from "./CustomAutosuggest";

export default function InstrumentInput({ selected, className, values, onChange }) {
  return (
    <CustomAutosuggest
      className={className}
      selected={values ? values.find((d) => d._id === selected) : null}
      values={values}
      toDisplayText={(d) => d.name}
      toSuggestionText={(d) => d.name}
      onChange={(val) => {
        if (onChange) {
          onChange(val);
        }
      }}
    />
  );
}
