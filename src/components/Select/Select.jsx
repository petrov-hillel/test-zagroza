import {useEffect, useRef, useState} from "react";

import './Select.scss'

const defaultRenderOption = (option) => <div>{option.label}</div>;
const defaultRenderSelectedOption = (option) => <div>{option.label}</div>;

function Select({
  options,
  renderOption = defaultRenderOption,
  renderSelectedOption = defaultRenderSelectedOption
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [_, setIsFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [filteredOptions, setFilteredOptions] = useState(options);

  const selectRef = useRef(null);

  const handleFocus = () => {
      setIsOpen(true);
      setIsFocused(true);
  };

  const handleOpen = () => {
    setIsFocused(true);
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsFocused(false);
    handleCloseSearch();
  };

  const handleBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      handleClose()
    }
  };

  const customSearch = async (term) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const results = options.filter((option) =>
          option.label.toLowerCase().includes(term.toLowerCase()) &&
          (!selectedOption || option.value !== selectedOption.value)
        );
        resolve(results);
      }, 500);
    });
  };

  const handleSearch = async (term) => {
    const results = await customSearch(term);
    setFilteredOptions(results);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    handleSearch(e.target.value);
  };

  const handleSelect = (option) => {
    setSelectedOption(option);
    handleClose()
  };

  const handleCloseSearch = () => {
    setSearchTerm("");
    handleSearch("")
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (selectRef.current && !selectRef.current.contains(e.target)) {
        handleClose()
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className={`select ${isOpen ? 'open' : ''}`}
         onFocus={handleFocus}
         onBlur={handleBlur}
         ref={selectRef}
         tabIndex={0}
    >
      <div className='select-header' onMouseDown={handleOpen}>
        {selectedOption ? renderSelectedOption(selectedOption) : 'Оберіть ваше місто'}
        <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 6L0 0H8L4 6Z" fill="#333333"/>
        </svg>
      </div>
      {isOpen && (
        <div className="select-options">
          <div className='select-search__wrapper'>
            <input
              type="text"
              placeholder="Поиск..."
              value={searchTerm}
              onChange={handleInputChange}
              className="select-search"
              tabIndex={-1}
            />
            <span onClick={handleCloseSearch} className='select-search__close'>&times;</span>
          </div>
          {filteredOptions.length > 0 ? filteredOptions.map((option) => (
            <div
              key={option.value}
              className="select-option"
              onClick={() => handleSelect(option)}
            >
              {renderOption(option)}
            </div>
          )) : (
            <div className="select-option__not-found">Not founds</div>
          )}
        </div>
      )}
    </div>
  );
}

export default Select