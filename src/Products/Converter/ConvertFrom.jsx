import React from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { createStructuredSelector } from 'reselect';
import { selectFromValue } from './selectors';
import { updateValueFromInput } from './actions';

const ConvertFrom = ({ value, handleInputChange }) => {
  return (
    <section>
      <TextField
        label="Convert From"
        type="number"
        onChange={handleInputChange}
        value={value}
      />
    </section>
  );
};

const mapStateToProps = createStructuredSelector({
  value: selectFromValue
});

const reg = /^-?\d*\.?\d*$/;

const mapDispatchToProps = dispatch => ({
  handleInputChange: e => {
    const { value } = e.target;
    if (reg.test(value)) {
      dispatch(updateValueFromInput('from', value));
    }
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConvertFrom);
