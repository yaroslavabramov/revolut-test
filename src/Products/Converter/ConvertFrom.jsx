import React from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { createStructuredSelector } from 'reselect';
import { selectFromValue } from './selectors';
import { updateValueFromInput } from './actions';
import { numbericRegexp } from '../../utils/regexps';

const ConvertFrom = ({ value, handleInputChange }) => {
  return (
    <section>
      <TextField
        label="Convert From"
        onChange={handleInputChange}
        value={value}
      />
    </section>
  );
};

const mapStateToProps = createStructuredSelector({
  value: selectFromValue
});

const mapDispatchToProps = dispatch => ({
  handleInputChange: e => {
    const { value } = e.target;
    if (numbericRegexp.test(value)) {
      dispatch(updateValueFromInput('from', value));
    }
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConvertFrom);
