import React, {useCallback, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addUser} from "../../redux/actions";
import 'bootstrap/dist/css/bootstrap.css';
import moment from 'moment'

import {newUserSelector, userSelector} from "../../redux/selectors";
import {setDateAdapter} from "../../../../constants/helpers";


const AddNewUser = () => {
    const [dateRegistered, setDateRegistered] = useState("");
    const [lastActivity, setLastActivity] = useState("");
    const usersList = useSelector(userSelector);
    const newList = useSelector(newUserSelector);
    const fullList = usersList.concat(newList);
    const dispatch = useDispatch();

    const addNewUser = useCallback(() => {
        const index = fullList[fullList.length-1]?.id || 0;
        const req = {
            id: index+1,
            dateRegistered: setDateAdapter(dateRegistered),
            lastActivity: setDateAdapter(lastActivity),
        };
        dispatch(addUser(req));
        setDateRegistered("");
        setLastActivity("");
    }, [dispatch, fullList, setDateRegistered, setLastActivity, dateRegistered, lastActivity]);


    return (
        <div className="d-flex w-50 p-2 pt-5">
            <input type="datetime-local"
                   defaultValue={dateRegistered}
                   value={dateRegistered}
                   max={lastActivity}
                   className="form-control ml-2"
                   onChange={({target}) => setDateRegistered(target.value)}
            />
            <input type="datetime-local"
                   defaultValue={lastActivity}
                   value={lastActivity}
                   min={dateRegistered}
                   className="form-control ml-2"
                   onChange={({target}) => setLastActivity(target.value)}
            />
            <button className="btn btn-primary ml-2"
                    disabled={!(dateRegistered && lastActivity) ||
                        moment(dateRegistered).diff(moment(lastActivity), 'days') > 0
                    }
                    onClick={addNewUser}
            >
                ADD
            </button>
        </div>
    );
};

export default React.memo(AddNewUser);
