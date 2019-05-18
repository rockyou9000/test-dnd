/* eslint-disable function-paren-newline */
import React, { PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import DragPreview from './drag-preview';

const types = {
  TEST: 'TEST',
};

const cardSource = {
  beginDrag(props) {
    const item = { index: props.index };
    return item;
  },
  // endDrag(props, monitor, component) {
  //   if (!monitor.didDrop()) {
  //     return;
  //   }
  //   const item = monitor.getItem();
  //   const dropResult = monitor.getDropResult();
  //   console.log(item, dropResult);
  // },
};

const cardTarget = {
  // canDrop(props, monitor) {} // 组件可以被放置时触发的事件
  hover(props, monitor, component) { // 组件在target上方时触发的事件
    if (!component) return null;
    const dragIndex = monitor.getItem().index;// 拖拽目标的Index
    const hoverIndex = props.index; // 目标Index
    // if (dragIndex === props.lastIndex || hoverIndex === props.lastIndex) return null;
    if (dragIndex === hoverIndex) { return null; } // 如果拖拽目标和目标ID相同不发生变化
    const hoverBoundingRect = (findDOMNode(component)).getBoundingClientRect(); // 获取卡片的边框矩形
    const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2; // 获取X轴中点
    const clientOffset = monitor.getClientOffset(); // 获取拖拽目标偏移量
    const hoverClientX = (clientOffset).x - hoverBoundingRect.left;
    if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
      return null;
    }
    if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
      return null;
    }
    props.onDND(dragIndex, hoverIndex);
    // eslint-disable-next-line no-param-reassign
    monitor.getItem().index = hoverIndex;
    return null;
  },
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}

function collectTarget(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType(),
  };
}

@DragSource(types.TEST, cardSource, collect)
@DropTarget(types.TEST, cardTarget, collectTarget)
class Index extends PureComponent {
  render() {
    const { content, scene } = this.props;
    const { isDragging, connectDragSource, connectDropTarget } = this.props;
    const opacity = isDragging ? 0.5 : 1;

    return connectDragSource(connectDropTarget(
      <div style={{ height: '200px', flex: 1, marginRight: '10px', background: 'red', opacity }}>
        { scene === 'mobile' && <DragPreview {...this.props} />}
        <div>{content}</div>
      </div>,
    ));
  }
}

export default Index;
