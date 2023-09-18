import React, {useEffect, useState} from 'react';
import {useGetUserByIdQuery, useGetUsersQuery, useUpdateUserMutation, useDeleteUserMutation} from "../store/api/userApi";
import styles from "./UsersForm.module.css";

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

    useEffect(() => {
        if (error) {
            console.error("API Error:", error);
        }
    }, [error]);


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
        <div className={styles.container}>
            {isLoading && <div>Loading...</div>}
            {error && <div>Error loading users: {error.message}</div>}
            {updateError && <div>Error updating user: {updateError.message}</div>}
            {deleteError && <div>Error deleting user: {deleteError.message}</div>}
            {data && (
                <table className={styles.table}>
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
                                <div className={styles.dFlex}>
                                    <button
                                        className={styles.btnPrimary}
                                        style={{marginRight: '8px'}}
                                        onClick={() => setEditingUserId(user.user_id)}>Edit</button>
                                    <button className={styles.btnDanger}
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
                <div className={styles.modal}>
                    <div className={styles.modalDialog}>
                        <div className={styles.modalContent}>
                            <div className={styles.modalHeader}>
                                <h5 className={styles.modalTitle}>Confirm Delete</h5>
                                <button type="button" className={styles.btnClose} onClick={() => setDeleteConfirm(null)}></button>
                            </div>
                            <div className={styles.modalBody}>
                                <p>Are you sure you want to delete this user?</p>
                            </div>
                            <div className={styles.modalFooter}>
                                <button type="button" className={styles.btnSecondary} onClick={() => setDeleteConfirm(null)}>Cancel</button>
                                <button type="button" className={styles.btnDanger} onClick={handleDelete}>Confirm</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {editingUserId !== null && (
                <div className={styles.modal}>
                    <div className={styles.modalDialog}>
                        <div className={styles.modalContent}>
                            <div className={styles.modalHeader}>
                                <h5 className={styles.modalTitle}>Edit User</h5>
                                <button type="button" className={styles.btnClose} onClick={() => setEditingUserId(null)}></button>
                            </div>
                            <div className={styles.modalBody}>
                                {editingUserData && (
                                    <form>
                                        {/* Your form fields here. Use editingUserData to populate the fields. */}
                                        <div className="mb-3">
                                            <label htmlFor="username" className={styles.formLabel}>Username:</label>
                                            {/*username, email, address, phone_number*/}
                                            <input type={"text"} className={styles.formControl} id={"username"}
                                                   value={formData.username || ''}
                                                   onChange={(e) => setFormData({...formData, username: e.target.value})}
                                            />
                                            <label htmlFor="email" className={styles.formLabel}>Email:</label>
                                            <input type={"text"} className={styles.formControl} id={"email"}
                                                   value={formData.email || ''}
                                                   onChange={(e) => setFormData({...formData, email: e.target.value})}
                                            />
                                            <label htmlFor="address" className={styles.formLabel}>Address:</label>
                                            <input type={"text"} className={styles.formControl} id={"address"}
                                                   value={formData.address || ''}
                                                   onChange={(e) => setFormData({...formData, address: e.target.value})}
                                            />
                                            <label htmlFor="phone_number" className={styles.formLabel}>Phone Number:</label>
                                            <input type={"text"} className={styles.formControl} id={"phone_number"}
                                                   value={formData.phone_number || ''}
                                                   onChange={(e) => setFormData({...formData, phone_number: e.target.value})}
                                            />
                                        </div>
                                    </form>
                                )}
                            </div>
                            <div className={styles.modalFooter}>
                                <button type="button" className={styles.btnSecondary} onClick={() => setEditingUserId(null)}>Close</button>
                                <button type="button" className={styles.btnPrimary} onClick={handleEdit}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UsersForm;
