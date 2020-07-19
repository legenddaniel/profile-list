import React, { useState } from 'react';

import Tags from './Tags';

export default function Collapse(props) {
  const [display, toggleDisplay] = useState({ icon: '+', displayClass: ' d-none' });

  // Toggle collapse and switch
  const handleClick = () => {
    const newDisplay =
      display.icon === '+' ?
        { icon: '-', displayClass: '' } :
        { icon: '+', displayClass: ' d-none' }
    toggleDisplay(newDisplay);
  }

  const { grades, id } = props;
  return (
    <div>
      <div className="expand-btn" onClick={handleClick}>{display.icon}</div>
      <div>
        {`Average: ${(grades.reduce((a, b) => +a + +b) / grades.length).toFixed(3)}%`}
      </div>
      <div className={`grades-wrapper${display.displayClass}`}>
        <ul>{grades.map((grade, index) => {
          return (
            <li key={`${id}-${index}`}>
              {`Test ${index}: `}
              <span className="txt-grade">{grade}%</span>
            </li>
          )
        })}</ul>
        <Tags id={id} />
      </div>
    </div>
  )
}