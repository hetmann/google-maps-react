import React, { PropTypes as T } from 'react'

import { camelize } from '../lib/String'
const evtNames = ['click'];

const wrappedPromise = function() {
    var wrappedPromise = {},
        promise = new Promise(function (resolve, reject) {
            wrappedPromise.resolve = resolve;
            wrappedPromise.reject = reject;
        });
    wrappedPromise.then = promise.then.bind(promise);
    wrappedPromise.catch = promise.catch.bind(promise);
    wrappedPromise.promise = promise;

    return wrappedPromise;
}

export class Polyline extends React.Component {

  componentDidMount() {
    this.polylinePromise = wrappedPromise();
    this.renderPolyline();
  }

  // issue when polyline drag => is creating a new instance / polyline  
  // componentDidUpdate(prevProps) {
  //   if ((this.props.map !== prevProps.map) ||
  //     (this.props.position !== prevProps.position)) {
  //       this.renderPolyline();
  //   }
  // }

  componentWillUnmount() {
    if (this.polyline) {
      this.polyline.setMap(null);
    }
  }

  renderPolyline() {
    let {
      map, google, position, positions, mapCenter, ...rest
    } = this.props;

    if (!google) {
      return null;
    }

    const pref = {...rest};
    this.polyline = new google.maps.Polyline(pref);

    evtNames.forEach(e => {
      this.polyline.addListener(e, this.handleEvent(e));
    });

    if (map) {
      this.polyline.setMap(map);
    }

    this.polylinePromise.resolve(this.polyline);
  }

  getPolyline() {
    return this.polylinePromise;
  }

  handleEvent(evt) {
    return (e) => {
      const evtName = `on${camelize(evt)}`
      if (this.props[evtName]) {
        this.props[evtName](this.props, this.polyline, e);
      }
    }
  }

  render() {
    return;
  }
}

Polyline.propTypes = {
  position: T.object,
  map: T.object
}

evtNames.forEach(e => Polyline.propTypes[e] = T.func)

Polyline.defaultProps = {
  name: 'Polyline'
}

export default Polyline
