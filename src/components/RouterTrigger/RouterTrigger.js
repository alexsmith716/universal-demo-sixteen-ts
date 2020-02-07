import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Route } from 'react-router';

@withRouter

export class RouterTrigger extends Component {

  static propTypes = {
    children: PropTypes.node.isRequired,
    location: PropTypes.objectOf(PropTypes.any).isRequired,
    triggerProp: PropTypes.func
  };

  static defaultProps = {
    triggerProp: () => {}
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
    console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTrigger > getDerivedStateFromProps() > location: ', location);

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
  // If you need to load data from a remote endpoint, this is a good place to instantiate the network request
  // may call 'setState()' immediately
  // calling 'setState()' triggers an extra rendering, but will happen before the browser updates the screen
  // SO, 'render()' is called twice but user won't see the intermediate state
  componentDidMount() {
    console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTrigger > componentDidMount() <<<<<<<<<<<<<<<<<<<<<<<');
    this.mounted = true;
    this.triggerSafeSetState();
  }

  // let React know if a component's output is not affected by the current change in 'state' or 'props'
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
  // may call 'setState()' immediately
  // calling 'setState()' triggers an extra rendering, but will happen before the browser updates the screen
  // 'componentDidUpdate()' will not be invoked if 'shouldComponentUpdate()' returns false
  componentDidUpdate() {
    console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTrigger > componentDidUpdate() <<<<<<<<<<<<<<<<<<<<<<<');
    this.triggerSafeSetState();
  }

  componentWillUnmount() {
    console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTrigger > componentWillUnmount() <<<<<<<<<<<<<<<<<<<<<<<');
    this.mounted = false;
  }

  // ===============================================================================
  triggerSafeSetState = () => {
    const { triggerProp, location } = this.props;
    const { needTrigger } = this.state;

    console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTrigger > triggerSafeSetState > triggerProp: ', triggerProp);
    console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTrigger > triggerSafeSetState > needTrigger: ', needTrigger);

    if (needTrigger) {
      this.safeSetState({ needTrigger: false }, () => {
        triggerProp(location.pathname)
          .catch(err => console.log('Failure in RouterTrigger!'))
          .then(() => {
            // clear previousLocation so the next screen renders
            console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTrigger > triggerProp(location.pathname) <<<<<<<<<<<<<<<<<<<<');
            this.safeSetState({ previousLocation: null });
          });
      });
    }
  };

  safeSetState(nextState, callback) {
    console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTrigger > safeSetState() > this.mounted: ', this.mounted);
    if (this.mounted) {
      this.setState(nextState, callback);
    }
  }

  render() {
    const { children, location } = this.props;
    const { previousLocation } = this.state;

    console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTrigger > render() > children: ', );
    console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTrigger > render() > location: ', );
    console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTrigger > render() > previousLocation: ', previousLocation);

    return <Route location={previousLocation || location} render={() => children} />;
  }
}
