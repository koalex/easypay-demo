import React                                            from 'react';
import PropTypes                                        from 'prop-types';
import { connect }                                      from 'react-redux';
import AppBar                                           from 'material-ui/AppBar';
import Toolbar                                          from 'material-ui/Toolbar';
import Tooltip                                          from 'material-ui/Tooltip';
import AccountCircle                                    from 'material-ui-icons/AccountCircle';
import Typography                                       from 'material-ui/Typography';
import Input, { InputLabel, InputAdornment }            from 'material-ui/Input';
import { FormControl, FormHelperText }                  from 'material-ui/Form';
import Button                                           from 'material-ui/Button';
import PhoneIcon                                        from 'material-ui-icons/Phone';
import PhonesList                                       from './PhoneList'
import dispatch                                         from '../../actionCreators/dispatch';
import signout from '../../actionCreators/signout'
import {
	createPhone,
	readPhones,
	deletePhone,
	checkPhone,
	checkPhoneClear
} from '../../actionCreators/phones';

@connect(state => {
	return {
		phones: state.get('phones').get('items'),
		phoneExist: state.get('phones').get('phoneExist'),
		user: state.get('user')
	}
}, {
	dispatch
})
export default class extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			phoneNumber: ''
		};

		this.props.dispatch(readPhones());
	}

	static propTypes = {
		phones: PropTypes.object,
		dispatch: PropTypes.func.isRequired,
		phoneExist: PropTypes.bool,
		user: PropTypes.object
	};

	checkPhone = () => {
		this.props.dispatch(checkPhone(this.state.phoneNumber));
	};

	phoneChange = ev => {
		let val = ev.target.value;

		if (isNaN(Number(val))) val = val.slice(0, -1);

		this.setState({
			phoneNumber: val.trim()
		});

		if (null != this.props.phoneExist) {
			this.props.dispatch(checkPhoneClear())
		}
	};

	createPhone = () => {
		this.props.dispatch(createPhone(this.state.phoneNumber));
	};

	deletePhone = phone => {
		this.props.dispatch(deletePhone(phone));
	};

	get phoneExist () {
		let result = null;
		if (null == this.props.phoneExist) return result;

		result = this.props.phoneExist ? 'телефон уже существует в БД' : 'телефон не существует в БД';

		return result
	}

	signout = () => {
		this.props.dispatch(signout());
	};

	render () {
		const {user} = this.props;
		return (
			<div>
				<AppBar position="static">
					<Toolbar>
						<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexGrow: 1 }}>
							<Tooltip placement="right" title={`${user.get('name')} ${user.get('surname')}`}>
								<AccountCircle />
							</Tooltip>

							<Button onClick={this.signout}>Выйти</Button>
						</div>
					</Toolbar>
				</AppBar>
				<br/>
				<div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
					<div style={{flexGrow: 1}}>
						<FormControl error={this.props.phoneExist}>
							<InputLabel htmlFor="phone">Номер телефона</InputLabel>
							<Input
								id="phone"
								startAdornment={<InputAdornment position="start"><PhoneIcon /></InputAdornment>}
								value={this.state.phoneNumber}
								onChange={this.phoneChange}
							/>
							<FormHelperText>{this.phoneExist}&nbsp;</FormHelperText>
						</FormControl>

						<br/>
						<br/>

						<Button color="primary" disabled={!Boolean(this.state.phoneNumber)} onClick={this.createPhone}>Добавить</Button>
						<Button color="primary" disabled={!Boolean(this.state.phoneNumber)} onClick={this.checkPhone}>Проверить</Button>
					</div>

					<div style={{flexGrow: 1}}>
						<Typography>Список телефонов</Typography>
						<PhonesList phones={this.props.phones} deletePhone={this.deletePhone}/>
					</div>
				</div>
			</div>

		);
	}
}