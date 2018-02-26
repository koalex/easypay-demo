
import React                from 'react';
import Button               from 'material-ui/Button';
import { withTheme }        from 'material-ui/styles';
import VKIcon               from '../../assets/SVG-Icons/vk_square.svg';
import FBIcon               from '../../assets/SVG-Icons/fb_square.svg';
import OKIcon               from '../../assets/SVG-Icons/odnoklassniki_square.svg';
import MMirIcon             from '../../assets/SVG-Icons/moi_mir_mailru_square_type2.svg';


const signupSocBtnVK = {
	justifyContent: 'flex-start',
	backgroundColor: '#4974a1'
};

const signupSocBtnFB = {
	justifyContent: 'flex-start',
	backgroundColor: '#47629c'
};

const signupSocBtnOK = {
	justifyContent: 'flex-start',
	backgroundColor: '#e67f40'
};

const signupSocBtnMMIR = {
	justifyContent: 'flex-start',
	backgroundColor: '#1b64a6'
};

const SignupSocials = props => (
	<div>
		<div>
			<Button disabled={!!props.disabled} raised="true" fullWidth={true} style={signupSocBtnVK}>
				<img style={{width: 32, marginRight: props.theme.spacing.unit}} src={VKIcon} alt="vk logo"/>
				ВКонтакте
			</Button>
		</div>
		<br/>
		<div>
			<Button disabled={!!props.disabled} raised="true" fullWidth={true} style={signupSocBtnFB}>
				<img style={{width: 32, marginRight: props.theme.spacing.unit}} src={FBIcon} alt="facebook logo"/>
				Facebook
			</Button>
		</div>
		<br/>
		<div>
			<Button disabled={!!props.disabled} raised="true" fullWidth={true} style={signupSocBtnOK}>
				<img style={{width: 32, marginRight: props.theme.spacing.unit}} src={OKIcon} alt="odnoklassniki logo"/>
				Одноклассники
			</Button>
		</div>
		<br/>
		<div>
			<Button disabled={!!props.disabled} raised="true" fullWidth={true} style={signupSocBtnMMIR}>
				<img style={{width: 32, marginRight: props.theme.spacing.unit}} src={MMirIcon} alt="мой мир logo" />
				Мой Мир
			</Button>
		</div>
	</div>
);

export default withTheme()(SignupSocials);