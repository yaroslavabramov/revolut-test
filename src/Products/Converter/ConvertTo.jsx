import React from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { createStructuredSelector } from 'reselect';
import { selectToValue } from './selectors';
import { updateValueFromInput } from './actions';

const ConvertTo = ({ value, handleInputChange }) => {
  return (
    <section>
      <TextField
        label="Convert To"
        onChange={handleInputChange}
        value={value}
      />
    </section>
  );
};

const mapStateToProps = createStructuredSelector({
  value: selectToValue
});

const reg = /^-?\d*\.?\d*$/;

const mapDispatchToProps = dispatch => ({
  handleInputChange: e => {
    const { value } = e.target;
    if (reg.test(value)) {
      dispatch(updateValueFromInput('to', value));
    }
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConvertTo);
