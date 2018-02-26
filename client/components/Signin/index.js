import React       from 'react';
import Typography  from 'material-ui/Typography';
import SigninForm  from './SigninForm/container';
import AuthSocials from './SigninSocials';
import logo        from '../../assets/img/logo.svg';

const main = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
};

const authSoc = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
};

export default class Signin extends React.Component {
    render () {

        return (
                <div style={main}>
                    <img src={logo} alt="EasyPay logo"/>
                    <br/>
                    <br/>
                    <div>
                        <SigninForm />
                        <br/>
                        <AuthSocials style={authSoc} />
                    </div>
                </div>
        )
    }
}
