import {StyleSheet} from 'react-native';
import unit from './unit';

const commonStyle = StyleSheet.create({
  // utility styles
  ml10: {
    marginLeft: unit.scale(10),
  },
  mr10: {
    marginRight: unit.scale(10),
  },
  mt10: {
    marginTop: unit.scale(10),
  },
  mb10: {
    marginBottom: unit.scale(10),
  },
  mv10: {
    marginVertical: unit.scale(10),
  },

  // headings
  h1: {
    fontSize: unit.fontSize(2.07),
    fontWeight: 'bold',
  },
  h2: {
    fontSize: unit.fontSize(1.82),
    fontWeight: 'bold',
  },
  h3: {
    // fontSize: 24,
    fontSize: unit.fontSize(1.55),
    fontWeight: 'bold',
  },
  h4: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  h5: {
    fontSize: 18,
    fontWeight: '600',
  },
  h6: {
    fontSize: 16,
    fontWeight: '500',
  },

  // shadow
  shadow24: {
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  shadow2: {
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    
    elevation: 2,
  },

  container: {
    flex: 1,
    paddingHorizontal: unit.scale(15),
  },
  columnCenter: {
    flexDirection: 'column',
    justifyContent: 'center', // Centers items vertically
    alignItems: 'center', // Centers items horizontally
  },
  rowCenter: {
    flexDirection: 'row',
    justifyContent: 'center', // Centers items horizontally
    alignItems: 'center', // Centers items vertically
  },
});

export default commonStyle;
