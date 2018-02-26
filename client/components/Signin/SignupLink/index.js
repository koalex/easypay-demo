import CSS                  from './index.styl';

import React                from 'react';
import PropTypes            from 'prop-types';
import { withRouter }       from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import Button               from 'modules/UIKit/Button';

const SignupLink = props => {
	const onClick = props.onClick || (ev => {
		ev.preventDefault();
		props.history.push('/signup')
	});

	return (
		<Button
			disabled={props.disabled || false}
			onClick={onClick}
			className={CSS.signupLinkText}
			color="primary"
			dense={true}
			component="a"
			href="/signup"
		>
			<FormattedMessage
				id="Users.Signin.Signup"
				description="Ссылка на страницу создания аккаунта"
				defaultMessage="Создать аккаунт"
			/>
		</Button>
	);
};

SignupLink.propTypes = {
	disabled: PropTypes.bool,
	onClick: PropTypes.func
};

export default withRouter(SignupLink);