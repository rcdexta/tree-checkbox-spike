import React, {Component} from 'react'

export default class TreeNode extends Component {

  state = {collapsed: true}

  handleClick = () => {
    this.setState({collapsed: !this.state.collapsed})
  }

  render() {
    let {collapsed} = this.state

    var containerClass = collapsed ? 'collapsed' : ''
    var node = this.props.node
    var childNodes

    if (node.children && !collapsed) {
      childNodes = node.children.map((child, index) => {
        return (
          <ul key={[node.id, index].join('/')}>
            <TreeNode
              key={node.id}
              node={child}
              handleChange={this.props.handleChange}
            />
          </ul>
        );
      })
    }

    console.log(node.children)

    return (
      <li className={containerClass}>
        <span onClick={this.handleClick} onTouchEnd={this.handleClick}>
          { node.children === undefined || node.children.length === 0 ?
            <i className="material-icons">fiber_manual_record</i> :
            (collapsed ? <i className="material-icons">add_circle</i> : <i className="material-icons">remove_circle</i>)
          }
        </span>

        <input
          type='checkbox'
          id={`checkbox${node.id}`}
          className={node.partialChecked ? 'indeterminate' : 'pristine'}
          checked={node.checked || false}
          onChange={this.props.handleChange}
          data-key={node.id}
        />
        <label htmlFor={`checkbox${node.id}`}><span></span>
          {node.text}
        </label>
        {childNodes}
      </li>
    )
  }

}
