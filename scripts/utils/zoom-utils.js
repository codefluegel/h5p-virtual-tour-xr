/**
 * Get new 'field of view' value after zooming in/out.
 * @param {number} value Current fov value
 * @param {number} maxValue Scene max fov value
 * @param {string} zoomType zoomIn or zoomOut
 * @returns {number} New fov value
 */
export const getNewFovValue = (value, maxValue, zoomType) => {
  if (value >= 20 && zoomType === 'zoomIn') {
    return value - 5;
  }
  else if ( value < maxValue && zoomType === 'zoomOut') {
    return value + 5;
  }
  else {
    return value;
  }
};
