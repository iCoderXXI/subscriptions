// import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addSubscription, setDuplicate, unsetDuplicate } from '../actions/listActions';
import List from '../components/FormComponent';

export default connect(
  (state) => {
    return {
      isDuplicate: state.list.isDuplicate,
      items: state.list.items,
    };
  },
  (dispatch) => {
    return bindActionCreators(
      {
        addSubscription,
        setDuplicate,
        unsetDuplicate,
      }, dispatch
    );
  }
)(List);
