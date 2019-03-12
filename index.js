const _ = require('lodash');

/**
 * @function go3d
 * @param {Array} parts
 * @param {String} selector
 * @param {Sring} prop
 * @return {Object}
 */
function go3d(parts, selector, prop) {
  const clean = parts.map(part => part.trim());
  if (clean.length !== 3) clean.push('0');
  return {
    [selector]: {
      transform: `${prop}(${clean.join(',')})`
    }
	};
}

module.exports = ({
  variants = {},
  translate = {},
  negativeTranslate = {},
  scale = {},
  rotate = {},
  negativeRotate = {},
  skew = {},
  negativeSkew = {},
  origins = {},
} = {}) => ({ e, addUtilities }) => {
  addUtilities(
    {
      '.transform-none': { transform: 'none' },
      ...Object.assign(
        {},
        ..._.map(translate, (value, name) => {
          const parts = value.split(',');
          if (parts.length > 1) {
            return go3d(parts, `.${e(`translate-3d-${name}`)}`, 'translate3d');
          }

          return {
            [`.${e(`translate-x-${name}`)}`]: {
              transform: `translateX(${value})`
            },
            [`.${e(`translate-y-${name}`)}`]: {
              transform: `translateY(${value})`
            }
          };
        }),
        ..._.map(negativeTranslate, (value, name) => ({
          [`.${e(`-translate-x-${name}`)}`]: { transform: `translateX(-${value})` },
          [`.${e(`-translate-y-${name}`)}`]: { transform: `translateY(-${value})` },
        })),
        ..._.map(scale, (value, name) => ({
          [`.${e(`scale-${name}`)}`]: { transform: `scale(${value})` },
          [`.${e(`scale-x-${name}`)}`]: { transform: `scaleX(${value})` },
          [`.${e(`scale-y-${name}`)}`]: { transform: `scaleY(${value})` },
        })),
        ..._.map(rotate, (value, name) => ({
          [`.${e(`rotate-${name}`)}`]: { transform: `rotate(${value})` },
        })),
        ..._.map(negativeRotate, (value, name) => ({
          [`.${e(`-rotate-${name}`)}`]: { transform: `rotate(-${value})` },
        })),
        ..._.map(skew, (value, name) => ({
          [`.${e(`skew-x-${name}`)}`]: { transform: `skewX(${value})` },
          [`.${e(`skew-y-${name}`)}`]: { transform: `skewY(${value})` },
        })),
        ..._.map(negativeSkew, (value, name) => ({
          [`.${e(`-skew-x-${name}`)}`]: { transform: `skewX(-${value})` },
          [`.${e(`-skew-y-${name}`)}`]: { transform: `skewY(-${value})` },
        })),
        ..._.map(origins, (value, name) => ({
          [`.${e(`transform-origin-${name}`)}`]: { transformOrigin: value },
        })),
      ),
    },
    variants,
  );
};
