import React                                    from 'react';
import PropTypes                                from 'prop-types';
import IconButton                               from 'material-ui/IconButton';
import Input, { InputLabel, InputAdornment }    from 'material-ui/Input';
import { FormControl, FormHelperText }          from 'material-ui/Form';
import Visibility                               from 'material-ui-icons/Visibility';
import VisibilityOff                            from 'material-ui-icons/VisibilityOff';
import { withStyles }                           from 'material-ui/styles';
import orange                                   from 'material-ui/colors/orange';


const styles = theme => ({
	inputLabelFocused: {
		color: orange[500],
	},
	inputInkbar: {
		'&:after': {
			backgroundColor: orange[500],
		},
	}
});

class PasswordTextField extends React.Component {
	/*constructor (props) {
		super(props);

	}*/
	state = {
		showPassword: false
	};

	static propTypes = {
		inputRef: PropTypes.oneOfType([
			PropTypes.func,
			PropTypes.string
		]),
		id: PropTypes.string,
		label: PropTypes.node,
		classes: PropTypes.object,
		name: PropTypes.string,
		helperText: PropTypes.oneOfType([
			PropTypes.node,
			PropTypes.string
		]),
		required: PropTypes.bool,
		disabled: PropTypes.bool,
		error: PropTypes.bool,
		fullWidth: PropTypes.bool,
		className: PropTypes.string,
		margin: PropTypes.string,
		onChange: PropTypes.func,
		value: PropTypes.string,
		defaultValue: PropTypes.string,
		validateStatus: PropTypes.string
	};

	handleClickShowPasssword = () => {
		this.setState({
			showPassword: !this.state.showPassword
		});
	};

	handleMouseDownPassword = event => {
		event.preventDefault();
	};

	get VisibilityIconProps () {
		return {
			style: {
				width: 20,
				height: 20,
			}
		}
	}

	render () {
		const { inputRef, classes, id, label, helperText, disabled, validateStatus, fullWidth, onChange, margin, value, defaultValue, name, placeholder, ...rest } = this.props;
		const isError = (validateStatus == 'error' || validateStatus == 'warning');
		return (
			<FormControl
				required={rest.required}
				disabled={disabled}
				className={rest.className}
				classes={rest.classes}
				margin={margin || 'none'}
				fullWidth={!!fullWidth}
				error={isError}
			>
				<InputLabel
					FormControlClasses={{
						focused: validateStatus == 'warning' ? classes.inputLabelFocused: '',
						error: validateStatus == 'warning' ? classes.inputLabelFocused: null
					}}
					htmlFor={id}
				>
					{label}
				</InputLabel>
				<Input
					inputRef={inputRef}
					classes={{
						inkbar: validateStatus == 'warning' ? classes.inputInkbar : '',
					}}
					id={id}
					name={name}
					value={value}
					defaultValue={defaultValue}
					type={this.state.showPassword ? 'text' : 'password'}
					onChange={onChange}
					placeholder={placeholder}
					endAdornment={
						<InputAdornment position="end">
							<IconButton
								aria-label="Show/hide password"
								onClick={this.handleClickShowPasssword}
								onMouseDown={this.handleMouseDownPassword}
							>
								{this.state.showPassword ? <VisibilityOff {...this.VisibilityIconProps} /> : <Visibility {...this.VisibilityIconProps}/>}
							</IconButton>
						</InputAdornment>
					}
				/>
				<FormHelperText classes={{ error: validateStatus == 'warning' ? classes.inputLabelFocused: null }}>{helperText}</FormHelperText>
			</FormControl>
		);
	}
}

export default withStyles(styles)(PasswordTextField);