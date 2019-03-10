import React from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { createStructuredSelector } from 'reselect';
import { selectConvertFromInput } from './selectors';
import { updateInput } from './actions';

const ConvertFrom = ({ inputData, handleInputChange }) => {
  return (
    <section>
      <TextField
        label="Convert From"
        type="number"
        onChange={handleInputChange}
        value={inputData.value}
        error={inputData.error}
      />
    </section>
  );
};

const mapStateToProps = createStructuredSelector({
  inputData: selectConvertFromInput
});

const mapDispatchToProps = dispatch => ({
  handleInputChange: e => {
    dispatch(updateInput('convertFrom', e.target.value));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConvertFrom);
