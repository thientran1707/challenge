import React, { Component, PropTypes } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Container from '../components/Container';
import AddTodo from '../components/AddTodo';
import { connect } from 'react-redux';
import * as stateSelector from '../reducers/selector';

class App extends Component {

  static propTypes = {
    todo: PropTypes.array,
    progress: PropTypes.array,
    done: PropTypes.array,
    dispatch: PropTypes.func
  }

  render() {
    const { todo, progress, done, dispatch } = this.props;
    const total = todo.length + progress.length + done.length;
    return (
      <div className="todo-main__container">
        <AddTodo total={total} dispatch={dispatch} />
        <div className="todo-main__content">
          <Container id="todo" name="To do" list={todo} dispatch={dispatch}/>
          <Container id="progress" name="In Progress" list={progress} dispatch={dispatch}/>
          <Container id="done" name="Done" list={done} dispatch={dispatch}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    todo: stateSelector.getTodo(state),
    progress: stateSelector.getInProgress(state),
    done: stateSelector.getDone(state)
  }
}

export default DragDropContext(HTML5Backend)(connect(mapStateToProps)(App));
