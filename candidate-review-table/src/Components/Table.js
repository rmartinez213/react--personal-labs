import React, { Component } from 'react';
import '../tableStyle.css'
import EditUser from './EditUser'
import AddUser from './AddUser'



class Table extends Component {

    constructor() {
        super();

        this.state = {
            users: [
                { id: 1, name: 'Robert Martinez', specialist: 'Computer Science', presentation: 'The future of technology' },
                { id: 2, name: 'Chief Keif', specialist: 'Buisness', presentation: 'Buisiness to succeed' },
                { id: 3, name: 'Rodger Doger', specialist: 'Architecture', presentation: 'Build and beyond' }
            ],

            home: true,
            edit: false,
            add: false
        }
    }
    

    componentDidMount() {
        
    }


    deleteFunction(index, e) {
        const newUsers = Object.assign([], this.state.users);
        newUsers.splice(index, 1);
        this.setState({ users: newUsers });
    }

    onChangeAddUser(userInfo) {
        this.setState({
            home: true,
            add: false
        })
        const newUser = Object.assign([], this.state.users);
        newUser.push(userInfo);
        this.setState({ users: newUser })
    }
    

    onChanceEditUser(userInfo) {

        this.setState({
            home: true,
            edit: false
        })
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
                                                    <button type='button' onClick={() => { this.setState({ home: false, edit: true }) }}>Edit</button>
                                                    <button type='button' onClick={this.deleteFunction.bind(this, index)}>Delete</button>
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
                            />
                            :
                            <AddUser
                                addUser={this.onChangeAddUser.bind(this)}
                                cancel={this.resetHome.bind(this)}
                                id={this.state.users[this.state.users.length - 1].id}
                            />
                    )
                }
            </div>
        )
    }
}

export default Table;