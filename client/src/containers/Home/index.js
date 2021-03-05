import React, { Component } from 'react'
import axios from 'axios'
import Loader from "react-loader-spinner"

const style = 
	{
	 position: "fixed",
	 top: "50%", 
	 left: "50%",
	 transform: "translate(-50%, -50%)"
    };
    
export default class Home extends Component {
    constructor(props) {

        super(props);

        this.state = {
            isLoading: false,
            todos: [],
            open: false,
            id: null,
            todo: null
        }

        this.onChange = this.onChange.bind(this);
        this.onEditTodo = this.onEditTodo.bind(this)
        this.onDeleteTodo = this.onDeleteTodo.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount() {
        axios.get('/todoApp/')
            .then(res => {
                this.setState({
                    todos: res.data,
                    isLoading: true
                })
            })
    }

    onDeleteTodo(e, id) {
        e.preventDefault();

        axios.delete(`/todoApp/delete/${id}`)
            .then(res => {
                this.setState({
                    todos: this.state.todos.filter(data => data._id !== id)
                })
            })
    }

    onChange(e) {
        e.preventDefault();

        const { value } = e.target;
        this.setState({ todo: value});
    }

    onEditTodo(e, data) {
        e.preventDefault();

        this.setState({ open: true, todo: data.todo, id: data._id })
    }

    onSubmit(e) {
        e.preventDefault();

        let data = {
            todo: this.state.todo
        }

        axios.patch(`/todoApp/update/${this.state.id}`, data)
            .then(res => {
                if (res.data === 'Update Added!') {
                    this.setState({ open: false });
                    window.location = '/'
                }
            })

    }

    render() {
        return (
            <>
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Todo</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    {
                        this.state.isLoading ? (
                            <tbody>
                            {
                                this.state.todos.map((data, i) =>
                                    <tr>
                                        <th scope="row">{i}</th>
                                        <td>{data.todo}</td>
                                        <td style={{ cursor: 'pointer' }}>
                                            <button type="button" onClick={(e) => this.onEditTodo(e, data)} class="btn btn-primary" data-toggle="modal" data-target="#exampleModal"><i class="fas fa-edit"></i></button>&nbsp;&nbsp;&nbsp;
                                        <button class="btn btn-danger" onClick={(e) => this.onDeleteTodo(e, data._id)}><i class="fas fa-trash"></i></button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                        ) : 
                        (
                            <span style={style}>
                            <Loader
                           type="ThreeDots"
                           color="#00BFFF"
                           height={100}
                           width={100}
                           timeout={3000} //3 secs
                            />
                           </span>
                        )
                    }
                </table>
                {
                    this.state.todo &&
                    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Update Todo</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form onSubmit={this.onSubmit}>
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">Todo</label>
                                        <input type="text" value={this.state.todo} name="todo" class="form-control" onChange={(e) => this.onChange(e)} placeholder="Enter task here" />
                                    </div>
                                    <button type="submit" value="Submit" className="btn btn-primary" class="btn btn-primary">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                }
            </>
        )
    }
}