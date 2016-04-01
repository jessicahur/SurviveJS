import React from 'react';
import uuid from 'node-uuid';

import Notes from './Notes.jsx';

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
  //We set method onEdit on of Notes to be App's editNote()
  render() {
    const notes = this.state.notes;
    return(
      <div>
        <button onClick={this.addNote}>+</button>
        <Notes notes={notes}
               onEdit={this.editNote}
               onDelete={this.deleteNote}/>
      </div>
    );
  }
//notes passed in at line 32 is from line 28. Otherwise it's this.state.notes
  addNote = () => { //We need to write this out instead of using addNote() {...} because we need fat arrow to bind 'this.setState'
    this.setState({
      notes: [...this.state.notes,{
        id: uuid.v4(),
        task: 'New Task'
      }]
    });
  };

  //This connects to finishEdit() in Note.jsx
  editNote = (id, task) => {
    //Don't modify if try to set an empty string
    if(!task.trim()) {
      return;
    }
    const notes = this.state.notes.map(note => {
      if(note.id === id && task) {
        note.task = task;
      }
      return note;
    });
    this.setState({notes});
  };

  deleteNote = (id, e) => {
    //Avoid bubbling to edit (?) - Down at Note?
    e.stopPropagation();

    this.setState({
      notes: this.state.notes.filter(note => note.id !== id)
    });
  };
}

/*Notes:
In order to tell React in which order to render the elements, we use the key property.
It is important that this is unique or else React won't be able to figure out the correct order in which to render. If not set, React will give a warning.
*/

