import he from 'he';

/**
 * Determine whether or not the interaction should be rendered in 3d
 *
 * @param {Interaction} interaction
 * @return {boolean}
 */
export const renderIn3d = (interaction) => {
  return  interaction.showAsHotspot; // TODO: Does this make sense?
};

/**
 * Returns the `value` if it's greater than the minimum and lower than the maximum.
 * If it's lower than the minimum, then the minimum is returned,
 * else if the value is greater than the maximum, then the maximum is returned.
 *
 * @param {number} min
 * @param {number} value
 * @param {number} max
 * @returns {number}
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
