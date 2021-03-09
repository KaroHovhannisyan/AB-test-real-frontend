import React, {useEffect, useState} from "react";

import Table from "../components/Table";
import Calc from "../components/Calc";
import "./AbTestContainer.css";
import {useDispatch} from "react-redux";
import {getUsers} from "../redux/actions";

const AbTestContainer = () => {
    const [table, setTable] = useState(true);
    const [calc, setCalc] = useState(false);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    return (
        <div className="container p-3 mt-2 mb-4 bg-light">
            <div className="projectTitle">AB Test Real</div>
            <div>
                <button
                    type="button"
                    className={ `tabBtn ${table && "active"}`}
                    onClick={() => {
                        setTable(true);
                        setCalc(false);
                    }}
                >
                    <span>Table</span>
                </button>
                <button
                    type="button"
                    className={ `tabBtn ${calc && "active"}`}
                    onClick={() => {
                        setTable(false);
                        setCalc(true);
                    }}
                >
                    <span>Calculate</span>
                </button>
            </div>
            <div>
                <div>{table && <Table/>}</div>
                <div>{calc && <Calc/>}</div>
            </div>
        </div>
    );
};

export default AbTestContainer;
