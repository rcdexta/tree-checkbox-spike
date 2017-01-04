import TreeNode from './TreeNode'
import React, {Component} from 'react'

export default class Tree extends Component {

  state = {data: this.props.data}

  createFastLookUpIndex = (nodes, parent) => {
    nodes.forEach((item) => {
      let id = item.id.toString();
      this.nodeIndex[id] = item
      this.parentIndex[id] = parent
      if (item.children) {
        this.createFastLookUpIndex(item.children, item)
      }
    })
  }

  checkAllAncestors = (node) => {
    const immediateParent = this.parentIndex[node.id]
    if (immediateParent === undefined) return
    const allChildrenChecked = immediateParent.children.every((e) => e.checked)
    immediateParent.checked = allChildrenChecked

    if (!allChildrenChecked) {
      const someChildrenChecked = immediateParent.children.some((e) => e.checked || e.partialChecked)
      immediateParent.partialChecked = someChildrenChecked
    } else {
      immediateParent.partialChecked = false
    }

    this.checkAllAncestors(immediateParent)
  }

  componentWillReceiveProps(nextProps) {
    this.constructTree(nextProps.data)
    this.setState({data: nextProps.data});
  }

  componentWillMount() {
    this.constructTree(this.state.data)
  }

  constructTree = (data) => {
    const parent = undefined
    this.nodeIndex = {}
    this.parentIndex = {}
    this.createFastLookUpIndex(data, parent)
  }

  componentDidUpdate() {
    document.querySelectorAll('input.indeterminate').forEach((checkbox) => checkbox.indeterminate = true)
    document.querySelectorAll('input.pristine').forEach((checkbox) => checkbox.indeterminate = false)
  }

  emitHighLevelCheckedNodes = () => {
    const selectedNodes = []
    const {data} = this.state

    const traverseCheckedParents = (node) => {
      if (node.checked) {
        selectedNodes.push(node)
      } else if (node.children) {
        node.children.forEach(traverseCheckedParents)
      }
    }

    data.forEach(traverseCheckedParents)

    this.props.onCheck(selectedNodes)
  }


  handleChange = (evt) => {

    const checked = evt.target.checked;
    const key = evt.target.getAttribute('data-key');

    const checkAllChildren = (node) => {
      node.checked = checked;
      if (node.children) {
        node.children.forEach(checkAllChildren);
      }
    };

    const {data} = this.state

    const selectedNode = this.nodeIndex[key]
    selectedNode.checked = checked
    selectedNode.partialChecked = false
    if (selectedNode.children) {
      selectedNode.children.forEach(checkAllChildren);
    }
    this.checkAllAncestors(selectedNode)

    this.setState({data: data}, () => {
      this.emitHighLevelCheckedNodes()
    });

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

Tree.propTypes = {
  data: React.PropTypes.array.isRequired,
  onCheck: React.PropTypes.func
}