import React from 'react';
import uuid from 'node-uuid';


export default class App extends React.Component {
  render() {
    const notes = [
      {
        id: uuid.v4(),
        task: 'Learn Webpack'
      },
      {
        id: uuid.v4(),
        task: 'Learn React'
      },
      {
        id: uuid.v4(),
        task: 'Do laundry'
      }
    ];

    return(
      <div>
        <ul> {notes.map(note => <li key={note.id}>{note.task}</li> )}
        </ul>
      </div>
    );
  }
}

/*Notes:
In order to tell React in which order to render the elements, we use the key property.
It is important that this is unique or else React won't be able to figure out the correct order in which to render. If not set, React will give a warning.
*/

