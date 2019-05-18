import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragLayer } from 'react-dnd';

function collect(monitor) {
  return {
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    sourceOffset: monitor.getClientOffset(),
    isDragging: monitor.isDragging(),
  };
}

class DragPreview extends Component {
  getLayerStyles() {
    const { sourceOffset } = this.props;

    return {
      position: 'absolute',
      left: sourceOffset ? `${sourceOffset.x}px` : 0,
      top: sourceOffset ? `${sourceOffset.y}px` : 0,
    };
  }

  render() {
    const { isDragging } = this.props;
    if (!isDragging) { return null; }

    return (
      <div className="source-preview" style={this.getLayerStyles()}>
        <img src="https://gw.alipayobjects.com/mdn/O2O_shopdecorate/afts/img/A*DrIgRp7GgDYAAAAAAAAAAABjBAAAAQ/original" alt="" />
      </div>
    );
  }
}

DragPreview.propTypes = {
  isDragging: PropTypes.bool,
  sourceOffset: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }),
};

export default DragLayer(collect)(DragPreview);
