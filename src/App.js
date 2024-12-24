
import React, { useState } from "react";
import { useForm } from "react-hook-form";

function App() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [users, setUsers] = useState([]);

    const onSubmit = (data) => {
        setUsers([...users, { id: Date.now(), ...data }]);
        reset();
    };

    const deleteUser = (id) => {
        setUsers(users.filter(user => user.id !== id));
    };

    const clearTable = () => {
        setUsers([]);
    };

    return (
        <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
            <h1>React Hook Form + Table</h1>

            {/* Форма для ввода */}
            <form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: "20px" }}>
                <div>
                    <label>Name:</label>
                    <input {...register("name", { required: "Name is required" })} />
                    {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
                </div>
                <div>
                    <label>Username:</label>
                    <input {...register("username", { required: "Username is required" })} />
                    {errors.username && <p style={{ color: "red" }}>{errors.username.message}</p>}
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        {...register("email", {
                            required: "Email is required",
                            pattern: { value: /^[^@]+@[^@]+\.[^@]+$/, message: "Invalid email" }
                        })}
                    />
                    {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
                </div>
                <div>
                    <label>Phone:</label>
                    <input {...register("phone", { required: "Phone is required" })} />
                    {errors.phone && <p style={{ color: "red" }}>{errors.phone.message}</p>}
                </div>
                <div>
                    <label>Website:</label>
                    <input {...register("website")} />
                </div>
                <div style={{ marginTop: "10px" }}>
                    <button type="submit">Create</button>
                    <button type="button" onClick={clearTable} style={{ marginLeft: "10px" }}>
                        Clear Table
                    </button>
                </div>
            </form>

            {/* Таблица */}
            {users.length === 0 ? (
                <p>Table is empty</p>
            ) : (
                <table border="1" style={{ width: "100%", textAlign: "left" }}>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Website</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.website}</td>
                            <td>
                                <button onClick={() => deleteUser(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default App;