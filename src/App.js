import React from "react";
import CustomAutosuggest from "./CustomAutosuggest";

import instruments from "./instruments.json";

function InstrumentInput({ selected, className, values, onChange }) {
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

export default function App() {
  return (
    <h2>
      Sök aktie:
      <InstrumentInput className="instrument" values={instruments} onChange={(d) => console.log(d)} />
    </h2>
  );
}
