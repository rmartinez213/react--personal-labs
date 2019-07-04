import React, { Component } from 'react'
import { Date } from 'core-js';

class ReviewUser extends Component {

    constructor(props) {
        super(props)

        this.state = {
            
            reviews: this.props.reviews,
            user: this.props.user,
            account: this.props.loginAccount,

            //For user input
            inputReviewVal: 3,
            inputName: '',
            inputComment: '',

            //For radio button input
            checked1: '',
            checked2: '',
            checked3: '',
            checked4: '',
            checked5: '',

            //Values for exporting to TableComponent
            isReviewed: false,
            UserIndex: null,
            OldRating: null
        }
    }

    componentWillMount() {

        //Setting states for existing reviews for candidates (1 review per user per candidate)
        if (this.state.account !== null) {
            this.state.reviews.map((review, userIndex) => {
                if (review.AccountID === this.state.account.id && this.state.user.id === review.UserInterviewID) {
                    this.setState({
                        inputName: review.name,
                        inputReviewVal: review.rating,
                        inputComment: review.comment,
                        ['checked' + review.rating]: 'checked',
                        isReviewed: true,
                        UserIndex: userIndex,
                        OldRating: review.rating
                    })
                    return null;
                }
            })
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
                AccountID: this.state.account.id,
                rating: parseInt(this.state.inputReviewVal),
                name: this.state.account.name,
                date: formatedDate,
                comment: this.state.inputComment
            }
        }

        else {
            newReview = {
                id: this.state.reviews[this.state.reviews.length - 1].id + 1,
                UserInterviewID: this.state.user.id,
                AccountID: this.state.account.id,
                rating: parseInt(this.state.inputReviewVal),
                name: this.state.account.name,
                date: formatedDate,
                comment: this.state.inputComment
            }
        }

        this.props.reviewUser(newReview, this.state.isReviewed, this.state.UserIndex, this.state.OldRating);
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
            [e.target.name]: e.target.id,
            ['checked' + this.state.inputReviewVal]: '',
            ['checked' + e.target.id]: 'checked'
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

                {/* Display edit table based on signed in account */}
                {(this.state.account !== null) ? (
                    <form onSubmit={e => this.onSubmitReview(e)}>
                        <table className='reviewTableInputStyle'>
                            <tbody>
                                <tr>
                                    <td><b>Rating</b></td>
                                    <td align='left'>
                                        1<input id={1} name='inputReviewVal' type='radio' onChange={e => this.onChangeRadio(e)} checked={this.state.checked1} />
                                        <input id={2} name='inputReviewVal' type='radio' onChange={e => this.onChangeRadio(e)} checked={this.state.checked2} />
                                        <input id={3} name='inputReviewVal' type='radio' onChange={e => this.onChangeRadio(e)} checked={this.state.checked3} />
                                        <input id={4} name='inputReviewVal' type='radio' onChange={e => this.onChangeRadio(e)} checked={this.state.checked4} />
                                        <input id={5} name='inputReviewVal' type='radio' onChange={e => this.onChangeRadio(e)} checked={this.state.checked5} />5
                                    </td>
                                </tr>

                                <tr>
                                    <td><b>Comments</b></td>
                                    <td align='left'><textarea onChange={e => this.onChange(e)} value={this.state.inputComment} name='inputComment' cols='100' rows='7' /></td>
                                </tr>

                                <tr>
                                    <td colSpan='2'><input type='submit' /></td>
                                </tr>
                            </tbody>
                        </table>
                </form>
                ): 
                    (
                        null
                )
            }

    
            </div>
        )
    }
}

export default ReviewUser