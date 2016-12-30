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

    return (
      <li className={containerClass}>
        <span onClick={this.handleClick} onTouchEnd={this.handleClick}>
          { node.children === undefined || node.children === [] ?
            '' :
            (collapsed ? <i className="fa fa-plus-square-o tree_handles" aria-hidden="true"/> : <i className="fa fa-minus-square-o tree_handles" aria-hidden="true" />)
          }
        </span>
        <input 
          type='checkbox' 
          checked={node.checked || false}
          onChange={this.props.handleChange}
          data-key={node.id}
        />
        <span onClick={this.handleClick} onTouchEnd={this.handleClick}>{node.text}</span>
        {childNodes}
      </li>
    )
  }

}
