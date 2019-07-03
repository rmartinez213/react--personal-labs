import React, { Component } from 'react'

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            accounts: this.props.accounts
        }
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    onEditUser(e) {
        e.preventDefault();

        this.state.accounts.map((account, index) => {
            if (account.email === this.state.email && account.password === this.state.password) {
                console.log('You are logged in as: ' + account.role);
                this.props.loginUser(account);
            }
        })
    }

    render() {

        return (
            <div className='loginStyle'>
                <form onSubmit={e => this.onEditUser(e)}>
                    
                    <input
                        type='text'
                        onChange={e => this.onChange(e)}
                        name='email'
                        placeholder='Email'
                        value={this.state.email}
                    />

                    <br />

                    <input
                        type='password'
                        onChange={e => this.onChange(e)}
                        name='password'
                        placeholder='Password'
                        value={this.state.password}
                    />

                    <br />

                    <button onClick={() => this.props.cancel()}>Cancel</button>

                    <input
                        type='submit'
                        value='Submit'
                    />
                </form>
            </div>
        )
    }
}

export default Login