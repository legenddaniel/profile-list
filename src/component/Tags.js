import React, { useState, useContext, useEffect } from 'react';

import Context from './Context';

export default function Tags(props) {
  const [tags, setTags] = useState([]);
  const [input, setInput] = useState('');
  const context = useContext(Context);

  const { id } = props;

  useEffect(() => {
    const students = context.studentTags.filter(student => student.id === id);
    const studentTags = students.length ? students[0].tags : [];
    setTags(studentTags);
  }, []);

  useEffect(() => { context.setTags({ id, tags }) }, [tags]);

  const handleDelete = tagToDelete => {
    const newTags = tags.filter(tag => tag !== tagToDelete);
    setTags(newTags);
  };

  const handleChange = e => {
    setInput(e.target.value.trim());
  };

  // Only add non-repeat and non-empty tags
  const handleKeyUp = e => {
    const isNotRepeat = !tags.includes(input);
    if (e.key === 'Enter' && input && isNotRepeat) {
      setTags([...tags, input]);
      setInput('');
    }
  };

  return (
    <div className="tag-wrapper">
      <ul className="tags">
        {tags.map((tag, index) =>
          <Tag key={`${id}-${index + 1}`} content={tag}
            onDelete={handleDelete} />
        )}
      </ul>
      <input type="search" id="add-tag-input" placeholder="Add a tag" value={input} className="input add-tag-input"
        onChange={handleChange}
        onKeyUp={handleKeyUp} />
    </div>
  )
}

function Tag(props) {
  const handleClick = () => props.onDelete(props.content);
  return (
    <li className="tag">
      {props.content}
      <span className="icon-delete-tag" onClick={handleClick}>×</span>
    </li>
  );
}