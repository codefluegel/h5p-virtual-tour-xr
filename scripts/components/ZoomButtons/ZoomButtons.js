import React from 'react';
import './ZoomButtons.scss';

export default class ZoomButtons extends React.Component {
  /**
   * @class ZoomButtons
   * @param {object} props ZoomButtons props.
   */
  constructor(props) {
    super(props);
    this.props = props;
  }

  /**
   * Render ZoomButtons.
   * @returns {object} JSX element.
   */
  render() {
    return (
      <div className='h5p-ndla-virtual-tour-zoom-buttons'>
        <div className='h5p-ndla-virtual-tour-zoom-button-wrapper'>
          <button
            aria-label={ this.props.labelZoomIn }
            className='h5p-ndla-virtual-tour-zoom-button zoom-in'
            onClick={ this.props.onZoomIn }
            tabIndex={ this.props.tabIndex }
            disabled={ this.props.isZoomInDisabled }
          />
          <div className='tooltip' aria-hidden='true'>
            <div className='text-wrap'>{ this.props.labelZoomIn }</div>
          </div>
        </div>
        <div className='h5p-ndla-virtual-tour-zoom-button-wrapper'>
          <button
            aria-label={ this.props.labelZoomOut }
            className='h5p-ndla-virtual-tour-zoom-button zoom-out'
            onClick={ this.props.onZoomOut }
            tabIndex={ this.props.tabIndex }
            disabled={ this.props.isZoomOutDisabled }
          />
          <div className='tooltip' aria-hidden='true'>
            <div className='text-wrap'>{ this.props.labelZoomOut }</div>
          </div>
        </div>
      </div>
    );
  }
}
