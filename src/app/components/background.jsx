import React from 'react';

import classNames from 'classnames';

const Background = React.createClass({

	propTypes: {
    url: React.PropTypes.string,
    className: React.PropTypes.string,
		type: React.PropTypes.string,
  },

	render() {
    var {className, url, type} = this.props;
		var componentClass = classNames('background', className);
		var mask = null;
		var style = {
			backgroundImage: `url(${url})`,
		};
		if(type === 'gradient'){
			mask = (<div className="bg-gradient"></div>);
		}

		return (
			<div className={componentClass}>
        {mask}
				<div className="bg" style={style}></div>
			</div>
		);
	}
});

export default Background;
