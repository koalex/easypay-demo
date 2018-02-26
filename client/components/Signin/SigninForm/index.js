import CSS                  from './index.styl';

import React                from 'react';
import PropTypes            from 'prop-types';
import LoginField           from '../../LoginField';
import PasswordTextField    from '../../PasswordField';
import Button               from 'material-ui/Button';
import toJS                 from '../../../components/HOC/toJS'


function SigninForm (props) {

	return (
		<form className={CSS['signinForm']} onSubmit={props.onSubmit}>
			<LoginField
				id="login"
				name="login"
				label={'Логин или email'}
				inputRef={props.loginRef}
				disabled={props.disabled}
				validateStatus={props.login.validateStatus}
				defaultValue={props.login.defaultValue || props.login.value}
				helperText={props.login.helperText}
				onChange={props.onFieldChange}
				fullWidth={true}
			/>
			<br/>
			<br/>
			<PasswordTextField
				id="password"
				name="password"
				label={'Пароль'}
				inputRef={props.passwordRef}
				disabled={props.disabled}
				validateStatus={props.password.validateStatus}
				defaultValue={props.password.defaultValue || props.password.value}
				helperText={props.password.helperText}
				onChange={props.onFieldChange}
				fullWidth={true}
			/>
			<br/>
			<br/>
			<div style={{textAlign: 'center'}}>
				<Button
					className={CSS['submitBtn']}
					disabled={props.disabled || props.submitBtn.disabled}
					fullWidth={true}
					raised="true"
					color="primary"
					type="submit"
				>
					Войти
				</Button>
			</div>
		</form>
	);

}

SigninForm.propTypes = {
	onFieldChange: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	loginRef: PropTypes.func,
	passwordRef: PropTypes.func,
	disabled: PropTypes.bool,
	loading: PropTypes.bool,
	login: PropTypes.shape({
		value: PropTypes.string.isRequired,
		defaultValue: PropTypes.string,
		validateStatus: PropTypes.string.isRequired,
		helperText: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
	}).isRequired,
	password: PropTypes.shape({
		value: PropTypes.string.isRequired,
		defaultValue: PropTypes.string,
		validateStatus: PropTypes.string.isRequired,
		helperText: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
	}).isRequired,
	submitBtn: PropTypes.shape({
		disabled: PropTypes.bool.isRequired
	}).isRequired
};

export default toJS(SigninForm);