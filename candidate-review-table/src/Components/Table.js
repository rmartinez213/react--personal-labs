import React, { Component } from 'react';
import '../tableStyle.css'
import EditUser from './EditUser'
import AddUser from './AddUser'
import ReviewUser from './ReviewUser'



class Table extends Component {

    constructor() {
        super();

        this.state = {
            users: [
                { id: 1, name: 'Robert Martinez', specialist: 'Computer Science', presentation: 'The future of technology', rating: 'N/A' },
                { id: 2, name: 'Chief Keif', specialist: 'Buisness', presentation: 'Buisiness to succeed', rating: 2 },
                { id: 3, name: 'Rodger Doger', specialist: 'Architecture', presentation: 'Build and beyond', rating: 4 }
            ],

            home: true,
            edit: false,
            add: false,
            review: false,
            reviews: [
                { id: 1, review: ['This is a review', 'This ia  2', 'Yessss']}
            ],
            currIndex: null
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

    reviewFunction(index, e) {

        console.log('test')

        this.setState({
            editIndex: index,
            home: false,
            edit: false,
            add: false,
            review: true
        });
    }

    onChangeAddUser(newUser) {
        const newArray = Object.assign([], this.state.users);
        newArray.push(newUser);
        this.setState({ users: newArray, home: true, add: false })
    }
    

    onChanceEditUser(editedUser) {
        const newArray = Object.assign([], this.state.users);
        console.log(newArray[this.state.currIndex] = editedUser);
        this.setState({ users: newArray, home: true, edit: false })
    }

    onChangeReview(newReview) {

    }

    resetHome() {
        this.setState({
            home: true,
            add: false,
            edit: false
        })
    }

    render() {

        if (this.state.home) {
            return (
                <div>
                    <table className='tableClass'>
                        <thead>
                            <tr>
                                <td><b>id</b></td>
                                <td><b>Name</b></td>
                                <td><b>Specialist</b></td>
                                <td><b>Presentation</b></td>
                                <td><b>Rating</b></td>
                                <td><b>Operations</b></td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.users.map((user, index) => {
                                return (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td><a onClick={this.reviewFunction.bind(this, index)}>{user.name}</a></td>
                                        <td>{user.specialist}</td>
                                        <td>{user.presentation}</td>
                                        <td>{user.rating}</td>
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
        }

        else if (this.state.add) {
            return(
                <AddUser
                    addUser={this.onChangeAddUser.bind(this)}
                    cancel={this.resetHome.bind(this)}
                    id={(this.state.users.length === 0) ? 0 : this.state.users[this.state.users.length - 1].id}
                />
            )
        }

        else if (this.state.edit) {
            return(
                <EditUser
                    editUser={this.onChanceEditUser.bind(this)}
                    user={this.state.users[this.state.currIndex]}
                    cancel={this.resetHome.bind(this)}
                />
            )
        }

        else if (this.state.review) {
            return (
                <ReviewUser
                    reviewUser={this.onChangeReview.bind(this)}
                    user={this.state.users[this.state.currIndex]}
                    cancel={this.resetHome.bind(this)}
                />
            )
        }
        else {
            return (
                <div>
                </div>
                )
        }
    }
}

export default Table;