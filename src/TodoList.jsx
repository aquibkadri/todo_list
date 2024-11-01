import { useEffect, useState } from "react"
import { Pagination } from "./Pagination";

export const TodoList = () => {

    const [todos, setTodos] = useState([]);
    const [total, setTotal] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(1)
    const limit = 10

    const fetchTodos = async () => {
        const API_URL = `https://dummyjson.com/todos?limit=${limit}&skip=${page*limit - limit}`
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            setTodos(data.todos)
            setTotal(data.total)
            setTotalPages(Math.floor(data.total / limit))
            setPage(page)
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        fetchTodos(page)
    }, [page])

    const onSetPage = (pageNumber) => setPage(pageNumber)
    return (<>
        <div className="container">
            {todos.length > 0 && 
            (
            <center>
                <table>
                    <thead>
                        <tr>
                            <th>Task ID</th>
                            <th>Todo</th>
                            <th>Completed</th>
                            <th>User ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todos.map(todo => 
                            (<tr key={todo.id}>
                                <td>{todo.id}</td>
                                <td>{todo.todo}</td>
                                <td>{todo.completed ? "Yes" : "No"}</td>
                                <td>{todo.userId}</td>
                            </tr>)
                        )}
                    </tbody>
                </table>
            </center>
            )}
        {total > limit && <Pagination totalPages={totalPages} page = {page} onSetPage = {onSetPage} />}
        </div>
    </>)
}