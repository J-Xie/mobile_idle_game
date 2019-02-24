import { compose, withPropsOnChange } from 'recompose';
import { connect } from 'react-redux';
import { selectMap, selectResource } from '../redux/resource/selector';
import { loadMap } from '../redux/resource/action';

const LoadMap = ({ children }) => children;

export default compose(
  connect(
    state => ({
      map: selectMap(state),
      mapSize: selectResource(state, 'mapSize'),
    }),
    { loadMap }
  ),
  withPropsOnChange(['map'], ({ map, mapSize, loadMap: generateMap }) => {
    if (!map) {
      generateMap(mapSize);
    }
    return {};
  })
)(LoadMap);
