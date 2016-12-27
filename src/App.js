import React, { Component } from 'react';
import logo from './logo.svg';

import './App.css';
import './Tree.css'

import Tree, { TreeNode } from 'rc-tree';

const DATA = {text: 'Parent',
              children:[
                {text: 'Child1', id: 2, children: [{text: 'GrandChild1', id: 5, children: []}]},
                {text: 'Child2', id: 3, children: []},
                {text: 'Child3', id: 4, children: []}
              ],
              id: 1}

class App extends Component {

  renderTree = (tree) => {

    return <TreeNode title={tree.text} key={tree.id} isLeaf={tree.children.length === 0}>
      {
        tree.children.map((child, i) => {
          return this.renderTree(child)
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
            defaultExpandedKeys={['1', '2']}
          >
            {this.renderTree(DATA)}
          </Tree>

        </div>
      </div>
    );
  }
}

export default App;
