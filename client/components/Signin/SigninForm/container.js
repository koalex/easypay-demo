import React                                            from 'react';
import PropTypes                                        from 'prop-types';
import { connect }                                      from 'react-redux';
import { push }                                         from 'react-router-redux'
import { submit, formChange }                           from '../../../actionCreators/signin';
import throttle                                         from '../../../utils/throttle';

import SigninForm from './index';

@connect(state => {
	const signinForm = state.get('signinForm');
	return { signinForm };
})
export default class extends React.Component {

	static propTypes = {
		dispatch: PropTypes.func.isRequired,
		signinForm: PropTypes.object
	};

	componentDidUpdate(prevProps, prevState) {
		if (this.props.signinForm.getIn(['fields', 'login', 'validateStatus'])) {
			this.loginInput.focus();
		} else if (this.props.signinForm.getIn(['fields', 'password', 'validateStatus'])) {
			this.passwordInput.focus();
		}
	}

	loginInput = null;
	passwordInput = null;
	loginRef = input => {this.loginInput = input;};
	passwordRef = input => {this.passwordInput = input;};

	signinHandleSubmit = ev => {
		ev.preventDefault();
		const login = this.props.signinForm.getIn(['fields', 'login', 'value']).trim(),
			password = this.props.signinForm.getIn(['fields', 'password', 'value']).trim();

		if (login && password) this.props.dispatch(submit({ login, password }));
	};

	handleSigninFieldChange = ev => {
		if (ev.persist) ev.persist();

		this.throttleHandleFieldChange(ev);
	};

	throttleHandleFieldChange = throttle(ev => {
		const { name, id, value } = ev.target;
		this.props.dispatch(formChange({ name, id, value }));
	}, 100);

	get signinFormProps () {
		return {
			onFieldChange: this.handleSigninFieldChange,
			onSubmit: this.signinHandleSubmit,
			loading: this.props.signinForm.get('loading'),
			disabled: this.props.signinForm.get('disabled'),
			login: this.props.signinForm.getIn(['fields', 'login']),
			password: this.props.signinForm.getIn(['fields', 'password']),
			rememberMe: this.props.signinForm.getIn(['fields', 'rememberMe']),
			submitBtn: this.props.signinForm.getIn(['fields', 'submitBtn'])
		}
	}



	componentDidMount () {}

	render () {
		return (
			<SigninForm loginRef={this.loginRef} passwordRef={this.passwordRef} {...this.signinFormProps} />
		);
	}
}