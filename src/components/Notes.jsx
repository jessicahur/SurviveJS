import React from 'react';

import Note from './Note.jsx';

export default ({notes, onEdit}) => {
    return (
      <ul> {notes.map(note =>
        <li key={note.id}>
          <Note task={note.task}
                onEdit={onEdit.bind(null, note.id)} />
        </li> )}
      </ul>
    );
}

/*Notes: We bind null because we don't want to explicitly change 'this' binding defined in App,
and note.id is the first parameter of App's editNote: editNote(id, task) {}
*/

