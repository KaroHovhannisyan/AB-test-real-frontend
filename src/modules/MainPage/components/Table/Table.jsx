import React, {useCallback} from "react";
import PropTypes from "prop-types";
import {newUserSelector, userSelector} from "../../redux/selectors";
import {useDispatch, useSelector} from "react-redux";
import AddNewUser from "../AddNewUser";
import {clearNewUsers, deleteFromDB, deleteUser, saveAllUsers, saveUsers} from "../../redux/actions";
import "./Table.css"
import UserItem from "../UserItem/UserItem";

const Table = () => {
    const usersList = useSelector(userSelector);
    const newUsersList = useSelector(newUserSelector);
    const dispatch = useDispatch();

    const deleteItem = useCallback((id) => {
        dispatch(deleteUser(id))
    }, [dispatch]);

    const onDeleteFromDB = useCallback((id) => {
        dispatch(deleteFromDB(id))
    }, [dispatch]);

    const saveItem = useCallback((start, update, id) => {
        dispatch(clearNewUsers(id))
        dispatch(saveUsers({start, update}))
    }, [dispatch]);

    const saveAll = useCallback(() => {
        dispatch(saveAllUsers(newUsersList))
    }, [dispatch, newUsersList]);

    const getSaveAllBtn = () => {
        if (newUsersList && newUsersList.length) {
            return (
                <button
                    className="btn btn-success m-2"
                    disabled={!newUsersList.length}
                    onClick={() => saveAll()}
                >
                    SAVE ALL
                </button>
            );
        }
    }

    return (
        <>
            <div>
                <div className="row tableTitle">
                    <div className="col-2 titleItem">UserID</div>
                    <div className="col-4 titleItem">Date Registration</div>
                    <div className="col-4 titleItem">Date Last Activity</div>
                </div>
                <div className="tableBody">
                {
                    usersList?.map((item, index) => {
                        return (
                            <UserItem
                                key={item?.id}
                                index={index}
                                item={item}
                                newUser={false}
                                onDeleteFromDB={() => onDeleteFromDB(item.id)}
                            />
                        );
                    })
                }
                {
                    newUsersList && newUsersList.length > 0 && newUsersList?.map((item, index) => {
                        return (
                            <UserItem
                                key={item?.id}
                                item={item}
                                newUser
                                index={index}
                                onDelete={() => deleteItem(item.id)}
                                onSave={() => saveItem(item.dateRegistered, item.lastActivity, item.id)}
                            />
                        );
                    })
                }
                </div>
                { getSaveAllBtn() }
            </div>
            <AddNewUser/>
        </>
    );
};
Table.defaultProps = {
    horizontal: false,
    id: null,
    children: undefined,
};

Table.propTypes = {
    children: PropTypes.node,
    horizontal: PropTypes.bool,
    id: PropTypes.string,
};

export default React.memo(Table);
