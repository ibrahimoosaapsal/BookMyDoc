export const hexToRGB = (hex: string = '#000000', alpha: number) => {
  if (hex.includes('#')) {
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
      return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
    } else {
      return 'rgb(' + r + ', ' + g + ', ' + b + ')';
    }
  } else {
    const hexSplit = hex.split(',');
    if (hexSplit.length === 4 || hexSplit.length === 3) {
      let color = '';

      color += hexSplit[0];
      color += ',';
      color += hexSplit[1];
      color += ',';
      color += hexSplit[2];
      color += ',';
      color += alpha;
      color += ')';

      return color;
    }
  }
};

const color: Color = {
  // theme primary color

  pink: '#DE497C',
  pink2: '#FF78C4',
  pink3: '#B30159',
  red: '#F31559',
  orange: '#FF8A8A',
  orange2: '#FA7070',
  orange3: '#F94A29',
  green: '#A1EEBD',
  green2: '#A8DF8E',
  // blue: '#59D5E0',
  blue: '#007AFF',
  blue1: '#0079FF',
  purple: '#BEADFA',
  purple2: '#BC7AF9',
  purple3: '#C780FA',
  purple4: '#D7AEF3',

  grayE: '#eeeeee',
  grayD: '#dddddd',
  grayC: '#cccccc',
  grayB: '#bbbbbb',
  grayA: '#aaaaaa',
  gray8: '#888888',
  gray7: '#777777',
  gray6: '#666666',
  gray5: '#555555',
  gray4: '#444444',
  gray3: '#333333',
  gray2: '#222222',
  gray11:'#d8dce0',
  gray12:'#b1b1b6',
  gray13:'#bfbfc7',

  primary: '#5967D3',
  primary2: '#403485',
  // primary3: '#32256C',
  secondary: '#8e7df5',
  success: '#009e0b',
  error: '#9c0000',

  black: '#000000',
  black15: '#151515',
  black16: '#161616',
  black17: '#171717',
  black18: '#181818',
  black19: '#191919',

  white: '#FFFFFF',
  white2: '#F0F0F0',
  white3: '#F2F2F2',
  whit4: '#F3F3F3',
  whit5: '#F4F4F4',

  transparent: 'transparent',
  blacktransparent0: 'rgba(0,0,0,0.90)',
  blacktransparent1: 'rgba(0,0,0,0.80)',
  blacktransparent5: 'rgba(0,0,0,0.40)',
  whitetransparent0: 'rgba(255,255,255,0.95)',
  // background2: '#d6d6d6',

  // background

  // lightbackground: '#edf1f4',
  // DarkBackground: '#07080A',
  // lightdarkBackground: '#272727',
  // mediumDarkBackground: '#121212',

  // border: '#F5F5F7',
  // secondry: '#4482f1',
  // patwari: '#f27a39',
  // current: '#007065',

  // filedBackground: '#EEF0F8',

  // MPPSC TEST Screen

  // pannel: '#1A1B1F',
  // bottomPannel: '#25282D',
  // lightbottomPannel: '#f6f7f9',
};
export interface Color {
  // theme primary color
  black: string;
  black15: string;
  black16: string;
  black17: string;
  black18: string;
  black19: string;

  white: string;
  white2: string;
  white3: string;
  whit4: string;
  whit5: string;

  error: string;
  primary: string;
  primary2: string;
  secondary: string;
  success: string;
  pink: string;
  pink2: string;
  pink3: string;
  red: string;
  orange: string;
  orange2: string;
  orange3: string;
  blue: string;
  blue1: string;
  green: string;
  green2: string;
  purple: string;
  purple2: string;
  purple3: string;
  purple4: string;

  grayE: string;
  grayD: string;
  grayC: string;
  grayB: string;
  grayA: string;
  gray8: string;
  gray7: string;
  gray6: string;
  gray5: string;
  gray4: string;
  gray3: string;
  gray2: string;
  gray11:string;
  gray12:string;
  gray13:string;

  transparent: string;
  blacktransparent0: string;
  blacktransparent1:string;
  blacktransparent5: string;
  whitetransparent0: string;
}

export default color;
