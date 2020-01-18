import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { bindActionCreators } from 'multireducer';
import { connect } from 'react-redux';
import { incrementMultireducer, decrementMultireducer  } from '../../../redux/modules/counterMultiReducer';

// 'dispatch()' function accessed from helper 'connect()'
// to initiate a ('action creator') dispatch, pass the result to the 'dispatch()' function
// 'bindActionCreators()': automatically bind many action creators to 'dispatch()' function

// UI bindings
@connect(
  (state, { multireducerKey: key }) => ({  count: state.counterCollection[key].countMultireducer }),
  (dispatch, { multireducerKey: key }) => bindActionCreators({ incrementMultireducer, decrementMultireducer  }, dispatch, key)
)

class CounterMultireducer extends Component {

  // static propTypes = {
  //   count: PropTypes.number.isRequired,
  //   incrementMultireducer: PropTypes.func.isRequired,
  //   decrementMultireducer: PropTypes.func.isRequired,
  // };

  render() {

    const { count, incrementMultireducer, decrementMultireducer } = this.props;

    return (

      <div className="row justify-content-center">
        <div className="col-md-auto">

          <div className="d-flex bg-color-ivory container-padding-border-radius-2">

            <div className="width-400 text-center">

              <div className="row">

                <div className="col mb-3">
                  Counter Multireducer Clicked: {count} times
                </div>

              </div>

              <div className="row">

                <div className="col-lg-6 col-md-6 col-sm-12 mb-lg-0 mb-md-0 mb-sm-2 mb-2">
                  <button onClick={decrementMultireducer} className="btn btn-primary">decrement counter</button>
                </div>

                <div className="col-lg-6 col-md-6 col-sm-12">
                  <button onClick={incrementMultireducer} className="btn btn-primary">increment counter</button>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    );
  }
};

export default CounterMultireducer;
