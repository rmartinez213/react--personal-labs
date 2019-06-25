import React, { Component } from 'react'


class EditUser extends Component {

    constructor() {
        super();

        this.state = {
            name: '',
            specialist: '',
            presentation: '',

            home: false,
            edit: true,
            add: false
        }
    }

    onEditUser() {
        this.props.editUser('Yes');
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {

        return(
        <div>
            <table className='tableEditStyle'>
                <tbody>
                    <tr>

                            <td>
                                Name:
                            </td>

                            <td>
                                <input
                                    type='text'
                                    value={this.state.name}
                                    onChange={e => this.onChange(e)}
                                    name='name'
                                />
                            </td>
                    </tr>

                    <tr>
                            <td>
                                Specialist:
                            </td>

                            <td>
                                <input
                                    type='text'
                                    value={this.state.specialist}
                                    onChange={e => this.onChange(e)}
                                    name='specialist'
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
                                />
                            </td>
                    </tr>
                </tbody>
                </table>
                <button onClick={this.onEditUser.bind(this)}>Confirm</button> <button onClick={this.onEditUser.bind(this)}>Cancel</button>
        </div>
    )}
}

export default EditUser