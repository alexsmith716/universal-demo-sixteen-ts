import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Route } from 'react-router';

// https://reactjs.org/docs/lifting-state-up.html
// often, several components need to reflect the same changing data
// sharing state is accomplished by moving it up to the closest common ancestor of the components that need it
// "client" owns the state, it becomes the "source of truth" for "asyncGetPromises" -prefetched data state
// there should be a single "source of truth" for any data that changes in a React application

@withRouter
// get access to the history object's properties and the closest <Route>'s match
// passes match, location, and history props to component whenever it renders

// location - (object) The current location. May have the following properties:
//  * pathname - (string) The path of the URL
//  * search - (string) The URL query string

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
    locationState: null,
    previousLocation: null
  };

  // invoked right before calling the 'render' method, both on initial 'mount' and subsequent 'updates'
  // it should return an object to update the state, or null to update nothing
  static getDerivedStateFromProps(props, state) {
    console.log('>>>>>>>>>>>>>>>>>>>>>>>> YYYYY RouterTrigger > getDerivedStateFromProps() 222> props: ', props);
    // store 'withRouter' props 'location' in state 'locationState' to compare when props change
    const { locationState } = state;
    const { location: { pathname, search } } = props; // @withRouter
    const navigated = !locationState || `${pathname}${search}` !== `${locationState.pathname}${locationState.search}`;

    const v = locationState || props.location;
    console.log('>>>>>>>>>>>>>>>>>>>>>>>> ZZZZ RouterTrigger > getDerivedStateFromProps() > state.locationState: ', state.locationState);
    console.log('>>>>>>>>>>>>>>>>>>>>>>>> XXXX RouterTrigger > getDerivedStateFromProps() > navigated: ', navigated);
    console.log('>>>>>>>>>>>>>>>>>>>>>>>> XXXX RouterTrigger > getDerivedStateFromProps() > @withRouter > props.location: ', props.location);
    console.log('>>>>>>>>>>>>>>>>>>>>>>>> XXXX RouterTrigger > getDerivedStateFromProps() > previousLocation: ', v);

    if (navigated) {
      return {
        needTrigger: true,
        locationState: props.location,
        previousLocation: locationState || props.location
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
    console.log('>>>>>>>>>>>>>>>>>>>>>>>> YYYYY RouterTrigger > componentDidMount() > this.props: ', this.props);
    this.mounted = true;
    this.triggerSafeSetState();
  }

  // =====================================

  // let React know if a component's output is not affected by the current change in 'state' or 'props'
  // >>> default behavior is to re-render on every 'state' change <<<, and for vast majority of cases rely on default behavior
  // invoked before 'rendering' when new 'props' or 'state' are being received. 
  // Defaults to 'true'. method is not called for the initial 'render' or when 'forceUpdate()' is used.
  // method only exists as a performance optimization
  // compare 'this.props' with 'nextProps' and 'this.state' with 'nextState' and return 'false' to tell React the update can be skipped
  // SHOULD COMPONENT "re-render" ?????
  shouldComponentUpdate(nextProps, nextState) {
    const { previousLocation } = this.state;
    //console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTrigger > shouldComponentUpdate() previousLocation: ', previousLocation);
    //console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTrigger > shouldComponentUpdate() nextState.previousLocation: ', nextState.previousLocation);
    const n = nextState.previousLocation !== previousLocation;
    console.log('>>>>>>>>>>>>>>>>>>>>>>>> WWWW RouterTrigger > shouldComponentUpdate() return n: ', n);
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
    console.log('>>>>>>>>>>>>>>>>>>>>>>>> YYYYY RouterTrigger > componentDidUpdate() > this.props: ', this.props);
    this.triggerSafeSetState();
  }

  componentWillUnmount() {
    console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTrigger > componentWillUnmount() <<<<<<<<<<<<<<<<<<<<<<<');
    this.mounted = false;
  }

  // ===============================================================================
  triggerSafeSetState = () => {
    console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTrigger > triggerSafeSetState() <<<<<<<<<<<<<<<<<<<<<<<');
    const { triggerProp, location } = this.props;
    const { needTrigger, previousLocation } = this.state;

    console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTrigger > triggerSafeSetState() > needTrigger: ', needTrigger);
    console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTrigger > triggerSafeSetState() > location: ', location);
    console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTrigger > triggerSafeSetState() > previousLocation: ', previousLocation);

    if (needTrigger) {
      this.safeSetState({ needTrigger: false }, () => {
        triggerProp(location.pathname)
          .catch(err => console.log('Failure in RouterTrigger!'))
          .then(() => {
            console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTrigger > triggerSafeSetState() > triggerProp() <<<<<<<<<<<<<<<<<<<<<<<');
            // clear previousLocation so the next screen renders
            this.safeSetState({ previousLocation: null });
          });
      });
    }
  };
  // =============================================================================== 

  safeSetState(nextState, callback) {
    console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTrigger > safeSetState() > this.mounted: ', this.mounted);
    if (this.mounted) {
      // State Updates May Be Asynchronous:
      // React may batch multiple 'setState()' calls into a single update for performance
      // 'this.props' and 'this.state' may be updated asynchronously
      // for async, use 'setState()' that accepts a function
      // function will receive previous state -first argument, and props at time update is applied -second argument
      console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTrigger > safeSetState() > nextState: ', nextState);
      console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTrigger > safeSetState() > callbacks: ', callback);
      this.setState(nextState, callback);
    }
  }

  render() {
    console.log('>>>>>>>>>>>>>>>>>>>>>>>> YYYYY RouterTrigger > render() > this.props: ', this.props);
    const { children, location } = this.props;
    const { previousLocation } = this.state;

    console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTrigger > render() <<<<<<<<<<<<<<<<<<<<<<<');
    //console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTrigger > render() > children: ', children);
    console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTrigger > render() > location: ', location);
    console.log('>>>>>>>>>>>>>>>>>>>>>>>> RouterTrigger > render() > previousLocation: ', previousLocation);
    // use a controlled <Route> to trick all descendants into rendering the old location
    return <Route location={previousLocation || location} render={() => children} />;
  }
}
