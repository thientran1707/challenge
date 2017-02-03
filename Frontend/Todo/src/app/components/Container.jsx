import React, { Component, PropTypes } from 'react';
import Card from './Card';
import { DropTarget } from 'react-dnd';
import { removeCard, pushCard, moveCard } from '../actions';

class Container extends Component {
  
  static propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    list: PropTypes.array,
    canDrop: PropTypes.bool,
    isOver: PropTypes.bool,
    connectDropTarget: PropTypes.func,
    dispatch: PropTypes.func
  }

  render() {
    const { list } = this.props;
    const { canDrop, isOver, connectDropTarget, name } = this.props;
    const isActive = canDrop && isOver;
    const backgroundColor = isActive ? 'lightgrey' : '#FFF';
 
    return connectDropTarget(
      <div className="todo-container__main">
        <div className="todo-container__header" style={{padding: '0 10px'}}>
          <div className="todo__inline">
            <div className="todo__label todo-container__label">{name}</div>
          </div>
          <div className="todo__inline todo__container todo-container__count">
            <div className="todo__label-count">{list.length}</div>
            <div className="todo__label-text">PROJECTS</div>
          </div>
        </div>
        <div className="todo-container__content" style={{backgroundColor}}>
          {list.map((card, index) => {
            return (
              <Card 
                key={index}
                index={index}
                listId={this.props.id}
                card={card}                           
                removeCard={this.removeCard}
                moveCard={this.moveCard} />
            );
          })}
        </div>
      </div>
    );
  }

  pushCard = (card) => {
    const { id, dispatch } = this.props;
    dispatch(pushCard(id, card));
  }
 
  removeCard = (index) => {  
    const { id, dispatch } = this.props;
    dispatch(removeCard(id, index));
  }
 
  moveCard = (dragIndex, hoverIndex) => {
    const { id, list, dispatch } = this.props;  
    const dragCard = list[dragIndex];

    dispatch(moveCard(id, dragIndex, hoverIndex, dragCard));
  }
}

const cardTarget = {
  drop(props, monitor, component ) {
    const { id } = props;
    const sourceObj = monitor.getItem();    
    if (id !== sourceObj.listId) {
      component.pushCard(sourceObj.card);
    }

    return {
      listId: id
    };
  }
}
 
export default DropTarget('CARD', cardTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))(Container);
