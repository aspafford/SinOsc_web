import axios from 'axios'

export const addSynth = () => {
  return {
    type: 'INCREMENT'
  }
}

export const removeSynth = () => {
  return {
    type: 'DECREMENT'
  }
}

export const updateSynthAsync = (action) => {
  return (dispatch, getState) => {

    if (action === 'add') {
      dispatch(addSynth())
    }
    
    if (action === 'remove') {
      dispatch(removeSynth())
    }

    axios
      .post("/settings", {count: getState()})
      .then(function(result) {
        console.log('/settings updated:', result.data);
      });
  }
}
