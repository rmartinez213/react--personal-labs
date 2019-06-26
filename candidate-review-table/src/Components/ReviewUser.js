import React, { Component } from 'react'

class ReviewUser extends Component {

    constructor(props) {
        super(props)

        this.state = {
            reviews: this.props.reviews,
            user: this.props.user
        }
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
                            <td>{this.state.user.rating}</td>
                        </tr>
                    </tbody>
                </table>


                <table className='reviewTableClass'>
                    <tbody>
                        {this.state.reviews.map((review, index) => {
                            if (review.UserInterviewID === this.state.user.id) {
                                return (
                                    <tr key={review.id} className='divWidth'>
                                        <td>Rating: {review.rating}</td>
                                        <td align='right'>Posted by {review.name} on {review.date}</td>
                                    </tr>
                                )
                            }
                            return null  
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ReviewUser