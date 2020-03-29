import tinycolor from 'tinycolor2';

const getColorObject = (value: tinycolor.Instance, name: string) => {
  const c = tinycolor(value);
  return {
    [name]: c.toHexString()
  };
};

const multiplyColors = (
  rgb1: tinycolor.ColorFormats.RGBA,
  rgb2: tinycolor.ColorFormats.RGBA
) => {
  rgb1.b = Math.floor((rgb1.b * rgb2.b) / 255);
  rgb1.g = Math.floor((rgb1.g * rgb2.g) / 255);
  rgb1.r = Math.floor((rgb1.r * rgb2.r) / 255);
  return tinycolor(`rgb ${rgb1.r} ${rgb1.g} ${rgb1.b}`);
};

export const compute = (hex: string, algorithm = '') => {
  let arr;
  const output: any = {};
  if (algorithm === 'constantin') {
    const baseLight = tinycolor('#ffffff');
    const baseDark = multiplyColors(
      tinycolor(hex).toRgb(),
      tinycolor(hex).toRgb()
    );
    const baseTriad = tinycolor(hex).tetrad() as any;
    arr = [
      getColorObject(tinycolor.mix(baseLight, hex, 12), '50'),
      getColorObject(tinycolor.mix(baseLight, hex, 30), '100'),
      getColorObject(tinycolor.mix(baseLight, hex, 50), '200'),
      getColorObject(tinycolor.mix(baseLight, hex, 70), '300'),
      getColorObject(tinycolor.mix(baseLight, hex, 85), '400'),
      getColorObject(tinycolor.mix(baseLight, hex, 100), '500'),
      getColorObject(tinycolor.mix(baseLight, hex, 100), 'main'),
      getColorObject(tinycolor.mix(baseDark, hex, 87), '600'),
      getColorObject(tinycolor.mix(baseDark, hex, 70), '700'),
      getColorObject(tinycolor.mix(baseDark, hex, 54), '800'),
      getColorObject(tinycolor.mix(baseDark, hex, 25), '900'),
      getColorObject(
        tinycolor
          .mix(baseDark, baseTriad[4], 15)
          .saturate(80)
          .lighten(65),
        'A100'
      ),
      getColorObject(
        tinycolor
          .mix(baseDark, baseTriad[4], 15)
          .saturate(80)
          .lighten(55),
        'A200'
      ),
      getColorObject(
        tinycolor
          .mix(baseDark, baseTriad[4], 15)
          .saturate(100)
          .lighten(45),
        'A400'
      ),
      getColorObject(
        tinycolor
          .mix(baseDark, baseTriad[4], 15)
          .saturate(100)
          .lighten(40),
        'A700'
      )
    ];
  } else {
    arr = [
      getColorObject(tinycolor(hex).lighten(52), '50'),
      getColorObject(tinycolor(hex).lighten(37), '100'),
      getColorObject(tinycolor(hex).lighten(26), '200'),
      getColorObject(tinycolor(hex).lighten(12), '300'),
      getColorObject(tinycolor(hex).lighten(6), '400'),
      getColorObject(tinycolor(hex), '500'),
      getColorObject(tinycolor(hex), 'main'),
      getColorObject(tinycolor(hex).darken(6), '600'),
      getColorObject(tinycolor(hex).darken(12), '700'),
      getColorObject(tinycolor(hex).darken(18), '800'),
      getColorObject(tinycolor(hex).darken(24), '900'),
      getColorObject(
        tinycolor(hex)
          .lighten(50)
          .saturate(30),
        'A100'
      ),
      getColorObject(
        tinycolor(hex)
          .lighten(30)
          .saturate(30),
        'A200'
      ),
      getColorObject(
        tinycolor(hex)
          .lighten(10)
          .saturate(15),
        'A400'
      ),
      getColorObject(
        tinycolor(hex)
          .lighten(5)
          .saturate(5),
        'A700'
      )
    ];
  }

  arr.forEach(entry => {
    for (const [key, value] of Object.entries(entry)) {
      output[key] = value;
    }
  });

  return output;
};
