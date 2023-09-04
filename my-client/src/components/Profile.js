import React, {useState} from 'react';
import {useGetUserByIdQuery, useUpdateUserMutation} from "../store/api/userApi";
import 'bootstrap/dist/css/bootstrap.min.css';

const Profile = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user ? user.user_id : null;
    const {data: userData, isLoading, refetch} = useGetUserByIdQuery(userId);
    const [updateUser] = useUpdateUserMutation();

    const [showModal, setShowModal] = useState(false);
    const [editedData, setEditedData] = useState({});

    const handleEdit = async () => {
        setEditedData(userData.data);
        setShowModal(true);
    }

    const handleSave = async () => {
        try {
            const result = await updateUser({id: userId, ...editedData});
            if (result.data) {
                await refetch();
                setShowModal(false);
            }
        } catch (err) {
            console.error("Failed to update user: ", err);
        }
    };

    const handleCancel = () => {
        setShowModal(false);
    };

    return (
        <div>
            <h1>Profile</h1>
            {isLoading && <div>Loading...</div>}
            {userData && (
                <table className="table">
                    <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Address</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{userData.data.username}</td>
                        <td>{userData.data.email}</td>
                        <td>{userData.data.phone_number}</td>
                        <td>{userData.data.address}</td>
                        <td>
                            <button className="btn btn-primary" onClick={handleEdit}>Edit</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            )}
            {showModal && (
                <div className="modal show d-block">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Profile</h5>
                                <button type="button" className="btn-close" onClick={handleCancel}></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="username" className="form-label">Username:</label>
                                        {/*username, email, address, phone_number*/}
                                        <input type={"text"} className={"form-control"} id={"username"}
                                               value={editedData.username || ''}
                                               onChange={(e) => setEditedData({...editedData, username: e.target.value})}
                                        />
                                        <label htmlFor="email" className="form-label">Email:</label>
                                        <input type={"text"} className={"form-control"} id={"email"}
                                               value={editedData.email || ''}
                                               onChange={(e) => setEditedData({...editedData, email: e.target.value})}
                                        />
                                        <label htmlFor="address" className="form-label">Address:</label>
                                        <input type={"text"} className={"form-control"} id={"address"}
                                               value={editedData.address || ''}
                                               onChange={(e) => setEditedData({...editedData, address: e.target.value})}
                                        />
                                        <label htmlFor="phone_number" className="form-label">Phone Number:</label>
                                        <input type={"text"} className={"form-control"} id={"phone_number"}
                                               value={editedData.phone_number || ''}
                                               onChange={(e) => setEditedData({...editedData, phone_number: e.target.value})}
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
                                <button type="button" className="btn btn-primary" onClick={handleSave}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
