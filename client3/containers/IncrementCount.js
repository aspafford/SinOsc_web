import { connect } from 'react-redux'
import { incrementCount } from '../actions'
import Counter from '../components/Counter'


const mapStateToProps = (state, ownProps) => {
  return {
    value: state.count
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(incrementCount())
    }
  }
}

const IncrementCount = connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)

export default IncrementCount
