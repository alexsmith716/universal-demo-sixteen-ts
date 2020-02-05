import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Route } from 'react-router';

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router/docs/api
// https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/withRouter.md
// https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/history.md
// https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/Route.md
// https://github.com/ReactTraining/history

@withRouter

// --------------------------------------------------------------------------
// HOC 'withRouter': get access to the history object's properties and the closest <Route>'s match
// 'withRouter' will pass updated match, location, and history props to the wrapped component whenever it renders
// Create a new component that is "connected" (redux terminology) to the router
// --------------------------------------------------------------------------
// 'withRouter' does not subscribe to location changes like React Redux's connect does for state changes
// Instead, re-renders after location changes propagate out from the <Router> component
// This means that 'withRouter' does not re-render on route transitions unless its parent component re-renders
// --------------------------------------------------------------------------

// "/"
// >>>>>>>>>>>>>>>>>>>>>>>> RouterTrigger > getDerivedStateFromProps() > state.location:  null 
// >>>>>>>>>>>>>>>>>>>>>>>> RouterTrigger > getDerivedStateFromProps() > {pathname}:  / 
// >>>>>>>>>>>>>>>>>>>>>>>> RouterTrigger > getDerivedStateFromProps() > {search}:  <empty string> 

// >>>>>>>>>>>>>>>>>>>>>>>> RouterTrigger > getDerivedStateFromProps() > navigated:  true
// >>>>>>>>>>>>>>>>>>>>>>>> RouterTrigger > getDerivedStateFromProps() > location || props.location:  { pathname: "/", search: "", hash: "", state: undefined }

// >>>>>>>>>>>>>>>>>>>>>>>> RouterTrigger > getDerivedStateFromProps() > props.location:  { pathname: "/", search: "", hash: "", state: undefined }
// >>>>>>>>>>>>>>>>>>>>>>>> RouterTrigger > getDerivedStateFromProps() > location:  null
// --------------
// >>>>>>>>>>>>>>>>>>>>>>>> RouterTrigger > render() <<<<<<<<<<<<<<<<<<<< 
// >>>>>>>>>>>>>>>>>>>>>>>> RouterTrigger > componentDidMount() <<<<<<<<<<<<<<<<<<<<<<<

// "/aboutfour"
// >>>>>>>>>>>>>>>>>>>>>>>> RouterTrigger > getDerivedStateFromProps() > state.location:  { pathname: "/", search: "", hash: "", state: undefined }
// >>>>>>>>>>>>>>>>>>>>>>>> RouterTrigger > getDerivedStateFromProps() > {pathname}:  /aboutfour 
// >>>>>>>>>>>>>>>>>>>>>>>> RouterTrigger > getDerivedStateFromProps() > {search}:  <empty string>

// >>>>>>>>>>>>>>>>>>>>>>>> RouterTrigger > getDerivedStateFromProps() > navigated:  true 
// >>>>>>>>>>>>>>>>>>>>>>>> RouterTrigger > getDerivedStateFromProps() > location || props.location:  { pathname: "/", search: "", hash: "", state: undefined }

// >>>>>>>>>>>>>>>>>>>>>>>> RouterTrigger > getDerivedStateFromProps() > props.location:  { pathname: "/aboutfour", search: "", hash: "", state: undefined, key: "sanzkt" }
// >>>>>>>>>>>>>>>>>>>>>>>> RouterTrigger > getDerivedStateFromProps() > location:  { pathname: "/", search: "", hash: "", state: undefined }
// 
// >>>>>>>>>>>>>>>>>>>>>>>> RouterTrigger > shouldComponentUpdate() previousLocation:  null 
// >>>>>>>>>>>>>>>>>>>>>>>> RouterTrigger > shouldComponentUpdate() nextState.previousLocation:  { pathname: "/", search: "", hash: "", state: undefined }
// >>>>>>>>>>>>>>>>>>>>>>>> RouterTrigger > shouldComponentUpdate() return n:  true 
// --------------
// >>>>>>>>>>>>>>>>>>>>>>>> RouterTrigger > render() <<<<<<<<<<<<<<<<<<<< 
// >>>>>>>>>>>>>>>>>>>>>>>> RouterTrigger > componentDidUpdate() <<<<<<<<<<<<<<<<<<<<<<< 

export class RouterTrigger extends Component {
  
  static propTypes = {
    children: PropTypes.node.isRequired,
    location: PropTypes.objectOf(PropTypes.any).isRequired,
    trigger: PropTypes.func
  };

  static defaultProps = {
    trigger: () => {}
  };

  state = {
    needTrigger: false,
    location: null,
    previousLocation: null
  };

