import React, { Component } from 'react';
import '../tableStyle.css'
import EditUser from './EditUser'
import AddUser from './AddUser'
import ReviewUser from './ReviewUser'
import Login from './Login'

const checkAuth = () => {
    const token = localStorage.getItem('token')
    const refreshToken = localStorage.getItem('refreshToken');

    console.log(token);
    console.log(refreshToken);

    if (!token || !refreshToken) {
        return false;
    }
}

class Table extends Component {

    /*
    */

    constructor() {
        super();

        this.state = {
            users: [
                { id: 1, name: 'Robert Martinez', specialist: 'Computer Science', presentation: 'The future of technology', rating: 'NONE', totalReviews: 0 },
                { id: 2, name: 'Chief Keif', specialist: 'Buisness', presentation: 'Buisiness to succeed', rating: 'NONE', totalReviews: 2 },
                { id: 3, name: 'Rodger Doger', specialist: 'Architecture', presentation: 'Build and beyond', rating: 'NONE', totalReviews: 0 }
            ],

            reviews: [
                { id: 1, UserInterviewID: 2, rating: 1, name: 'Daniel Rodgriguez', date: '2/18/2019', comment: 'He has a unique voice' },
                { id: 2, UserInterviewID: 2, rating: 3, name: 'Johnny Sizario', date: '5/2/2019', comment: 'He likes raw chicken. He has so much stuff in class in terms of material. He only allows you to use 1 cheat sheet for the final.' }
            ],

            accounts: [
                {
                    id: 1,
                    role: 'admin',
                    name: 'Redmundo Zakkary',
                    email: 'remk@yahoo.com',
                    password: '1234'
                },

                {
                    id: 2, role: 'admin',
                    name: 'Jefferey Wilcox',
                    email: 'jeffcox@yahoo.com',
                    password: '1234'
                },

                {
                    id: 3,
                    role: 'user',
                    name: 'Bill French',
                    email: 'billFrench@yahoo.com',
                    password: '1234'
                }
            ],

            home: true,
            edit: false,
            add: false,
            review: false,
            login: false,

            currIndex: null,
            userRole: ''
        }
    }

    componentWillMount() {

        console.log(this.state.accounts[2].reviews[0].name)

        //UNCOMMENT if database will be used or there is local existing data
        var newArray = null;
        
        this.state.users.map((user, userIndex) => {
            this.state.reviews.map((reviewUser, index) => {
                if (user.id === reviewUser.UserInterviewID && user.rating === 'NONE') {
                    //console.log('NEW REVIEW FOR OTHER');
                    newArray = Object.assign([], this.state.users);
                    newArray[userIndex].rating = reviewUser.rating;
                    newArray[userIndex].totalReviews = 1;
                    this.setState({ users: newArray });
                }

                else if (reviewUser.UserInterviewID === user.id) {
                    newArray = Object.assign([], this.state.users)
                    newArray[userIndex].rating += reviewUser.rating
                    newArray[userIndex].totalReviews += 1
                    this.setState({ users: newArray })
                }
            })
        })
        
    }
    
    deleteFunction(index, e) {
        const newUsers = Object.assign([], this.state.users);
        newUsers.splice(index, 1);
        this.setState({ users: newUsers });
    }

    editUserFunction(index, e) {
        this.setState({
            currIndex: index,
            home: false,
            edit: true
        });
    }

    reviewFunction(index, e) {
        this.setState({
            currIndex: index,
            home: false,
            edit: false,
            add: false,
            review: true
        });
    }

    loginFunction(index, e) {
        this.setState({
            home: false,
            edit: false,
            add: false,
            review: false,
            login: true
        });
    }

    //Create new array obj and set state
    onChangeAddUser(newUser) {
        const newArray = Object.assign([], this.state.users);
        newArray.push(newUser);
        this.setState({ users: newArray, home: true, add: false })
    }
    
    //Create new array obj, edit array values, and set state
    onChanceEditUser(editedUser) {
        const newArray = Object.assign([], this.state.users);
        console.log(newArray[this.state.currIndex] = editedUser);
        this.setState({ users: newArray, home: true, edit: false })
    }

    onChangeReview(newReview) {
        console.log(newReview)

        //Add new review to existing list
        var newReviewArray = Object.assign([], this.state.reviews)
        newReviewArray.push(newReview);
        this.setState({ reviews: newReviewArray, home: true, review: false })

        var newArray = null;

        this.state.users.map((user, userIndex) => {
            if (user.id === newReview.UserInterviewID && user.rating === 'NONE') {
                newArray = Object.assign([], this.state.users);
                newArray[userIndex].rating = newReview.rating;
                newArray[userIndex].totalReviews = 1;
                this.setState({ users: newArray });
            }

            else if (user.id === newReview.UserInterviewID) {
                newArray = Object.assign([], this.state.users)
                newArray[userIndex].rating += newReview.rating;
                newArray[userIndex].totalReviews += 1;
                this.setState({ users: newArray });
            }
        })
    }

    onLogin(newLogin) {
        this.setState({
            home: true,
            Login: false
        })

        this.setState({
            userRole: newLogin.role
        })
    }

    resetHome() {
        this.setState({
            home: true,
            add: false,
            edit: false,
            review: false,
            login: false
        })
    }

    render() {
        if (this.state.home) {
            return (
                <div className='AlignDivStyle'>
                    <button className='noStyleButton' onClick={this.loginFunction.bind(this)}>Log in</button>
                    <table className='tableClass'>
                        <thead>
                            <tr>
                                <td><b>id</b></td>
                                <td><b>Name</b></td>
                                <td><b>Specialist</b></td>
                                <td><b>Presentation</b></td>
                                <td><b>Rating</b></td>
                                {this.state.userRole === 'admin' ? (
                                    <td> <b>Operations</b></td>
                                ) :
                                    (null)
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.users.map((user, index) => {
                                return (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td><button onClick={this.reviewFunction.bind(this, index)} className='noStyleButton'>{user.name}</button></td>
                                        <td>{user.specialist}</td>
                                        <td>{user.presentation}</td>
                                        <td>{user.rating === 'NONE' ? user.rating : (user.rating / user.totalReviews).toPrecision(3)}</td>
                                        {this.state.userRole === 'admin' ? (
                                            <td>
                                                <button
                                                    type='button'
                                                    onClick={this.editUserFunction.bind(this, index)}>
                                                    Edit
                                                </button>
                                                <button type='button' onClick={this.deleteFunction.bind(this, user)}>Delete</button>
                                            </td>
                                            )
                                            :
                                            (null)
                                        }
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    {this.state.userRole === 'admin' ? (
                        <button onClick={() => { this.setState({ home: false, add: true }) }}>Add Student</button>
                        ) :
                        (null)
                    }
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
                    reviews={this.state.reviews}
                    cancel={this.resetHome.bind(this)}
                />
            )
        }
        else if (this.state.login) {
            return (
                <Login
                    loginUser={this.onLogin.bind(this)}
                    accounts={this.state.accounts}
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