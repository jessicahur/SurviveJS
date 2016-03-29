import React from 'react';
import uuid from 'node-uuid';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [
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
          task: 'Do Laundry'
        }
      ]
    };
  }

  render() {
    const notes = this.state.notes;
    return(
      <div>
        <button onClick={this.addNote}>+</button>
        <ul> {notes.map(note => <li key={note.id}>{note.task}</li> )}
        </ul>
      </div>
    );
  }

  addNote = () => { //We need to write this out instead of using addNote() {...} because we need fat arrow to bind 'this.setState'
    this.setState({
      notes: this.state.notes.concat([{
        id: uuid.v4(),
        task: 'New Task'
      }])
    });
  };
}

/*Notes:
In order to tell React in which order to render the elements, we use the key property.
It is important that this is unique or else React won't be able to figure out the correct order in which to render. If not set, React will give a warning.
*/

