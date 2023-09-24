import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchUserById, updateUser} from "../store/reducer/userSlice";
import styles from "./Profile.module.css";

const Profile = () => {
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user ? user.user_id : null;
    const userData = useSelector(state => state.users.selectedUser);
    const isLoading = useSelector(state => state.users.status === 'loading');

    const [showModal, setShowModal] = useState(false);
    const [editedData, setEditedData] = useState({});

    useEffect(() => {
        if (userId) {
            dispatch(fetchUserById(userId));
        }
    }, [userId, dispatch]);

    const handleEdit = () => {
        setEditedData(userData);
        setShowModal(true);
    }

    const handleSave = async () => {
        try {
            await dispatch(updateUser({id: userId, ...editedData}));
            setShowModal(false);
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
                <table className={styles.table}>
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
                            <button className={styles.btnPrimary} onClick={handleEdit}>Edit</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            )}
            {showModal && (
                <div className={styles.modal}>
                    <div className={styles.modalDialog}>
                        <div className={styles.modalContent}>
                            <div className={styles.modalHeader}>
                                <h5 className={styles.modalTitle}>Edit Profile</h5>
                                <button type="button" className={styles.btnClose} onClick={handleCancel}></button>
                            </div>
                            <div className={styles.modalBody}>
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="username" className={styles.formLabel}>Username:</label>
                                        {/*username, email, address, phone_number*/}
                                        <input type={"text"} className={styles.formControl} id={"username"}
                                               value={editedData.username || ''}
                                               onChange={(e) => setEditedData({...editedData, username: e.target.value})}
                                        />
                                        <label htmlFor="email" className={styles.formLabel}>Email:</label>
                                        <input type={"text"} className={styles.formControl} id={"email"}
                                               value={editedData.email || ''}
                                               onChange={(e) => setEditedData({...editedData, email: e.target.value})}
                                        />
                                        <label htmlFor="address" className={styles.formLabel}>Address:</label>
                                        <input type={"text"} className={styles.formControl} id={"address"}
                                               value={editedData.address || ''}
                                               onChange={(e) => setEditedData({...editedData, address: e.target.value})}
                                        />
                                        <label htmlFor="phone_number" className={styles.formLabel}>Phone Number:</label>
                                        <input type={"text"} className={styles.formControl} id={"phone_number"}
                                               value={editedData.phone_number || ''}
                                               onChange={(e) => setEditedData({...editedData, phone_number: e.target.value})}
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className={styles.modalFooter}>
                                <button type="button" className={styles.btnSecondary} onClick={handleCancel}>Cancel</button>
                                <button type="button" className={styles.btnPrimary} onClick={handleSave}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
