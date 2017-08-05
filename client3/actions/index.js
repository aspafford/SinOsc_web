import axios from 'axios'

export const incrementCount = () => {
  return {
    type: 'INCREMENT'
  }
}

export const incrementCountAsync = () => {
  return (dispatch, getState) => {

    dispatch(incrementCount())

    axios
      .post("/settings", {count: getState()})
      .then(function(result) {
        console.log('/setcount', result.data);
      });
  }
}

export const decrementCount = () => {
  return {
    type: 'DECREMENT'
  }
}
