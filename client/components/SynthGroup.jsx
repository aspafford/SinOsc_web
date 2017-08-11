/*
    ./client/components/SynthGroup.jsx
*/
import React from 'react'
import PropTypes from 'prop-types'
// import axios from 'axios';
// import FloatingActionButton from 'material-ui/FloatingActionButton';
// import ContentAdd from 'material-ui/svg-icons/content/add';
// import Noise from './Noise.jsx';

const SynthGroupUI = ({ value, onClick }) => {
  return (
    <div>
      <p>Num Synths: { value }</p>
      <a 
        href="#"
        onClick={e => {
          e.preventDefault()
          onClick('add')
        }}
      >
      Add
      </a>

      <a 
        href="#"
        onClick={e => {
          e.preventDefault()
          onClick('remove')
        }}
      >
      Remove
      </a>

    </div>
  )
}

SynthGroupUI.propTypes = {
  value: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
}

export default SynthGroupUI

// export default class SynthGroup extends React.Component {

//   constructor(props) {
//     super(props);
//     this.state = {numChildren: 2};

//     this.handleAdd = this.handleAdd.bind(this);
//   }

//   handleAdd() {
//     let numChildren = this.state.numChildren += 2;
//     this.setState({numChildren: numChildren});
//     this.apiAdd();
//   }

//   apiAdd() {
//     axios
//       .post("/settings", {count: this.state.numChildren})
//       .then(function(result) {
//         console.log('>', result);
//       });
//     console.log('api add');
//   }

//   render() {

//     const style = {
//     };

//     const children = [];

//     for (let i = 0; i < this.state.numChildren; i++) {
//       let channel = i % 2;
//       children.push(<Noise key={i} enviro={this.props.enviro} channel={channel} freq="400" amFreq="1.0" />);
//     }

//     return (
//       <div>
//         <div>{children}</div>
//         <FloatingActionButton mini={true} style={style} onClick={this.handleAdd}>
//           <ContentAdd />
//         </FloatingActionButton>
//       </div>
//     );
//   }
// }