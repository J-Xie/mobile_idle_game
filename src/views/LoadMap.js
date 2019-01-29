import { compose, withPropsOnChange } from 'recompose';
import { connect } from 'react-redux';
import { selectMap } from '../redux/resource/selector';
import { loadMap } from '../redux/resource/action';

const LoadMap = ({ children }) => children;

export default compose(
  connect(
    state => ({ map: selectMap(state) }),
    { loadMap }
  ),
  withPropsOnChange(['map'], props => {
    if (!props.map) {
      props.loadMap();
    }
    return {};
  })
)(LoadMap);
