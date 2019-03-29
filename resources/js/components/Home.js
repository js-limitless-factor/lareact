import React, { Component } from 'react';

export default class Home extends Component {
    render() {
        return (
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-12'>
                        <div className='card'>
                            <div className='card-header'>ReactJS Component</div>

                            <div className='card-body'>
                                <h5 className='card-title'>Title Here</h5>
                                <p className='card-text'>
                                    With supporting text below as a natural
                                    lead-in to additional content.
                                </p>
                                <a href='#' className='btn btn-info'>
                                    Go somewhere
                                </a>
                            </div>
                        </div>
                        <div className='text-muted'>
                            Currently using React {React.version}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
