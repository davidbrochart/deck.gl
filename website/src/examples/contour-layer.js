import React, {Component} from 'react';
import {MAPBOX_STYLES, DATA_URI, GITHUB_TREE} from '../constants/defaults';
import App, {CONTOURS} from 'website-examples/contour/app';

import makeExample from '../components/example';

class ContourDemo extends Component {
  static title = 'COVID-19 Cases in the United States';

  static data = {
    url: `/covid-us-counties.txt`,
    // url: `${DATA_URI}/covid-us-counties.txt`,
    worker: '/workers/contour-data-decoder.js'
  };
  
  static code = `${GITHUB_TREE}/examples/website/contour`;

  static parameters = {
    cellSize: {displayName: 'Cell size', type: 'range', value: 60000, step: 5000, min: 30000, max: 100000},
    week: {displayName: 'Week', type: 'range', value: 10, step: 1, min: 0, max: 37}
  };

  static mapStyle = MAPBOX_STYLES.DARK;

  static renderInfo(meta) {
    return (
      <div>
        <p>Reported new weekly COVID-19 cases per 100,000 population</p>
        <div className="layout">
          {CONTOURS.map((c, i) => <div className="legend" key={i}
            style={{
              background: `rgb(${c.color.join(',')})`,
              width: `${100 / CONTOURS.length}%`
            }} />)}
        </div>
        <p className="layout">
        {CONTOURS.map((c, i) => <div key={i} className="text-right"
            style={{width: `${100 / CONTOURS.length}%`}} >{i < CONTOURS.length - 1 ? c.threshold[1] : ''}</div>)}
        </p>
        <p>
          Data source: <a href="https://github.com/nytimes/covid-19-data">New York Times </a>
        </p>
      </div>
    );
  }

  render() {
    const {params, data} = this.props;
    const cellSize = params.cellSize.value;
    const week = params.week.value;

    return (
      <App
        {...this.props}
        data={data}
        cellSize={cellSize}
        week={week}
      />
    );
  }
}

export default makeExample(ContourDemo);
