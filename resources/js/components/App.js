import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            tasks: []
        };

        //bind handleChange
        this.handleChange = this.handleChange.bind(this);

        //bind handleSubmit (post request)
        this.handleSubmit = this.handleSubmit.bind(this);

        //bind renderTasks
        this.renderTasks = this.renderTasks.bind(this);

        //bind handleDelete
        this.handleDelete = this.handleDelete.bind(this);
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
            .post('/tasks', {
                name: this.state.name
            })
            .then(response => {
                // console.log('from handle submit', response);

                this.setState({
                    //we are using ... three dots (spread operator) to spread out the tasks in an array along with the existing tasks that are or will be available in the state and finally merge.
                    tasks: [response.data, ...this.state.tasks],

                    // then clear the value of textarea
                    name: ''
                });
            });
    }

    //render tasks list
    renderTasks() {
        return this.state.tasks.map(task => (
            <div key={task.id} className='media'>
                <div className='media-body'>
                    <div>
                        {task.name}{' '}
                        <span className='text-muted'>
                            <br />
                            by {task.user.name} |{' '}
                            {task.updated_at
                                .split(' ')
                                .slice(1)
                                .join(' ')}
                        </span>
                        <Link
                            to={`/${task.id}/edit`}
                            className='btn btn-sm btn-info float-right'
                        >
                            Update
                        </Link>
                        <button
                            onClick={() => this.handleDelete(task.id)}
                            className='btn btn-sm btn-danger float-right'
                        >
                            Delete
                        </button>
                    </div>
                    <hr />
                </div>
            </div>
        ));
    }

    //get all the tasks from backend
    getTasks() {
        axios.get('/tasks').then(response =>
            this.setState({
                tasks: [...response.data.tasks]
            })
        );
    }

    //lifecycle method
    componentWillMount() {
        this.getTasks();
    }

    //handle delete
    handleDelete(id) {
        //remove from local state
        const isNotId = task => task.id !== id;
        const updatedTasks = this.state.tasks.filter(isNotId);

        this.setState({ tasks: updatedTasks });

        //make delete request to the backend
        axios.delete(`/tasks/${id}`);
    }

    render() {
        return (
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-12'>
                        <div className='card'>
                            <div className='card-header'>Create Task</div>
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
                                        className='btn btn-primary'
                                    >
                                        Create Task
                                    </button>
                                </form>
                                <hr />
                                {this.renderTasks()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
