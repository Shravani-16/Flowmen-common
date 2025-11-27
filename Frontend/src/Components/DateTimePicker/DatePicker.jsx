import { DatePicker } from 'antd';
import moment from 'moment';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setDate } from '../../redux/dateSlice';

const { RangePicker } = DatePicker;

const Datepicker = () => {
    const [date, setDateState] = useState([]);
    const dispatch = useDispatch();

    const handleChange = (values) => {
        if (values && values.length === 2) {
            const formattedDates = values.map(item => item.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'));
            setDateState(formattedDates);
            dispatch(setDate({ dates: formattedDates }));
        } else {
            setDateState([]);
            dispatch(setDate({ dates: [] }));
        }
    };

    return (
        <div>
            <RangePicker 
                onChange={handleChange}
                style={{
                    backgroundColor: 'white',
                    border: '2px solid #66bb6a',
                    borderRadius: '8px',
                }}
                className="custom-range-picker"
            />
        </div>
    );
};

export default Datepicker;
