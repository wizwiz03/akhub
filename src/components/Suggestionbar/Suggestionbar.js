import { useState } from 'react';

import './Suggestionbar.css';

const Suggestionbar = ({ suggestions, userInput, setUserInput }) => {
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);


  const onChange = e => {
    const cur_input = e.currentTarget.value;
    const filtered = suggestions.filter(suggestion => suggestion.toLowerCase().indexOf(cur_input.toLowerCase()) > -1);

    setActiveSuggestion(0);
    setFilteredSuggestions(filtered);
    setShowSuggestions(true);
    setUserInput(cur_input);
  };

  const onClick = e => {
    setActiveSuggestion(0);
    setFilteredSuggestions([]);
    setShowSuggestions(false);
    setUserInput(e.currentTarget.innerText);
  };

  const onKeyDown = e => {
    if (e.keyCode === 13) {
      if (!showSuggestions) {
        return;
      }
      setUserInput(filteredSuggestions[activeSuggestion]);
      setShowSuggestions(false);
      setActiveSuggestion(0);
    }
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }
      setActiveSuggestion(activeSuggestion - 1);
    }
    else if (e.keyCode === 40) {
      if (activeSuggestion + 1 === filteredSuggestions.length) {
        return;
      }
      setActiveSuggestion(activeSuggestion + 1);
    }
  };

  const createSuggestionList = () => {
    let suggestionsList
    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsList = (
          <ul className="suggestions">
            {filteredSuggestions.map((suggestion, index) => {
              let className;
    
              // Flag the active suggestion with a class
              if (index === activeSuggestion) {
                className = "suggestion-active";
              }
              return (
                <li className={className} key={suggestion} onClick={onClick}>
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
      } 
      else {
        suggestionsList = (
          <div className="no-suggestions">
            <em>No suggestions available.</em>
          </div>
        );
      }
    }
    return suggestionsList;
  };

  return (
    <div>
      <input className='input-suggestion' type='text' onChange={onChange} onKeyDown={onKeyDown} value={userInput} />
      {createSuggestionList()}
    </div>
  );
};

export default Suggestionbar;