import React from 'react';
import Autosuggest from 'react-autosuggest';

import instruments from './instruments.json';

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

function CustomAutosuggest({
  toSuggestionText,
  toDisplayText,
  values,
  selected,
  onChange,
  maxListCount,
  disabled
}) {
  const startValue = selected
    ? toDisplayText
      ? toDisplayText(selected)
      : selected
    : "";
  const [inputState, setInputState] = React.useState({
    inputValue: startValue,
    selected
  });
  const [suggestions, setSuggestions] = React.useState([]);

  // console.log("Autosuggest", inputState.inputValue, inputState.selected ? inputState.selected.name : null, startValue, selected ? selected.name : null);
  if (inputState.selected !== selected) {
    setInputState({ inputValue: startValue, selected });
  }

  const texts = toSuggestionText ? values.map(toSuggestionText) : values;
  const filterSuggestions = (value) => {
    if (!value) {
      return [];
    }
    const escapeRegexCharacters = (str) =>
      str.replace(/[.*+?^${}()|[\]\\@]/g, "\\$&");
    const escapedValue = escapeRegexCharacters(value.trim());
    if (escapedValue === "") {
      return [];
    }
    const regex = new RegExp(escapedValue, "i");
    let res = [];
    for (let i = 0; i < values.length; i++) {
      const value = values[i];
      const text = texts[i];
      if (text) {
        const sortOrder = text.search(regex);
        if (sortOrder >= 0) {
          res.push({ value, text, sortOrder });
        }
      }
    }
    res.sort((d1, d2) => {
      const c = d1.sortOrder - d2.sortOrder;
      return c !== 0 ? c : d1.text < d2.text ? -1 : d1.text > d2.text ? 1 : 0;
    });
    // var res = instrs.map(d => regex.test(toText(d)));
    res = res.map((d) => d.value);
    const m = maxListCount ? maxListCount : 50;
    if (res.length > m) {
      res = res.slice(0, m);
    }
    return res;
  };
  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={({ value }) =>
        setSuggestions(filterSuggestions(value))
      }
      onSuggestionsClearRequested={() => setSuggestions([])}
      getSuggestionValue={(suggestion) => {
        if (onChange) {
          onChange(suggestion);
        }
        return toDisplayText
          ? toDisplayText(suggestion)
          : toSuggestionText
          ? toSuggestionText(suggestion)
          : suggestion;
      }}
      renderSuggestion={(suggestion, x) => {
        const text = toSuggestionText
          ? toSuggestionText(suggestion)
          : suggestion;
        if (!text) {
          return <span></span>;
        }
        const index = text
          .toLocaleLowerCase()
          .indexOf(x.query.toLocaleLowerCase());
        if (index >= 0) {
          const n = x.query.length;
          return (
            <span>
              {text.substring(0, index)}
              <span className="highlight">
                {text.substring(index, index + n)}
              </span>
              {text.substring(index + n)}
            </span>
          );
        }
        return <span>{text}</span>;
      }}
      inputProps={{
        value: inputState.inputValue,
        onChange: (event, { newValue /*, method*/ }) => {
          if (onChange && (newValue === null || newValue === "")) {
            onChange(newValue);
          }
          setInputState({ inputValue: newValue, selected });
        },
        onFocus: (event) => event.target.select(),
        className: "form-control",
        disabled
      }}
    />
  );
}

export default function App() {
  return (
    <h2>
      Sök aktie:
      <InstrumentInput
        className="instrument"
        values={instruments}
        onChange={(d) => console.log(d)}
      />
    </h2>
  );
}