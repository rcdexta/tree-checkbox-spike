import React, { Component } from 'react';
import logo from './logo.svg';

import './App.css';
import './Tree.css'

import Tree, { TreeNode } from 'rc-tree';

class App extends Component {

  MAX_LEVELS = 3

  randomSingleDigitNum = () => {
    let max = 10
    let min = 0
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  renderTree = (title, key, childrenSize) => {
    const level = key.length
    return <TreeNode title={title} key={key} isLeaf={childrenSize === 0}>
      {
        Array(childrenSize).fill().map((_, i) => {
          var grandChildrenSize = level >= this.MAX_LEVELS ? 0 : this.randomSingleDigitNum()
          return this.renderTree(`Child ${key}${i}`, `${key}${i}`, grandChildrenSize)
        })
      }
    </TreeNode>
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Tree with Checkboxes demo</h2>
        </div>
        <div className="App-intro">

          <Tree
            checkable
            defaultExpandAll={false}
            defaultExpandedKeys={['12', '15', '19']}
          >
            {this.renderTree('Parent', '1', 1000)}
          </Tree>

        </div>
      </div>
    );
  }
}

export default App;
