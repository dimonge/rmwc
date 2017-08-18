import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { MDCRipple } from '@material/ripple';
import { getProviderOptions } from '../provider/provider';
import simpleComponentFactory from '../_base/simple-component-factory';

export const ButtonEl = simpleComponentFactory('ButtonEl', 'button', {className: 'mdc-button'});

export class Button extends React.Component {
	static contextTypes = {
		RMDCOptions: PropTypes.object
	}

	static propTypes = {
		...ButtonEl.propTypes,
		dense: PropTypes.bool,
		raised: PropTypes.bool,
		compact: PropTypes.bool,
		primary: PropTypes.bool,
		accent: PropTypes.bool,
		ripple: PropTypes.bool
	}

	static defaultProps = {
		...ButtonEl.defaultProps,
		dense: false,
		raised: false,
		compact: false,
		primary: false,
		accent: false
	}

	componentWillMount() {
		this.providerOptions = getProviderOptions(this.context);
	}

	componentDidMount() {
		const { buttonDefaultRipple } = this.providerOptions;
		const shouldRipple = this.props.ripple === undefined
			? buttonDefaultRipple
			: this.props.ripple;

		if (shouldRipple) {
			MDCRipple.attachTo(ReactDOM.findDOMNode(this));
		}
	}

	render() {
		const {
			className,
			children,
			dense,
			raised,
			compact,
			primary,
			accent,
			ripple,
			...rest } = this.props;

		const classes = classNames(
			className,
			{
				'mdc-button--dense': dense,
				'mdc-button--raised': raised,
				'mdc-button--compact': compact,
				'mdc-button--primary': primary,
				'mdc-button--accent': accent
			}
		);
		return (
			<ButtonEl className={classes} {...rest}>{children}</ButtonEl>
		);
	}
}

export default Button;