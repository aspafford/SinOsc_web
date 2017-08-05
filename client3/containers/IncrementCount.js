import { connect } from 'react-redux'
import { incrementCountAsync } from '../actions'
import Counter from '../components/Counter'


const mapStateToProps = (state, ownProps) => {
  return {
    value: state.count
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(incrementCountAsync())
    }
  }
}

const IncrementCount = connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)

export default IncrementCount
