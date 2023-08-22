import he from 'he';

/**
 * Determine whether or not the interaction should be rendered in 3d
 * @param {object} interaction Interaction.
 * @returns {boolean} True, if should be rendered in 3D.
 */
export const renderIn3d = (interaction) => {
  return interaction.showAsHotspot; // TODO: Does this make sense? Should the function be renamed?
};

/**
 * Enforce value to be not smaller than minumum and not larger than maximum.
 * @param {number} min Minumum.
 * @param {number} value Value to be put in boundaries.
 * @param {number} max Maximum.
 * @returns {number} Value within boundaries.
 */
export const clamp = (min, value, max) => Math.min(max, Math.max(min, value));

/**
 * HTML decode and strip HTML.
 * @param {string|object} html html.
 * @returns {string} html value.
 */
export const purifyHTML = (html) => {
  if (typeof html !== 'string') {
    return '';
  }

  let text = he.decode(html);
  const div = document.createElement('div');
  div.innerHTML = text;
  text = div.textContent || div.innerText || '';

  return text;
};
