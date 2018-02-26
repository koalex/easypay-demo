import CSS from './index.styl';
import React                                 from 'react';
import PropTypes                             from 'prop-types';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl, FormHelperText }       from 'material-ui/Form';
import { CircularProgress }                  from 'material-ui/Progress';
import { withStyles }                        from 'material-ui/styles';
import orange                                from 'material-ui/colors/orange';

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

class LoginField extends React.PureComponent {
	static propTypes = {
		inputRef: PropTypes.oneOfType([
			PropTypes.func,
			PropTypes.string
		]),
		id: PropTypes.string,
		placeholder: PropTypes.string,
		label: PropTypes.oneOfType([
			PropTypes.node,
			PropTypes.string
		]),
		name: PropTypes.string,
		helperText: PropTypes.oneOfType([
			PropTypes.node,
			PropTypes.string
		]),
		// loading: PropTypes.bool, // FIXME: move to modify
		disabled: PropTypes.bool,
		status: PropTypes.string,
		fullWidth: PropTypes.bool,
		margin: PropTypes.string,
		onChange: PropTypes.func,
		value: PropTypes.string,
		defaultValue: PropTypes.string,
		classes: PropTypes.object,
		startAdornment: PropTypes.oneOfType([
			PropTypes.node,
			PropTypes.string
		]),
		endAdornment: PropTypes.oneOfType([
			PropTypes.node,
			PropTypes.string
		])
	};

	render () {
		const { inputRef, classes, id, label, helperText, disabled, status, fullWidth, onChange, margin, value, defaultValue, name, placeholder, startAdornment, endAdornment, ...rest } = this.props;
		const isError = (status == 'error' || status == 'warning');

		return (
			<FormControl
				disabled={disabled}
				className={rest.className}
				margin={margin || 'none'}
				fullWidth={fullWidth}
				error={isError}
			>
				<InputLabel
					htmlFor={id}
					FormControlClasses={{
						focused: status == 'warning' ? classes.inputLabelFocused: '',
						error: status == 'warning' ? classes.inputLabelFocused: null
					}}
				>
					{label}
				</InputLabel>
				<Input
					classes={{
						inkbar: status == 'warning' ? classes.inputInkbar : '',
					}}
					type="text"
					id={id}
					name={name}
					value={value}
					defaultValue={defaultValue}
					onChange={onChange}
					placeholder={placeholder}
					inputRef={inputRef}
					startAdornment={startAdornment ? <InputAdornment position="start">{startAdornment}</InputAdornment> : null}
					endAdornment={endAdornment ? <InputAdornment position="end">{endAdornment}</InputAdornment> : null}
				/>
				<FormHelperText
					classes={{ error: status == 'warning' ? classes.inputLabelFocused: null }}
				>{helperText}</FormHelperText>
			</FormControl>
		);
	}
}

export default withStyles(styles)(LoginField);