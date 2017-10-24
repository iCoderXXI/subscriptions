// import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { deleteSubscription } from '../actions/listActions';
import List from '../components/ListComponent';

export default connect(
  (state) => {
    return {
      data: state.list.items,
    };
  },
  (dispatch) => {
    return bindActionCreators(
      {
        deleteHandler: deleteSubscription,
      }, dispatch
    );
  }
)(List);
