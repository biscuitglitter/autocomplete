import React, { useEffect, useState, useReducer } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import fruits from "./fruits.json";
import "./App.css"

function App() {
  const [open, setOpen] = useState<boolean>(false);
  const [word, setWord] = useState<string>();
  const [suggestions, setSuggestions] = useState<string[]>();
  const [numbers, setNumbers] = useState<number>()

  const handleOnChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = target;
    setSuggestions(fruits.filter(fruit => fruit.slice(0, numbers) === word?.slice(0, numbers)))
    console.log("fruits filter NUMBERS", numbers)
    setWord(value);
  };

  useEffect(() => {
    if (word !== undefined) setNumbers(word?.length + 1)
    word === undefined ? setOpen(false) : setOpen(true);
    if (word?.length === 0) setOpen(false);
    if (word?.length === 0) setSuggestions([]);
  }, [word]);

  
  const handleOnKeyDown = (
    { key }: React.KeyboardEvent<HTMLInputElement>,     
  ) => {
    if (key === "Backspace") {
      if (numbers !== undefined) setNumbers(numbers - 1);
    }
  };

  return (
    <div className="App">
      <div>
      <label>
        enter a word:
        <input onKeyDown={(e) => handleOnKeyDown(e)} onChange={handleOnChange} />
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
