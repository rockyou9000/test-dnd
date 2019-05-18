import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import TouchBackend from 'react-dnd-touch-backend';
import Drag from './components/drag';

import './style.less';

const scene = 'mobile';

class Index extends Component {
  state = {
    list: [{
      id: '1',
      text: 'Source 1',
    }, {
      id: '2',
      text: 'Source 2',
    }, {
      id: '3',
      text: 'Source 3',
    }],
  };

  componentDidMount() {
    setTimeout(() => {
      kBridge.hideLoading();
    }, 15);
  }
  handleDND = (dragIndex, hoverIndex) => {
    const list = this.state.list;
    const tmp = list[dragIndex]; // 临时储存文件
    list.splice(dragIndex, 1); // 移除拖拽项
    list.splice(hoverIndex, 0, tmp); // 插入放置项
    this.setState({
      list,
    });
  };
  render() {
    window.t = this;
    const { list } = this.state;
    if (scene === 'pc') {
      return (
        <div>
          <h1>pc拖拽测试</h1>
          <DragDropContextProvider backend={HTML5Backend}>
            <div>
              <ul className="wrap-pc">
                {list.map((value, index) => (
                  <Drag key={value.text}
                    content={value.text}
                    onDND={this.handleDND}
                    scene={scene}
                    index={index} />
                ))}
              </ul>
            </div>
          </DragDropContextProvider>
        </div>
      );
    }
    if (scene === 'mobile') {
      return (
        <div>
          <h1>无线拖拽测试</h1>
          <DragDropContextProvider backend={TouchBackend}>
            <div>
              <ul className="wrap-pc">
                {list.map((value, index) => (
                  <Drag key={value.text}
                    content={value.text}
                    onDND={this.handleDND}
                    scene={scene}
                    index={index} />
                ))}
              </ul>
            </div>
          </DragDropContextProvider>
        </div>
      );
    }
    return null;
  }
}

kBridge.ready(() => {
  ReactDOM.render(<Index />, document.querySelector('main'));
});
