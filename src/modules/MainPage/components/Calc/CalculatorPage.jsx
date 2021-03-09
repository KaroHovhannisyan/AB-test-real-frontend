import React, {useState} from "react";
import "./CalculatorPage.css";
import {useDispatch, useSelector} from "react-redux";
import {getCalculate} from "../../redux/actions";
import {calcResultSelector, dateRangeSelector} from "../../redux/selectors";

const CalculatorPage = () => {

    const [inputValue, setInputValue] = useState("");
    const dispatch = useDispatch();
    const calcResult = useSelector(calcResultSelector);
    const dateRange = useSelector(dateRangeSelector);

    const calculate = React.useCallback(() => {
        setInputValue("");
        dispatch(getCalculate(inputValue))
    }, [inputValue]);

    return (
        <div className="calculateBody">
            <input type="number"
                   className="input-group"
                   value={inputValue}
                   placeholder="Date range"
                   onChange={({target}) => setInputValue(target.value)}
                   min="0"
            />
            <div className="d-flex">
                <button className="btn btn-success mt-2"
                        disabled={!inputValue}
                        onClick={() => calculate()}
                >
                    Calculate
                </button>

                <div className="font-weight-bold pt-1 pl-2 d-flex align-items-center">
                    {calcResult !== "" && `for last ${dateRange} days ${calcResult}%`}
                </div>
            </div>
        </div>
  );
};

export default React.memo(CalculatorPage);
