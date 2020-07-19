import React, { useState, useContext, useEffect } from 'react';

import Context from './Context';
import Collapse from './Collapse';

export default function List(props) {
  const [students, setStudents] = useState([]);
  const context = useContext(Context);

  const fetchData = async () => {
    const res = await fetch(process.env.REACT_APP_URL);
    const data = await res.json();
    const { students } = data;
    const studentsWithTags = students.map(student => {
      student.tags = [];
      return student;
    });
    setStudents(studentsWithTags);
  };

  useEffect(() => { fetchData() }, []);

  useEffect(() => {
    const newStudents = students;
    const { studentTags } = props;
    studentTags.forEach(studentTag => {
      const index = studentTag.id - 1;
      Object.assign(newStudents[index], studentTag);
    });
    setStudents(newStudents);
  }, [students, props])

  // Only name-input/tag-input: search by name/tag
  // Both input: search and show both
  const { studentName, studentTag } = context;
  const filteredStudents = students.filter(student => {
    const checkName = (`${student.firstName} ${student.lastName}`).toLowerCase().includes(studentName);
    const checkTag = student.tags.join('*-/+-/*--').includes(studentTag);
    return (
      !studentName ?
        checkTag :
        studentTag ?
          checkName || checkTag :
          checkName
    )
  });
  return (
    <ul className="list" > {
      filteredStudents.length ?
        filteredStudents.map(student => {
          const { id, pic, firstName, lastName, email, company, skill, grades } = student;
          const fullName = `${firstName} ${lastName}`;
          return (
            <li key={id} className="list-item">
              <div className="image-wrapper">
                <img src={pic} alt={fullName} title={fullName} className="image" />
              </div>
              <div className="content-wrapper">
                <div className="txt-name">{fullName}</div>
                <div className="txt-content">
                  <div>{`Email: ${email}`}</div>
                  <div>{`Company: ${company}`}</div>
                  <div>{`Skill: ${skill}`}</div>
                  <Collapse grades={grades} id={id} />
                </div>
              </div>
            </li>
          )
        }) :
        <li className="list-item-empty">No result found</li>
    }
    </ul>
  )
}