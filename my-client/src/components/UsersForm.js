import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchUsers, fetchUserById, updateUser, deleteUser} from "../store/reducer/userSlice";
import styles from "./UsersForm.module.css";
import { Table, Pagination, Input } from 'semantic-ui-react';


const UsersForm = () => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.users.users);
    const isLoading = useSelector(state => state.users.status === 'loading');
    const error = useSelector(state => state.users.error);
    const data = useSelector(state => state.users.users);
    const editingUserData = useSelector(state => state.users.selectedUser);

    const [formData, setFormData] = useState({});
    const [editingUserId, setEditingUserId] = useState(null);
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState(null);
    const [itemsPerPage, setItemsPerPage] = useState(10);


    // 根据当前的状态处理用户数据
    const getDisplayedUsers = () => {
        let filteredUsers = [...users];

        // 搜索
        if (searchTerm) {
            filteredUsers = filteredUsers.filter(user =>
                user.username.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // 排序 (此处为示例，您可以根据需要进行调整)
        if (sortColumn) {
            filteredUsers.sort((a, b) => {
                if (sortDirection === 'ascending') {
                    return a[sortColumn] > b[sortColumn] ? 1 : -1;
                } else {
                    return a[sortColumn] < b[sortColumn] ? 1 : -1;
                }
            });
        }

        // 分页
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredUsers.slice(startIndex, startIndex + itemsPerPage);
    };

    const displayedUsers = getDisplayedUsers();

    useEffect(() => {
        if (editingUserId) {
            dispatch(fetchUserById(editingUserId));
        }
    }, [editingUserId, dispatch]);

    useEffect(() => {
        if (editingUserData && editingUserData.data) { // Check for editingUserData.data here
            setFormData({
                username: editingUserData.data.username,
                email: editingUserData.data.email,
                address: editingUserData.data.address,
                phone_number: editingUserData.data.phone_number
            });
        }
    }, [editingUserData]);

    useEffect(() => {
        dispatch(fetchUsers());
    }, []);

    useEffect(() => {
        if (editingUserId) {
            dispatch(fetchUserById(editingUserId));
        }
    }, [editingUserId, dispatch]);

    const handleEdit = async () => {
        dispatch(updateUser({id: editingUserId, ...formData}));
        setEditingUserId(null);
        setFormData({}); // Reset formData after editing
    }

    const handleDelete = async () => {
        dispatch(deleteUser(deleteConfirm));
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
            <div className={styles.tableTopControls}>
                <div className={styles.leftControls}>
                    <span>Show&nbsp;</span>
                    <select
                        value={itemsPerPage}
                        onChange={e => setItemsPerPage(Number(e.target.value))}
                    >
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                    <span>&nbsp;entries</span>
                </div>
                <div className={styles.rightControls}>
                    <span>Search:&nbsp;</span>
                    <Input
                        icon="search"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {isLoading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
            {data && (
                <Table sortable celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell
                                sorted={sortColumn === 'user_id' ? sortDirection : null}
                                onClick={() => {
                                    if (sortColumn === 'user_id') {
                                        setSortDirection(sortDirection === 'ascending' ? 'descending' : 'ascending');
                                    } else {
                                        setSortColumn('user_id');
                                        setSortDirection('ascending');
                                    }
                                }}
                            >
                                User ID
                            </Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={sortColumn === 'username' ? sortDirection : null}
                                onClick={() => {
                                    if (sortColumn === 'username') {
                                        setSortDirection(sortDirection === 'ascending' ? 'descending' : 'ascending');
                                    } else {
                                        setSortColumn('username');
                                        setSortDirection('ascending');
                                    }
                                }}
                            >
                                Username
                            </Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={sortColumn === 'email' ? sortDirection : null}
                                onClick={() => {
                                    if (sortColumn === 'email') {
                                        setSortDirection(sortDirection === 'ascending' ? 'descending' : 'ascending');
                                    } else {
                                        setSortColumn('email');
                                        setSortDirection('ascending');
                                    }
                                }}
                            >
                                Email
                            </Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={sortColumn === 'phone_number' ? sortDirection : null}
                                onClick={() => {
                                    if (sortColumn === 'phone_number') {
                                        setSortDirection(sortDirection === 'ascending' ? 'descending' : 'ascending');
                                    } else {
                                        setSortColumn('phone_number');
                                        setSortDirection('ascending');
                                    }
                                }}
                            >
                                Phone Number
                            </Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={sortColumn === 'address' ? sortDirection : null}
                                onClick={() => {
                                    if (sortColumn === 'address') {
                                        setSortDirection(sortDirection === 'ascending' ? 'descending' : 'ascending');
                                    } else {
                                        setSortColumn('address');
                                        setSortDirection('ascending');
                                    }
                                }}
                            >
                                Address
                            </Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={sortColumn === 'create_date' ? sortDirection : null}
                                onClick={() => {
                                    if (sortColumn === 'create_date') {
                                        setSortDirection(sortDirection === 'ascending' ? 'descending' : 'ascending');
                                    } else {
                                        setSortColumn('create_date');
                                        setSortDirection('ascending');
                                    }
                                }}
                            >
                                Created Date
                            </Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={sortColumn === 'last_login_date' ? sortDirection : null}
                                onClick={() => {
                                    if (sortColumn === 'last_login_date') {
                                        setSortDirection(sortDirection === 'ascending' ? 'descending' : 'ascending');
                                    } else {
                                        setSortColumn('last_login_date');
                                        setSortDirection('ascending');
                                    }
                                }}
                            >
                                Last-login Date
                            </Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={sortColumn === 'is_admin' ? sortDirection : null}
                                onClick={() => {
                                    if (sortColumn === 'is_admin') {
                                        setSortDirection(sortDirection === 'ascending' ? 'descending' : 'ascending');
                                    } else {
                                        setSortColumn('is_admin');
                                        setSortDirection('ascending');
                                    }
                                }}
                            >
                                Admin
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                Actions
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {displayedUsers.map((user, index) => (
                            <Table.Row key={index}>
                                <Table.Cell>{user.user_id}</Table.Cell>
                                <Table.Cell>{user.username}</Table.Cell>
                                <Table.Cell>{user.email}</Table.Cell>
                                <Table.Cell>{user.phone_number}</Table.Cell>
                                <Table.Cell>{user.address}</Table.Cell>
                                <Table.Cell>{dateInPacificTime(user.create_date)}</Table.Cell>
                                <Table.Cell>{dateInPacificTime(user.last_login_date)}</Table.Cell>
                                <Table.Cell>{user.is_admin ? 'Yes' : 'No'}</Table.Cell>
                                <Table.Cell>
                                    <div className={styles.dFlex}>
                                        <button
                                            className={styles.btnPrimary}
                                            onClick={() => setEditingUserId(user.user_id)}>Edit
                                        </button>
                                        <button className={styles.btnDanger}
                                                onClick={() => setDeleteConfirm(user.user_id)}>Delete
                                        </button>
                                    </div>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            )}
            <div className={styles.tableBottomControls}>
                <div className={styles.leftControls}>
                <span>
                    Showing {(currentPage - 1) * itemsPerPage + 1} to&nbsp;
                    {Math.min(currentPage * itemsPerPage, users.length)} of {users.length} entries
                </span>
                </div>
                <div className={styles.rightControls}>
                    <Pagination
                        totalPages={Math.ceil(users.length / itemsPerPage)}
                        activePage={currentPage}
                        onPageChange={(e, { activePage }) => setCurrentPage(activePage)}
                    />
                </div>
            </div>

            {/* delete confirmation modal */}
            {deleteConfirm !== null && (
                <div className={styles.modal}>
                    <div className={styles.modalDialog}>
                        <div className={styles.modalContent}>
                            <div className={styles.modalHeader}>
                                <h5 className={styles.modalTitle}>Confirm Delete</h5>
                                <button type="button" className={styles.btnClose}
                                        onClick={() => setDeleteConfirm(null)}/>
                            </div>
                            <div className={styles.modalBody}>
                                <p>Are you sure you want to delete this user?</p>
                            </div>
                            <div className={styles.modalFooter}>
                                <button type="button" className={styles.btnSecondary}
                                        onClick={() => setDeleteConfirm(null)}>Cancel
                                </button>
                                <button type="button" className={styles.btnDanger} onClick={handleDelete}>Confirm
                                </button>
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
                                <button type="button" className={styles.btnClose} onClick={() => {
                                    setEditingUserId(null);
                                    setFormData({});
                                }}/>
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
                                                   onChange={(e) => setFormData({
                                                       ...formData,
                                                       username: e.target.value
                                                   })}
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
                                            <label htmlFor="phone_number" className={styles.formLabel}>Phone
                                                Number:</label>
                                            <input type={"text"} className={styles.formControl} id={"phone_number"}
                                                   value={formData.phone_number || ''}
                                                   onChange={(e) => setFormData({
                                                       ...formData,
                                                       phone_number: e.target.value
                                                   })}
                                            />
                                        </div>
                                    </form>
                                )}
                            </div>
                            <div className={styles.modalFooter}>
                                <button type="button" className={styles.btnSecondary}
                                        onClick={() => setEditingUserId(null)}>Close
                                </button>
                                <button type="button" className={styles.btnPrimary} onClick={handleEdit}>Save changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UsersForm;
