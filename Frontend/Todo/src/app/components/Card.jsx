import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash/flow';
 
class Card extends Component {
  static propTypes = {
    card: PropTypes.object,
    isDragging: PropTypes.bool,
    connectDragSource: PropTypes.func,
    connectDropTarget: PropTypes.func
  }

  render() {
    const { card, connectDragSource, connectDropTarget } = this.props;
 
    return connectDragSource(connectDropTarget(
      <div className="todo-card__container">
        {card.text}
      </div>
    ));
  }
}

const cardSource = {
 
  beginDrag(props) {    
    return {      
      index: props.index,
      listId: props.listId,
      card: props.card
    };
  },
 
  endDrag(props, monitor) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult(); 
 
    if (dropResult && dropResult.listId !== item.listId) {
      props.removeCard(item.index);
    }
  }
};

const cardTarget = {
 
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;
    const sourceListId = monitor.getItem().listId;  
 
    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }
 
    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
 
    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
 
    // Determine mouse position
    const clientOffset = monitor.getClientOffset();
 
    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;
 
    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }
 
    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }
 
    // Time to actually perform the action
    if (props.listId === sourceListId) {
      props.moveCard(dragIndex, hoverIndex);
      monitor.getItem().index = hoverIndex;
    }   
  }
};

export default flow(
  DropTarget('CARD', cardTarget, connect => ({
    connectDropTarget: connect.dropTarget()
  })),
  DragSource('CARD', cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }))
)(Card);