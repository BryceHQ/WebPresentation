import React from 'react';
import {TransitionMotion, spring} from 'react-motion';

import _ from 'lodash';

const ComplexTransition = React.createClass({
  getInitialState() {
    return {
      items: [{key: 'a', size: 10}, {key: 'b', size: 20}, {key: 'c', size: 30}],
    };
  },
  willLeave() {
    // triggered when c's gone. Keeping c until its width/height reach 0.
    return {width: spring(0), height: spring(0)};
  },
  willEnter() {
    return {
      height: 0,
      opacity: 1,
    };
  },
  render() {

    return (
      <TransitionMotion
        willEnter={this.willEnter}
        willLeave={this.willLeave}
        styles={this.state.items.map(item => ({
          key: item.key,
          style: {width: item.size, height: item.size},
        }))}>
        {interpolatedStyles =>
          // first render: a, b, c. Second: still a, b, c! Only last one's a, b.
          <div>
            {interpolatedStyles.map(config => {
              return <div key={config.key} style={_.assign(config.style, {border: '1px solid'}) }/>;
            })}
          </div>
        }
      </TransitionMotion>
    );
  },
});

export default ComplexTransition;
