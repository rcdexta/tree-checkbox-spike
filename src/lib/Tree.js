import TreeNode from './TreeNode'
import React, {Component} from 'react'

export default class Tree extends Component {

    state = {data: this.props.data}
  
  handleChange = (evt) => {

    var checked = evt.target.checked;
    var key = evt.target.getAttribute('data-key');

    var checkAllNodes = function (node) {
      node.checked = checked;
      if (node.children) { node.children.forEach(checkAllNodes); }
    };


    var traverseNodes = function (node) {
      if (node.id == key) {
        node.checked = checked;
        if (node.children) { node.children.forEach(checkAllNodes); }
      }
        
      if (node.children) {
        node.children.forEach(traverseNodes);
      }
    };
      

    var dataSource = Object.create(this.state.data);
    dataSource.forEach(traverseNodes);
    this.setState({ data: dataSource });

    // this.state.data.forEach(traverseNodes);
    // this.setState(this.state.data);
  }
  
  render() {
    return (
      <ul className='checkbox-tree'>
        {this.state.data.map(function (node, i) {
          return (
            <TreeNode
              key={node.id}
              node={node}
              handleChange={this.handleChange}
            />
          );
        }, this)}
      </ul>
    );
  }

}