  // invoked right before calling the 'render' method, both on initial 'mount' and subsequent 'updates'
  // it should return an object to update the state, or null to update nothing
  static getDerivedStateFromProps(props, state) {
    const { location } = state;
    const { location: { pathname, search } } = props;
    const navigated = !location || `${pathname}${search}` !== `${location.pathname}${location.search}`;

    console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTrigger > getDerivedStateFromProps() > state.location: ', state.location);

    console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTrigger > getDerivedStateFromProps() > {pathname}: ', pathname);
    console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTrigger > getDerivedStateFromProps() > {search}: ', search);

    const v = location || props.location;
    console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTrigger > getDerivedStateFromProps() > navigated: ', navigated);
    console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTrigger > getDerivedStateFromProps() > location || props.location: ', v);
    // --------------------
    console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTrigger > getDerivedStateFromProps() > props.location: ', props.location);
    // "/":  props.location: { pathname: "/" }
    // "/4": props.location: { pathname: "/aboutfour", key: "sanzkt" }
    console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTrigger > getDerivedStateFromProps() > location: ', location);
    // "/":  location:  null
    // "/4": location: { pathname: "/", search: "", hash: "", state: undefined }

    // set:    {needTrigger: , location: , previousLocation: }
    // for:    componentDidMount() && componentDidUpdate() { this.trigger() }
    // after:  render()
    if (navigated) {
      return {
        needTrigger: true,
        location: props.location,
        previousLocation: location || props.location
      };
    }
    return null;
  }

  // invoked immediately after a component is mounted (inserted into the tree)
  // Initialization that requires DOM nodes should go here. 
  // If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
  componentDidMount() {
    console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTrigger > componentDidMount() <<<<<<<<<<<<<<<<<<<<<<<');
    this.mounted = true;
    this.trigger();
  }

  // let React know if a component’s output is not affected by the current change in 'state' or 'props'
  // >>> default behavior is to re-render on every 'state' change <<<, and for vast majority of cases rely on default behavior
  // invoked before 'rendering' when new 'props' or 'state' are being received. 
  // Defaults to 'true'. method is not called for the initial 'render' or when 'forceUpdate()' is used.
  // method only exists as a performance optimization
  // compare 'this.props' with 'nextProps' and 'this.state' with 'nextState' and return 'false' to tell React the update can be skipped
  // SHOULD COMPONENT "re-render" ?????
  shouldComponentUpdate(nextProps, nextState) {
    const { previousLocation } = this.state;
    console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTrigger > shouldComponentUpdate() previousLocation: ', previousLocation);
    console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTrigger > shouldComponentUpdate() nextState.previousLocation: ', nextState.previousLocation);
    const n = nextState.previousLocation !== previousLocation;
    console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTrigger > shouldComponentUpdate() return n: ', n);
    return n;
  }

  // invoked immediately after updating occurs. method is not called for the initial render.
  // Use as opportunity to operate on the DOM when the component has been updated.
  // also a good place to do network requests as long as you compare the current props to previous props 
  //   (e.g. a network request may not be necessary if the props have not changed).
  // may call 'setState()' immediately in 'componentDidUpdate()' but note that it must be wrapped in a condition
  componentDidUpdate() {
    console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTrigger > componentDidUpdate() <<<<<<<<<<<<<<<<<<<<<<<');
    this.trigger();
  }

  componentWillUnmount() {
    console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTrigger > componentWillUnmount() <<<<<<<<<<<<<<<<<<<<<<<');
    this.mounted = false;
  }

  // ===================================================
  trigger = () => {
    const { trigger, location } = this.props;
    const { needTrigger } = this.state;

    console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTrigger > trigger > trigger: ', trigger);
    console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTrigger > trigger > needTrigger: ', needTrigger);

    if (needTrigger) {
      this.safeSetState({ needTrigger: false }, () => {
        trigger(location.pathname)
          .catch(err => console.log('Failure in RouterTrigger!'))
          .then(() => {
            // clear previousLocation so the next screen renders
            console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTrigger > trigger(location.pathname) <<<<<<<<<<<<<<<<<<<<');
            this.safeSetState({ previousLocation: null });
          });
      });
    }
  };

  safeSetState(nextState, callback) {
    console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTrigger > safeSetState > this.mounted: ', this.mounted);
    if (this.mounted) {
      this.setState(nextState, callback);
    }
  }

  render() {
    const { children, location } = this.props;
    const { previousLocation } = this.state;

    console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTrigger > render() <<<<<<<<<<<<<<<<<<<<');

    return <Route location={previousLocation || location} render={() => children} />;
  }
}
