import React from 'react';

export class Popup extends React.Component {

  render() {
    return (
      <div className='popup'>
        <div className='popup_inner'>
          <h1>{this.props.text}</h1>

          <button className="btn btn-primary btn-lg btn-block"    onClick={this.props.closePopup}> CLICK HERE TO START GAME </button>
        </div>
      </div>
    );
  }
}
