import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class TaskEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            task: []
        };

        //bind handleChange
        this.handleChange = this.handleChange.bind(this);

        //bind handleSubmit (post request)
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //handle change
    handleChange(e) {
        // console.log('onChange', this.state.name);

        this.setState({
            name: e.target.value
        });
    }

    //handle submit
    handleSubmit(e) {
        e.preventDefault();
        axios
            .put(`/tasks/${this.props.match.params.id}`, {
                name: this.state.name
            })
            .then(response => {
                // console.log('from handle submit', response);

                //after submit back to home page
                this.props.history.push('/');
            });
    }

    //get all the tasks from backend
    getTasks() {
        axios.get(`/tasks/${this.props.match.params.id}/edit`).then(response =>
            this.setState({
                task: response.data.tasks,
                name: response.data.task.name
            })
        );
    }

    //lifecycle method
    componentWillMount() {
        this.getTasks();
    }

    render() {
        //console.log(this.props.match.params.id);
        return (
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-12'>
                        <div className='card'>
                            <div className='card-header'>Edit Task</div>
                            <div className='card-body'>
                                <form onSubmit={this.handleSubmit}>
                                    <div className='form-group'>
                                        <textarea
                                            onChange={this.handleChange}
                                            value={this.state.name}
                                            className='form-control'
                                            rows='5'
                                            maxLength='255'
                                            placeholder='Create a new task'
                                            required
                                        />
                                    </div>
                                    <button
                                        type='submit'
                                        className='btn btn-success'
                                    >
                                        Update
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
