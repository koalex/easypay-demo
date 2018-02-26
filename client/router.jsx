/** ✰✰✰ Konstantin Aleksandrov ✰✰✰ https://github.com/koalex ✰✰✰ **/

import React                                from 'react';
import PropTypes                            from 'prop-types';
import Redirect                             from 'react-router-dom/Redirect';
import Route                                from 'react-router-dom/Route';
import Switch                               from 'react-router-dom/Switch';
import universal                            from 'react-universal-component';
import { connect }                          from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Paper                                from 'material-ui/Paper';
import ConnectedRouter                      from 'react-router-redux/ConnectedRouter';
import history                              from './middlewares/history';
import RouteWithSubRoutes                   from './components/RouteWithSubRoutes';
import Preloader                            from './components/PagePreloader';
import NotFound                             from './components/404';
/* ACTION CREATORS */
import dispatch                             from './actionCreators/dispatch';
import auth                                 from './actionCreators/auth';
import blue                                 from 'material-ui/colors/blue';
let theme = createMuiTheme({
	palette: {
		type: 'dark',
		primary: blue
	}
});

const ConnectedSwitch = connect(state => ({
	location: state.get('router').get('location')
}))(Switch);

// for SSR use webpack-flush-chunks -> https://github.com/faceyspacey/webpack-flush-chunks
const Signin = universal(import('./components/Signin'), {
	minDelay: 500,
	alwaysDelay: false,
	loading: () => <Preloader />
	// error
});

const Phones = universal(import('./components/Phones'), {
	minDelay: 500,
	alwaysDelay: false,
	loading: () => <Preloader />
	// error
});


let routes = [
	{
		path: '/phones',
		private: true,
		component: ({ ...props }) => <Phones {...props} />,
		exact: true
	},
	{
		path: '/signin',
		component: ({ ...props }) => {
			if (props.user) return <Redirect to={{ pathname: '/phones' }} />;

			return <Signin {...props} />
		},
		exact: true
	}
];

@connect(state => {
    return {
	    bootstrap: state.get('bootstrap'),
        router: state.get('router'),
        location: state.get('router').get('location'),
	    user: state.get('user')
    };
}, {
	dispatch
})
export default class Routes extends React.Component {
    constructor (props) {
        super(props);
        this.state = {};
	    props.dispatch(auth());
    }

    static propTypes = {
	    bootstrap: PropTypes.bool.isRequired,
	    router: PropTypes.object.isRequired,
	    user: PropTypes.object,
	    dispatch: PropTypes.func.isRequired,
    };

    static childContextTypes = {
	    user: PropTypes.object
    };

	getChildContext () {
		return {
			user: this.props.user
		};
	}

    render () {
        const { bootstrap, user, dispatch } = this.props;
        if (!bootstrap) {
	        return <MuiThemeProvider theme={theme}>
		        <Preloader />
	        </MuiThemeProvider>
        }

	    return (
		    <ConnectedRouter history={history}>
			    <MuiThemeProvider theme={theme}>
				    <Paper style={{ height: '100%', overflow: 'auto' }}>
					    <div style={{ height: '100%' }}>
						    <ConnectedSwitch>
							    {routes.map((route, i) => (
								    <RouteWithSubRoutes
									    key={i}
									    {...route}
									    user={user}
									    dispatch={dispatch}
								    />
							    ))}
							    <Route component={NotFound} />
						    </ConnectedSwitch>
					    </div>
				    </Paper>
			    </MuiThemeProvider>
		    </ConnectedRouter>
	    );
    }
}
