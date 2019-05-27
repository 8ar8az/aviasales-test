import { connect } from 'react-redux';
import * as actions from '../frontend/actions';

export default mapStateToProps => Component => connect(mapStateToProps, actions)(Component);
