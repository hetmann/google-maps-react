import React, { PropTypes as T } from 'react'

import { camelize } from '../lib/String'
const evtNames = ['click', 'mouseover', 'recenter', 'drag', 'dragstart', 'dragend'];

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

export class Heatmap extends React.Component {

  componentDidMount() {
    this.heatmapPromise = wrappedPromise();
    this.Heatmap();
  }

  // componentDidUpdate(prevProps) {
  //   if ((this.props.map !== prevProps.map) ||
  //     (this.props.position !== prevProps.position)) {
  //       this.Heatmap();
  //   }
  // }

  componentWillUpdate(nextProps) {
    if (this.heatmap) {
      this.heatmap.setMap(null);
    }
    
    this.Heatmap(); 
  }

  componentWillUnmount() {
    if (this.heatmap) {
      this.heatmap.setMap(null);
    }
  }

  Heatmap() {
    let {
      map, google, position, positions, mapCenter, ...rest
    } = this.props;

    if (!google) {
      return null;
    }

    const pref = {...rest};
    this.heatmap = new google.maps.visualization.HeatmapLayer(pref);

    evtNames.forEach(e => {
      this.heatmap.addListener(e, this.handleEvent(e));
    });

    this.heatmap.setMap(map);
    this.heatmapPromise.resolve(this.heatmap);
  }

  Heatmap() {
    return this.heatmapPromise;
  }

  handleEvent(evt) {
    return (e) => {
      const evtName = `on${camelize(evt)}`
      if (this.props[evtName]) {
        this.props[evtName](this.props, this.heatmap, e);
      }
    }
  }

  render() {
    return null;
  }
}

Heatmap.propTypes = {
  position: T.object,
  map: T.object
}

evtNames.forEach(e => Heatmap.propTypes[e] = T.func)

Heatmap.defaultProps = {
  name: 'Heatmap'
}

export default Heatmap
