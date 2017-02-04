import React, { Component, PropTypes } from 'react';
import { addTodo } from '../actions';

class AddTodo extends Component {

  static propTypes = {
    total: PropTypes.number,
    dispatch: PropTypes.func
  }

  render() {
    const { total } = this.props;
    return (
      <div className="todo-header__container">
        <div className="todo-header__input todo__inline">
          <label className="todo__label">add project</label>
          <input className="todo-header__input" onKeyPress={this.handleKeyPress}/>
        </div>
        <div className="todo-header__project-count todo__inline">
          <div className="todo__label">TOTAL</div>
          <div className="todo__container">
            <div className="todo__label-count">{total}</div>
            <div className="todo__label-text">PROJECTS</div>
          </div>
        </div>
      </div>
    );
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      const text = e.target.value.trim();
      const { dispatch } = this.props;
      dispatch(addTodo(text));
    }
  }
}

export default AddTodo;
