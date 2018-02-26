import React       from 'react';
import PropTypes   from 'prop-types';
import Tooltip     from 'material-ui/Tooltip';
import IconButton  from 'material-ui/IconButton';
import PhoneIcon   from 'material-ui-icons/Phone';
import DeleteIcon  from 'material-ui-icons/Delete';
import List, {
	ListItem,
	ListItemIcon,
	ListItemSecondaryAction,
	ListItemText,
} from 'material-ui/List';

import toJS from '../../components/HOC/toJS'

function PhonesList ({phones, deletePhone}) {
	let Phones = null;
	if (phones && phones.length) {
		Phones = phones.map(phoneObj => {
			return <ListItem key={phoneObj._id}>
				<ListItemIcon>
					<PhoneIcon />
				</ListItemIcon>
				<ListItemText
					primary={phoneObj.phone}
				/>
				<ListItemSecondaryAction>
					<Tooltip placement="left" title="удалить">
						<IconButton aria-label="Delete" onClick={() => {
							deletePhone(phoneObj.phone)
						}}>
							<DeleteIcon />
						</IconButton>
					</Tooltip>
				</ListItemSecondaryAction>
			</ListItem>
		})
	}

	return (
		<List >
			{Phones}
		</List>
	);
}

PhonesList.propTypes = {
	phones: PropTypes.array,
	deletePhone: PropTypes.func.isRequired
};

export default toJS(PhonesList);