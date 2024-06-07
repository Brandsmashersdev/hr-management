import React, { useContext } from 'react';
import NoteContext from '../context/NoteContext';

const NoteComponent = () => {
  const context = useContext(NoteContext);
  console.log('NoteComponent context:', context);

  if (!context) {
    return <div>Loading...</div>;
  }

  const { basename } = context;

  return <div>{basename}</div>;
};

export default NoteComponent;
