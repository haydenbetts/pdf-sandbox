import React from 'react';
import { createStyles, withStyles } from '@material-ui/core/styles';

const styles = (theme: any) => 
  createStyles({
    dragger: {
        '&:hover': {
            boxShadow: 'inset 0px -8px 2px 0px hsla(0, 0%, 0%, .6) !important'
        }
    }
  });

let draggerStyle = {
    height: '100%',
    cursor: 'ew-resize',
    width: '15px',
    backgroundColor: '#ffffff4d',
    boxShadow: 'inset 0px -8px 2px 0px hsla(0, 0%, 0%, .3)',
    top: 40
} as React.CSSProperties;

let baseStyleHorizontal = {
  top: 0,
  bottom: 0,
  position: "absolute"
} as React.CSSProperties;

let baseStyleVertical = {
  left: 0,
  right: 0,
  position: "absolute"
} as React.CSSProperties; 

type SplitPaneProps = {
    vertical: boolean,
    className: string,
    children: any,
    classes: any,
    onResize: () => void
}

type SplitPaneState = {
    dividerPosition: number
}


/**
 * Creates a left-right split pane inside its container.
 */
class SplitPane extends React.Component<SplitPaneProps, SplitPaneState> {
  constructor(props: SplitPaneProps) {
    super(props);
    this._onMouseDown = this._onMouseDown.bind(this);

    this.state = {
      dividerPosition: 50,
    };
  }

  _onMouseDown() {
    let { vertical } = this.props;
    let max = vertical ? window.innerHeight - 50 : window.innerWidth - 50;
    window.document.body.style.cursor = vertical ? 'row-resize' : 'col-resize';
    let moveHandler = (event: any) => {
      event.preventDefault();
      this.setState({
        dividerPosition: ((vertical ? event.pageY : event.pageX) / max) * 100});
    };
    let upHandler = () => {
      document.removeEventListener('mousemove', moveHandler);
      document.removeEventListener('mouseup', upHandler);
      window.document.body.style.cursor = '';

      if (this.props.onResize) {
        this.props.onResize();
      }
    };

    document.addEventListener('mousemove', moveHandler);
    document.addEventListener('mouseup', upHandler);
  }

  render() {
    let {children} = this.props;
    let dividerPos = this.state.dividerPosition;
    let styleA;
    let styleB;
    let dividerStyle;

    if (!Array.isArray(children) || children.filter(x => x).length !== 2) {
      return (
        <div className={this.props.className}>
          <div style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0}}>
            {this.props.children}
          </div>
        </div>
      );
    }

    if (this.props.vertical) {
      // top
      styleA = {
        ...baseStyleVertical,
        top: 0,
        height: dividerPos + '%',
        paddingBottom: 3,
      };
      // bottom
      styleB = {
        ...baseStyleVertical,
        bottom: 0,
        height: (100 - dividerPos) + '%',
        paddingTop: 3,
      };
      dividerStyle = {
        ...baseStyleVertical,
        top: dividerPos + '%',
        height: 5,
        marginTop: -2.5,
        zIndex: 100,
        ...draggerStyle
      };
    } else {
      // left
      styleA = {
        ...baseStyleHorizontal,
        left: 0,
        width: dividerPos + '%',
        paddingRight: 3,
      };
      // right
      styleB = {
        ...baseStyleHorizontal,
        right: 0,
        width: (100 - dividerPos) + '%',
        paddingLeft: 3,
      };
      dividerStyle = {
        ...baseStyleHorizontal,
        left: `calc(${dividerPos + '%'} - 15px`,
        width: 5,
        marginLeft: -2.5,
        zIndex: 100,
        ...draggerStyle
      };
    }

    return (
      <div className={this.props.className}>
        <div style={styleA}>
          {this.props.children[0]}
        </div>
        <div
          className={this.props.classes.dragger}
          onMouseDown={this._onMouseDown}
          style={dividerStyle}
        />
        <div style={styleB}>
          {this.props.children[1]}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(SplitPane);