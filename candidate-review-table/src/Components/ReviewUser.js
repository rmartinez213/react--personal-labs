import React, { Component } from 'react'
import { Date } from 'core-js';

class ReviewUser extends Component {

    constructor(props) {
        super(props)

        this.state = {
            reviews: this.props.reviews,
            user: this.props.user,

            inputReviewVal: 3,
            inputName: '',
            inputComment: ''
        }
    }

    onSubmitReview(e) {
        e.preventDefault();

        var date = new Date();
        var formatedDate = date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear();
        var newReview = null;

        if (this.state.reviews.length === 0) {
            newReview = {
                id: 1,
                UserInterviewID: this.state.user.id,
                rating: parseInt(this.state.inputReviewVal),
                name: this.state.inputName,
                date: formatedDate,
                comment: this.state.inputComment
            }
        }

        else {
            newReview = {
                id: this.state.reviews[this.state.reviews.length - 1].id + 1,
                UserInterviewID: this.state.user.id,
                rating: parseInt(this.state.inputReviewVal),
                name: this.state.inputName,
                date: formatedDate,
                comment: this.state.inputComment
            }
        }


        this.props.reviewUser(newReview);
    }

    //Manage keystroke events
    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value 
        })
    }

    //Manage radio button changes
    onChangeRadio(e) {
        this.setState({
            [e.target.name]: e.target.id
        })
    }


    render() {


        return (
            <div className='AlignDivStyle'>
                <button className='noStyleButton' align='left' onClick={() => this.props.cancel()}> Return to home</button>
                <table className='tableClass'>
                    <thead>
                        <tr>
                            <td><b>id</b></td>
                            <td><b>Name</b></td>
                            <td><b>Specialist</b></td>
                            <td><b>Presentation</b></td>
                            <td><b>Rating</b></td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{this.state.user.id}</td>
                            <td>{this.state.user.name}</td>
                            <td>{this.state.user.specialist}</td>
                            <td>{this.state.user.presentation}</td>
                            <td>{this.state.user.rating === 'NONE' ? this.state.user.rating : (this.state.user.rating / this.state.user.totalReviews).toPrecision(3)}</td>
                        </tr>
                    </tbody>
                </table>

                <table className='reviewTableStyle'>
                    <tbody>
                        {this.state.reviews.map((review, index) => {
                            if (review.UserInterviewID === this.state.user.id) {
                                return [
                                    <tr key={review.id}>
                                        <td className='ratingStyle'>Rating: {review.rating}</td>
                                        <td align='right'>Posted by {review.name} on {review.date}</td>
                                    </tr>,

                                    <tr className='commentStyle' key={review.id + '-1'}>
                                        <td colSpan={2}>
                                        Comment: {review.comment}
                                        </td>
                                    </tr>
                                ]
                            }
                            return null
                        })}
                    </tbody>
                </table>

                <form onSubmit={e => this.onSubmitReview(e)}>
                    <table className='reviewTableInputStyle'>
                        <tbody>
                            <tr>
                                <td><b>Rating</b></td>
                                <td align='left'>
                                    1<input id={1} name='inputReviewVal' type='radio' onChange={e => this.onChangeRadio(e)} />
                                    <input id={2} name='inputReviewVal' type='radio' onChange={e => this.onChangeRadio(e)} />
                                    <input id={3} name='inputReviewVal' type='radio' onChange={e => this.onChangeRadio(e)} />
                                    <input id={4} name='inputReviewVal' type='radio' onChange={e => this.onChangeRadio(e)} />
                                    <input id={5} name='inputReviewVal' type='radio' onChange={e => this.onChangeRadio(e)} />5
                                </td>
                            </tr>

                            <tr>
                                <td><b>Name</b></td>
                                <td align='left'><input type='text' onChange={e => this.onChange(e)} value={this.state.inputName} name='inputName' /></td>
                            </tr>

                            <tr>
                                <td><b>Comments</b></td>
                                <td align='left'><textarea name='inputComment' onChange={e => this.onChange(e)} value={this.state.inputComment} cols='100' rows='7' /></td>
                            </tr>

                            <tr>
                                <td colSpan='2'><input type='submit' /></td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            
            </div>
        )
    }
}

export default ReviewUser