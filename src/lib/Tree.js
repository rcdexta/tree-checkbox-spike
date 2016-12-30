import TreeNode from './TreeNode'
import React, {Component} from 'react'

export default class Tree extends Component {

  nodeIndex = {}
  parentIndex = {}
  state = {data: this.props.data}

  createLookupIndices = (nodes, parent) => {
    nodes.forEach((item) => {
      let id = item.id.toString();
      this.nodeIndex[id] = item
      this.parentIndex[id] = parent
      if (item.children) {
        this.createLookupIndices(item.children, item)
      }
    })
  }

  checkAllAncestors = (node) => {
    let immediateParent = this.parentIndex[node.id]
    if (immediateParent === undefined) return
    let allChildrenChecked = immediateParent.children.every((e) => e.checked)
    immediateParent.checked = allChildrenChecked

    if (!allChildrenChecked) {
      let someChildrenChecked = immediateParent.children.some((e) => e.checked || e.partialChecked)
      immediateParent.partialChecked = someChildrenChecked
    } else {
      immediateParent.partialChecked = false
    }

    this.checkAllAncestors(immediateParent)
  }

  componentWillMount() {
    let parent = undefined
    this.createLookupIndices(this.state.data, parent)
  }

  componentDidUpdate() {
    document.querySelectorAll('input.indeterminate').forEach((checkbox) => checkbox.indeterminate = true)
    document.querySelectorAll('input.pristine').forEach((checkbox) => checkbox.indeterminate = false)
  }

  handleChange = (evt) => {

    let checked = evt.target.checked;
    let key = evt.target.getAttribute('data-key');

    let checkAllChildren = function (node) {
      node.checked = checked;
      if (node.children) {
        node.children.forEach(checkAllChildren);
      }
    };

    let traverseNodes = function (node) {
      if (node.id == key) {
        node.checked = checked;
        if (node.children) {
          node.children.forEach(checkAllChildren);
        }
      }

      if (node.children) {
        node.children.forEach(traverseNodes);
      }
    };

    // let dataSource = Object.create(this.state.data);
    // dataSource.forEach(traverseNodes);
    // this.setState({ data: dataSource });

    const {data} = this.state

    let selectedNode = this.nodeIndex[key]
    selectedNode.checked = checked
    selectedNode.partialChecked = false
    if (selectedNode.children) {
      selectedNode.children.forEach(checkAllChildren);
    }
    this.checkAllAncestors(selectedNode)

    this.setState({data: data});
  }

  render() {
    return (
      <ul className='checkbox-tree'>
        {
          this.state.data.map((node) => {
            return (
              <TreeNode
                key={node.id}
                node={node}
                handleChange={this.handleChange}
              />
            );
          })
        }
      </ul>
    );
  }

}
