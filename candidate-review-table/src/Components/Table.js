import React, { Component } from 'react';
import '../tableStyle.css'
import EditUser from './EditUser'
import AddUser from './AddUser'



class Table extends Component {

    constructor() {
        super();

        this.state = {
            users: [
            ],

            home: true,
            edit: false,
            add: false,
            editIndex: null
        }
    }

    componentDidMount() {
        
    }

    deleteFunction(index, e) {
        const newUsers = Object.assign([], this.state.users);
        newUsers.splice(index, 1);
        this.setState({ users: newUsers });
    }

    editUserFunction(index, e) {

        
        this.setState({
            editIndex: index,
            home: false,
            edit: true
        });

    }

    onChangeAddUser(newUser) {
        const newArray = Object.assign([], this.state.users);
        newArray.push(newUser);
        this.setState({ users: newArray, home: true, add: false })
    }
    

    onChanceEditUser(editedUser) {
        const newArray = Object.assign([], this.state.users);
        console.log(newArray[this.state.editIndex] = editedUser);
        this.setState({ users: newArray, home: true, edit: false })
    }

    resetHome() {
        this.setState({
            home: true,
            add: false,
            edit: false
        })
    }

    render() {

        return (
            <div>
                {this.state.home ? (
                    <div>
                        <table className='tableClass'>
                            <thead>
                                <tr>
                                    <td><b>id</b></td>
                                    <td><b>Name</b></td>
                                    <td><b>Specialist</b></td>
                                    <td><b>Presentation</b></td>
                                    <td><b>Operations</b></td>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.users.map((user, index) => {
                                    return (
                                        <tr key={user.id}>
                                            <td>{user.id}</td>
                                            <td>{user.name}</td>
                                            <td>{user.specialist}</td>
                                            <td>{user.presentation}</td>
                                            <td>
                                                <button
                                                    type='button'
                                                    onClick={this.editUserFunction.bind(this, index)}>
                                                    Edit
                                                </button>
                                                <button type='button' onClick={this.deleteFunction.bind(this, user)}>Delete</button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        <button onClick={() => { this.setState({ home: false, add: true }) }}>Add Student</button>
                    </div>
                )
                    :
                    (
                        this.state.edit
                            ?
                            <EditUser
                                editUser={this.onChanceEditUser.bind(this)}
                                user={this.state.users[this.state.editIndex]}
                                cancel={this.resetHome.bind(this)}
                            />
                            :
                            <AddUser
                                addUser={this.onChangeAddUser.bind(this)}
                                cancel={this.resetHome.bind(this)}
                                id={(this.state.users.length === 0) ? 0 : this.state.users[this.state.users.length - 1].id}
                            />
                    )
                }
            </div>
        )
    }
}

export default Table;