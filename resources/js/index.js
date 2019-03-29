import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

// import components
import Home from './components/Home';
import App from './components/App';
import TaskEdit from './components/TaskEdit';

// to apply component to id
if (document.getElementById('root')) {
    ReactDOM.render(<Home />, document.getElementById('root'));
}

if (document.getElementById('task')) {
    ReactDOM.render(
        <BrowserRouter>
            <div>
                <Switch>
                    //route to edit page
                    <Route exact path='/:id/edit' component={TaskEdit} />
                    <App />
                </Switch>
            </div>
        </BrowserRouter>,
        document.getElementById('task')
    );
}
