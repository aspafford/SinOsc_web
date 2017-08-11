import { connect } from 'react-redux'
import { updateSynthAsync } from '../actions'
import SynthGroupUI from '../components/SynthGroup.jsx'

const mapStateToProps = (state, ownProps) => {
  return {
    value: state.count
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: (action) => {
      dispatch(updateSynthAsync(action))
    }
  }
}

const SynthGroup = connect(
  mapStateToProps,
  mapDispatchToProps
)(SynthGroupUI)

export default SynthGroup
