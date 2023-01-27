import React, { useEffect, useState, useReducer } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import fruits from "./fruits.json";
import "./App.css"

function App() {
  const [open, setOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string>();
  const [suggestions, setSuggestions] = useState<string[]>();
  const [numbers, setNumbers] = useState<number>()

  useEffect(() => {
  setNumbers(query?.length)
  query !== undefined ? setOpen(true) : setOpen(false);
  if (query?.length === 0) setOpen(false);
  }, [query])
  
  const handleOnKeyDown = (
    { key }: React.KeyboardEvent<HTMLInputElement>,     
  ) => {
    if (key === "Backspace") {
      if (numbers !== undefined) setNumbers(numbers - 1);
      if (query?.length === 0) setSuggestions([])
    }
  };

  useEffect(() => {
    setSuggestions(fruits.filter(fruit => fruit.slice(0, (numbers || 0 + 1)) === query?.slice(0, (numbers || 0 + 1))))
  }, [query])

  return (
    <div className="App">
      <div>
      <label>
        enter a query:
        <input onKeyDown={(e) => handleOnKeyDown(e)} onChange={event => setQuery(event.target.value)} />
      </label>
      {open ? (
        <>
          {suggestions?.map(
            (variant) => (
              <DropdownButton
                as={ButtonGroup}
                key={variant}
                variant={variant.toLowerCase()}
                title={variant}>
                <Dropdown.Item
                  eventKey="3"
                  active>
                  Active Item
                </Dropdown.Item>
                <Dropdown.Divider />
              </DropdownButton>
            )
          )}

        </>
      ) : (
        <div></div>
      )}
      </div>
    </div>
  )
}

export default App
