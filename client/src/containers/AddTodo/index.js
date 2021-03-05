import React, { Component } from 'react'
import axios from 'axios'

export default class AddTodo extends Component {
    constructor(props) {

        super(props);

        this.state = {
            isLoading: false,
            todo: ''
        }

        this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(todo) {
        this.setState({ todo: todo })
    }


    onSubmit(e) {
        e.preventDefault();
        let data = {
            todo: this.state.todo
        }
        axios.post('/todoApp/add', data)
            .then(res => {
                if (res.data === 'Todo Added!') {
                    this.setState({ isLoading: false, error: '' });
                    window.location = '/'
                }
            })

    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <div class="form-group">
                    <label for="exampleInputEmail1">Todo</label>
                    <input type="text" name="todo" class="form-control" onChange={(e) => this.onChange(e.target.value)} placeholder="Enter task here" />
                </div>
                <button type="submit" value="Submit" className="btn btn-primary" class="btn btn-primary">Submit</button>
            </form>
        )
    }
}
