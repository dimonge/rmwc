import React from 'react';
import PropTypes from 'prop-types';
import { MDCSimpleMenu } from '@material/menu';
import MDCComponentBase from '../_base/mdc-component-base';
import { List } from '../list/list';

import simpleComponentFactory from '../_base/simple-component-factory';

export const MenuEl = simpleComponentFactory(
	'MenuEl', 'div',
	{
		className: 'mdc-simple-menu',
		tabIndex: '-1'
	}
);

export class Menu extends MDCComponentBase {
	static MDCComponentClass = MDCSimpleMenu;

	static propTypes = {
		...MenuEl.propTypes,
		...MDCComponentBase.propTypes,
		open: PropTypes.bool,
		onChange: PropTypes.func,
		onSelected: PropTypes.func
	}

	static defaultProps = {
		...MenuEl.defaultProps,
		...MDCComponentBase.defaultProps,
		onChange: () => {},
		onSelected: () => {}
	}

	MDCComponentDidMount() {
		this.MDCRegisterListener('MDCSimpleMenu:cancel', (evt) => this.handleOnChange(evt));
		this.MDCRegisterListener('MDCSimpleMenu:selected', (evt) => {
			this.handleOnChange(evt);
			this.props.onSelected(evt);
		});
	}

	MDCHandleProps(nextProps) {
		if (nextProps.open !== undefined && this.MDCApi.open !== nextProps.open) {
			this.MDCApi.open = nextProps.open;
		}
	}

	handleOnChange(evt) {
		evt.target.value = false;
		this.props.onChange(evt);
	}

	render() {
		const {
			children,
			open,
			onChange,
			onSelected,
			apiRef,
			...rest } = this.props;

		return (
			<MenuEl {...rest}>
				<List className="mdc-simple-menu__items" role="menu" aria-hidden="true">
					{children}
				</List>
			</MenuEl>
		);
	}
}

export default Menu;