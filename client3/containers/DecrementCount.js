import { connect } from 'react-redux'
import { decrementCount } from '../actions'
import Decrementer from '../components/Decrementer'

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(decrementCount())
    }
  }
}

const DecrementCount = connect(
  null,
  mapDispatchToProps
)(Decrementer)

export default DecrementCount
