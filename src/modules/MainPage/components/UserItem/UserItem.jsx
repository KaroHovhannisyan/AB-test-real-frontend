import React from "react";
import "./UserItem.css";
import { BsTrashFill,FaSave } from "react-icons/all";
import {dateAdapter} from "../../../../constants/helpers";


const UserItem = ({item, onDelete, onSave, newUser, onDeleteFromDB, index}) => {
    return (
        <div className="row itemRow" key={index}>
            <div className="col-2 itemCol align-items-center">{item?.id}</div>
            <div className="col-4 itemCol align-items-center">{dateAdapter(item?.dateRegistered)}</div>
            <div className="col-4 itemCol align-items-center">{dateAdapter(item?.lastActivity)}</div>
            {
                newUser ? <div>
                    <div className="row">
                        <div className="col-6">
                            <BsTrashFill className="trItem" onClick={onDelete} color="red" size="25px"/>
                        </div>
                        <div className="col-6">
                            <FaSave className="trItem" onClick={onSave} color="green" size="25px"/>
                        </div>
                    </div>
                </div>
                :
                <div className="row">
                    <div className="col-6">
                        <BsTrashFill className="trItem" color="red" onClick={onDeleteFromDB} size="25px"/>
                    </div>
                 </div>
            }
        </div>
    );
};

export default UserItem;
