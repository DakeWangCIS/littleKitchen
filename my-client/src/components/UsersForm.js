import React, {useEffect, useState} from 'react';
import {useGetUserByIdQuery, useGetUsersQuery, useUpdateUserMutation, useDeleteUserMutation} from "../store/api/userApi";
import 'bootstrap/dist/css/bootstrap.min.css';

const UsersForm = () => {
    const [formData, setFormData] = useState({});
    const [editingUserId, setEditingUserId] = useState(null);
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const { data, error, isLoading, refetch } = useGetUsersQuery();
    const [updateUser, {error: updateError}] = useUpdateUserMutation();
    const {data: editingUserData} = useGetUserByIdQuery(editingUserId, {
        skip: editingUserId === null,
    });
    const [deleteUser, {error: deleteError}] = useDeleteUserMutation();

    useEffect(() => {
        refetch();
    }, []);

    useEffect(() => {
        if (editingUserData && editingUserData.data) {
            setFormData(editingUserData.data);
        }
    }, [editingUserData]);

    const handleEdit = async () => {
        const updatedUser = {};
        await updateUser({id: editingUserId, ...updatedUser});
        await refetch();
        setEditingUserId(null);
    }

    const handleDelete = async () => {
        await deleteUser(deleteConfirm);
        await refetch();
        setDeleteConfirm(null);
    }

    const pacificTimeOptions = {
        timeZone: 'America/Los_Angeles',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    };

    const dateInPacificTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', pacificTimeOptions);
    };

    return (
        <div className="container">
            {isLoading && <div>Loading...</div>}
            {error && <div>Error loading users: {error.message}</div>}
            {updateError && <div>Error updating user: {updateError.message}</div>}
            {deleteError && <div>Error deleting user: {deleteError.message}</div>}
            {data && (
                <table className="table">
                    <thead>
                    <tr>
                        <th style={{width: '100px'}}>User ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th style={{width: '160px'}}>Phone Number</th>
                        <th>Address</th>
                        <th>Created Date</th>
                        <th>Last-login Date</th>
                        <th style={{width: '50px'}}>Admin</th>
                        <th style={{paddingLeft: 40}}>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((user, index) => (
                        <tr key={index}>
                            <td>{user.user_id}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.phone_number}</td>
                            <td>{user.address}</td>
                            <td>{dateInPacificTime(user.create_date)}</td>
                            <td>{dateInPacificTime(user.last_login_date)}</td>
                            <td>{user.is_admin ? 'Yes' : 'No'}</td>
                            <td>
                                <div className="d-flex">
                                    <button
                                        className="btn btn-primary"
                                        style={{marginRight: '8px'}}
                                        onClick={() => setEditingUserId(user.user_id)}>Edit</button>
                                    <button className="btn btn-danger"
                                            onClick={() => setDeleteConfirm(user.user_id)}>Delete</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}

            {/* delete confirmation modal */}
            {deleteConfirm !== null && (
                <div className="modal show d-block">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirm Delete</h5>
                                <button type="button" className="btn-close" onClick={() => setDeleteConfirm(null)}></button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to delete this user?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setDeleteConfirm(null)}>Cancel</button>
                                <button type="button" className="btn btn-danger" onClick={handleDelete}>Confirm</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {editingUserId !== null && (
                <div className="modal show d-block">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit User</h5>
                                <button type="button" className="btn-close" onClick={() => setEditingUserId(null)}></button>
                            </div>
                            <div className="modal-body">
                                {editingUserData && (
                                    <form>
                                        {/* Your form fields here. Use editingUserData to populate the fields. */}
                                        <div className="mb-3">
                                            <label htmlFor="username" className="form-label">Username:</label>
                                            {/*username, email, address, phone_number*/}
                                            <input type={"text"} className={"form-control"} id={"username"}
                                                   value={formData.username || ''}
                                                   onChange={(e) => setFormData({...formData, username: e.target.value})}
                                            />
                                            <label htmlFor="email" className="form-label">Email:</label>
                                            <input type={"text"} className={"form-control"} id={"email"}
                                                   value={formData.email || ''}
                                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                            />
                                            <label htmlFor="address" className="form-label">Address:</label>
                                            <input type={"text"} className={"form-control"} id={"address"}
                                                   value={formData.address || ''}
                                                   onChange={(e) => setFormData({...formData, address: e.target.value})}
                                            />
                                            <label htmlFor="phone_number" className="form-label">Phone Number:</label>
                                            <input type={"text"} className={"form-control"} id={"phone_number"}
                                                   value={formData.phone_number || ''}
                                                   onChange={(e) => setFormData({...formData, phone_number: e.target.value})}
                                            />
                                        </div>
                                    </form>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setEditingUserId(null)}>Close</button>
                                <button type="button" className="btn btn-primary" onClick={handleEdit}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UsersForm;
