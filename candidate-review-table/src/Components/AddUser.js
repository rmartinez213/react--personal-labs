import React, { Component } from 'react'
import '../tableStyle.css'

class AddUser extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: ((this.props.id) + 1),
            name: '',
            specialist: '',
            presentation: ''
        };
    }
  
    change(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        console.log(this.state)
        this.props.addUser(this.state);

        console.log('id: ' + this.state.id)
    }

    render() {

        return (
            <div>
                <form onSubmit={e => this.onSubmit(e)}>
                    <table className='tableEditStyle'>
                        <tbody>
                            <tr>
                                <td>Name:</td>
                                <td>
                                    <input
                                        name='name'
                                        type='text'
                                        value={this.state.nameValue}
                                        onChange={e => this.change(e)}
                                    />
                                </td>
                                </tr>
                                
                            <tr>
                                <td>Specialist:</td>
                                <td>
                                    <input
                                        name='specialist'
                                        type='text'
                                        value={this.state.specialistValue}
                                        onChange={e => this.change(e)}
                                    />
                                </td>
                            </tr>

                            <tr>
                                <td>Presentation:</td>
                                <td>
                                    <input
                                        name='presentation'
                                        type='text'
                                        value={this.state.presentationValue}
                                        onChange={e => this.change(e)}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <input type='submit' value='Submit' />
                </form>
                <button onClick={() => this.props.cancel()}>Cancel</button>
            </div>
            )
    }
}

export default AddUser