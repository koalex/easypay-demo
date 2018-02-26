
import React                from 'react';
import PropTypes            from 'prop-types';
import IconButton           from 'material-ui/IconButton';
import Tooltip              from 'material-ui/Tooltip';

import VKIcon               from '../../../assets/SVG-Icons/vk_square.svg';
import FBIcon               from '../../../assets/SVG-Icons/fb_square.svg';
import OKIcon               from '../../../assets/SVG-Icons/odnoklassniki_square.svg';
import MMirIcon             from '../../../assets/SVG-Icons/moi_mir_mailru_square_type2.svg';

const SigninSocials = props => (
	<div {...props}>

		<Tooltip placement="bottom" title={'Войти через профиль VK'}>
			<IconButton>
				<img style={{width: 32}} src={VKIcon} alt="vk logo"/>
			</IconButton>
		</Tooltip>

		<Tooltip placement="bottom" title={'Войти через профиль Facebook'}>
			<IconButton >
				<img style={{width: 32}} src={FBIcon} alt="facebook logo"/>
			</IconButton>
		</Tooltip>
		<Tooltip placement="bottom" title={'Войти через профиль Одноклассники'}>
			<IconButton >
				<img style={{width: 32}} src={OKIcon} alt="odnoklassniki logo"/>
			</IconButton>
		</Tooltip>

		<Tooltip placement="bottom" title={'Войти через профиль Мой Мир'}>
			<IconButton>
				<img style={{width: 32}} src={MMirIcon} alt="мой мир logo" />
			</IconButton>
		</Tooltip>

	</div>
);

export default SigninSocials;