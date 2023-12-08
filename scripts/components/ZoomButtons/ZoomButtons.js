import React from 'react';
import './ZoomButtons.scss';

export default class ZoomButtons extends React.Component {
  /**
   * @class
   * @param {object} props React props.
   */
  constructor(props) {
    super(props);
    this.props = props;
  }

  /**
   * React render function.
   * @returns {object} JSX element.
   */
  render() {
    return (
      <div className='h5p-ndla-virtual-tour-zoom-buttons'>
        <button
          aria-label={ this.props.labelZoomIn }
          className='h5p-ndla-virtual-tour-zoom-button zoom-in'
          onClick={ this.props.onZoomIn }
          tabIndex={ this.props.tabIndex }
          disabled={ this.props.isZoomInDisabled }
        />
        <button
          aria-label={ this.props.labelZoomOut }
          className='h5p-ndla-virtual-tour-zoom-button zoom-out'
          onClick={ this.props.onZoomOut }
          tabIndex={ this.props.tabIndex }
          disabled={ this.props.isZoomOutDisabled }
        />
      </div>
    );
  }
}
