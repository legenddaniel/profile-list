import React, { useState } from 'react';

import Context from './Context';
import { NameSearch, TagSearch } from './Search';
import List from './List';
import './App.css';

const { Provider } = Context;

export default function App() {
  const [studentName, setName] = useState('');
  const [studentTag, setTag] = useState('');
  const [studentTags, setStudentTags] = useState([]);

  const setSearchName = studentName => setName(studentName);

  // !tagComing.length ? delete it : ID existed ? merge it : add it
  const setTags = tagComing => {
    const isExisted = studentTags.some(student => student.id === tagComing.id);
    const isEmptyComing = !tagComing.tags.length;
    const newStudentTags =
      isEmptyComing ?
        studentTags.filter(student => student.id !== tagComing.id) :
        isExisted ?
          studentTags.map(student =>
            student.id === tagComing.id ?
              { ...student, tags: tagComing.tags } :
              student
          ) :
          [...studentTags, tagComing];
    setStudentTags(newStudentTags);
  }

  const setSearchTag = studentTag => setTag(studentTag);

  return (
    <div className="container">
      <Provider
        value={{
          studentName,
          studentTags,
          studentTag,
          setSearchName,
          setTags,
          setSearchTag
        }}>
        <NameSearch />
        <TagSearch />
        <List studentTags={studentTags} />
      </Provider>
    </div>
  );
}