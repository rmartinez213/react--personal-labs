import React, { Component } from 'react'


class EditUser extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: this.props.user,

            id: this.props.user.id,
            name: this.props.user.name,
            specialist: this.props.user.specialist,
            presentation: this.props.user.presentation
        }
    }

    onEditUser(e) {
        e.preventDefault();

        var newUser = {
            id: this.state.id,
            name: this.state.name,
            specialist: this.state.specialist,
            presentation: this.state.presentation
        }

        this.props.editUser(newUser);
    }
    

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {

        return(
            <div>
                <form onSubmit={e => this.onEditUser(e) }>
                <table className='tableEditStyle'>
                    <tbody>
                        <tr>

                                <td>Name:</td>

                                <td>
                                    <input
                                        type='text'
                                        value={this.state.name}
                                        onChange={e => this.onChange(e)}
                                        name='name'
                                        placeholder={this.state.name}
                                    />
                                </td>
                        </tr>

                        <tr>
                            <td>Specialist:</td>

                            <td>
                                <input
                                    type='text'
                                    value={this.state.specialist}
                                    onChange={e => this.onChange(e)}
                                    name='specialist'
                                    placeholder={this.state.specialist}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>
                                Presentation:
                            </td>

                            <td>
                                <input
                                    type='text'
                                    value={this.state.presentation}
                                    onChange={e => this.onChange(e)}
                                    name='presentation'
                                    placeholder={this.state.presentation}
                                />
                            </td>
                        </tr>
                    </tbody>
                    </table>
                    <input type='Submit' />
                </form>
                    

                <button onClick={() => this.props.cancel()}>
                    Cancel
                </button>
        </div>
    )}
}

export default EditUser