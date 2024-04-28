import React from 'react';
import { H5PContext } from '../../context/H5PContext';
import './ZoomButtons.scss';

export default class ZoomButtons extends React.Component {
  /**
   * @class ZoomButtons
   * @param {object} props ZoomButtons props.
   */
  constructor(props) {
    super(props);
    this.props = props;

    this.state = {
      currentButtonIndex: 0,
      focusButton: null
    };

    this.zoomInButtonRef = React.createRef();
    this.zoomOutButtonRef = React.createRef();

    this.buttons = {};
  }

  /**
   * Add button refs.
   */
  addButtonRefs() {
    if (!this.props.isZoomInDisabled) {
      this.buttons['zoomIn'] = this.zoomInButtonRef;
    }

    if (!this.props.isZoomOutDisabled) {
      this.buttons['zoomOut'] = this.zoomOutButtonRef;
    }
  }

  /**
   * Get index of button.
   * @param {string} type Button type.
   * @returns {number} Button index.
   */
  getIndex(type) {
    if (typeof type !== 'string' || Object.keys(this.buttons).length == 0) {
      return;
    }
    return Object.values(this.buttons).indexOf(this.buttons[type]);
  }

  /**
   * Determine if button should get focus.
   * @param {string} type Button type.
   * @returns {boolean} True, if button should get focus.
   */
  getButtonFocus(type) {
    if (typeof type !== 'string') {
      return false;
    }

    return this.getIndex(type) === this.state.focusButton;
  }

  /**
   * Get tabindex for button.
   * @param {string} type Button type.
   * @returns {number} Tabindex.
   */
  getTabIndex(type) {
    if (typeof type !== 'string') {
      return -1;
    }

    return this.getIndex(type) === this.state.currentButtonIndex && !this.props.isHiddenBehindOverlay ? 0 : -1;
  }

  /**
   * Component did update.
   * @param {object} prevState Previous state.
   */
  componentDidUpdate(prevState) {
    this.addButtonRefs();

    if (this.props.isZoomInDisabled && this.state.currentButtonIndex === this.getIndex('zoomIn')) {
      this.moveFocus(1);
    }

    if (this.props.isZoomOutDisabled && this.state.currentButtonIndex === this.getIndex('zoomOut')) {
      this.moveFocus(-1);
    }

    if (this.state.focusButton !== null && this.state.focusButton !== prevState.focusButton) {
      if (this.zoomInButtonRef.current || this.zoomOutButtonRef.current) {
        this.handleFocus();
      }
    }
  }

  /**
   * Move button focus.
   * @param {number} offset Offset to move position by.
   * @param {boolean} setFocusButton Set new value for focusButton.
   */
  moveFocus(offset, setFocusButton = false) {
    if (typeof offset !== 'number') {
      return;
    }

    const newIndex = this.state.currentButtonIndex + offset;
  
    if (newIndex < 0 || newIndex >= Object.keys(this.buttons).length) {
      return;
    }

    if (this.props.isZoomInDisabled && newIndex === this.getIndex('zoomIn')) {
      return;
    }

    if (this.props.isZoomOutDisabled && newIndex === this.getIndex('zoomOut')) {
      return;
    }

    this.setState({
      currentButtonIndex: newIndex,
      focusButton: setFocusButton ? newIndex : this.state.focusButton
    });
  }


  /**
   * Handle focus on zoom buttons.
   */
  handleFocus() {
    Object.values(this.buttons)[this.state.currentButtonIndex].current.focus();
  }

  /**
   * Handle blur on zoom buttons.
   */
  handleBlur() {
    this.setState({ focusButton: null });
  }

  /**
   * Handle key down event.
   */
  handleKeyDown(event) {
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        this.moveFocus(1, true);
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        this.moveFocus(-1, true);
        break;
      case 'Home':
        this.setState({
          currentButtonIndex: 0,
          focusButton: 0
        });
        break;
      case 'End':
        const lastIndex = Object.keys(this.buttons).length - 1;
        this.setState({
          currentButtonIndex: lastIndex,
          focusButton: lastIndex
        });
        break;
      case 'Enter':
      case ' ':
        this.setState({ focusButton: this.state.currentButtonIndex });
      default:
        return;
    }
    event.preventDefault();
  }

  /**
   * Render ZoomButtons.
   * @returns {object} JSX element.
   */
  render() {
    return (
      <div
        className='h5p-ndla-virtual-tour-zoom-buttons'
        role='toolbar'
        aria-label={ this.context.l10n.zoomToolbar }
        aria-controls={ this.props.ariaControls }
        onFocus={ () => this.handleFocus() }
        onBlur={ () => this.handleBlur() }
        onKeyDown={ (event) => this.handleKeyDown(event) }
      >
        <div className='h5p-ndla-virtual-tour-zoom-button-wrapper'>
          <button
            className='h5p-ndla-virtual-tour-zoom-button zoom-in'
            ref={ this.zoomInButtonRef }
            aria-label={ this.context.l10n.buttonZoomIn }
            onClick={ this.props.onZoomIn }
            tabIndex={ this.getTabIndex('zoomIn') }
            disabled={ this.props.isZoomInDisabled }
          />
          <div className='tooltip' aria-hidden='true'>
            <div className='text-wrap'>{ this.context.l10n.buttonZoomIn }</div>
          </div>
        </div>
        <div className='h5p-ndla-virtual-tour-zoom-button-wrapper'>
          <button
            className='h5p-ndla-virtual-tour-zoom-button zoom-out'
            ref={ this.zoomOutButtonRef }
            aria-label={ this.context.l10n.buttonZoomOut }
            onClick={ this.props.onZoomOut }
            tabIndex={ this.getTabIndex('zoomOut') }
            disabled={ this.props.isZoomOutDisabled }
          />
          <div className='tooltip' aria-hidden='true'>
            <div className='text-wrap'>{ this.context.l10n.buttonZoomOut }</div>
          </div>
        </div>
      </div>
    );
  }
}

ZoomButtons.contextType = H5PContext;
