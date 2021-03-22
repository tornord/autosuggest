import React from "react";
import InstrumentInput from "./InstrumentInput";
import instruments from "./instruments.json";

export default function App() {
  return (
    <h2>
      Sök aktie:
      <InstrumentInput className="instrument" values={instruments} onChange={(d) => console.log(d)} />
    </h2>
  );
}
