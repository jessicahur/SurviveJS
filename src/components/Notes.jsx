import React from 'react';

import Note from './Note.jsx';

//exports a function that will have notes, onEdit and onDelete passed in (?)
export default ({notes, onEdit, onDelete}) => {
    return (
      <ul className='notes'> {notes.map(note =>
        <li className='note' key={note.id}>
          <Note task={note.task}
                onEdit={onEdit.bind(null, note.id)}
                onDelete={onDelete.bind(null, note.id)}/>
        </li> )}
      </ul>
    );
}

/*Notes: We bind null because we don't want to explicitly change 'this' binding defined in App,
and note.id is the first parameter of App's editNote: editNote(id, task) {}
Also, we bind at Notes because this is the first site where each note is listed out and we
have access to each specific note.id
*/

