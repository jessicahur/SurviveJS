import React from 'react';

export default class Note extends React.Component{
  constructor(props) {
    super(props);

    //Track editing state
    this.state = {
      editing: false
    };
  }

  //No need for ',' to separate properties (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
  render() {
    //Render the component differently based on state
    if( this.state.editing) {
      return this.renderEdit();
    }
    return this.renderNote();
  }

  //react lifecycle methods are automatically bound to “this" whereas custom ones require doing so manually
  // fat arrow is a bit of a hack because they don’t create a new scope, in the same way that function() does.
  //(@danielle Portland-ReactJS Slack channel)
  renderEdit = () => {
    return <input type='text'
      ref={
        //anonymous function that takes an event. If event, return e.selectionStart = props.task.length. Otherwise return null
        (e) => e ? e.selectionStart = this.props.task.length : null
      }
      autoFocus={true}
      defaultValue={this.props.task}
      onBlur={this.finishEdit}
      onKeyPress={this.checkEnter} />
  };
  //Check if there is an onDelete passed down as props
  renderNote = () => {
    const onDelete = this.props.onDelete; //if we don't have this then on line 42 we'll use this.props
    return (
      <div onClick={this.edit}>
        <span> {this.props.task} </span>
        {onDelete ? this.renderDelete() : null}
      </div>
    );
  };

  renderDelete = () => {
    return <button onClick={this.props.onDelete}>x</button>;
  };

  edit = () => {
    this.setState({
      editing: true
    });
  };

  checkEnter = (e) => {
    //If the user hit *enter*, we finish. This gets called everytime we input something
    if(e.key === 'Enter') {
      this.finishEdit(e);
    }
  };

  finishEdit = (e) => {
    const value = e.target.value;
    if(this.props.onEdit) {
      this.props.onEdit(value);
      //Exit edit mode
      this.setState({
        editing: false
      });
    }
  };
}


/*Note: Even though we aren't referring to React directly through code here, it is good to remember
that the JSX will get transformed into calls going through it.
Hence if you remove the import statement, the code will break.
Babel plugin known as babel-plugin-react-require is able to generate the imports for you automatically if you prefer to avoid the imports.
*/
