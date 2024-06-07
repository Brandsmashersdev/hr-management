import React, { useState } from 'react';
import NoteContext from '../context/NoteContext';

export const NoteProvider = ({ children }) => {
  const [contextValue, setContextValue] = useState({ basename: 'example' });

  return (
    <NoteContext.Provider value={contextValue}>
      {children}
    </NoteContext.Provider>
  );
};