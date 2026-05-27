import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDate } from '../../redux/dateSlice';
import styled, { createGlobalStyle } from 'styled-components';

const { RangePicker } = DatePicker;

// Default date range: January 1 - February 20, 2026 (matching seeded data)
const defaultDates = [
    dayjs('2026-01-01'),
    dayjs('2026-02-20')
];

const Datepicker = () => {
    const dispatch = useDispatch();
    // Get dates from Redux store to persist across navigation
    const reduxDates = useSelector((state) => state.datePicker.dates);
    
    // Initialize local state from Redux (persisted) or defaults
    const getInitialDates = () => {
        if (reduxDates && reduxDates.length === 2 && reduxDates[0] && reduxDates[1]) {
            return [dayjs(reduxDates[0]), dayjs(reduxDates[1])];
        }
        return defaultDates;
    };
    
    const [date, setDateState] = useState(getInitialDates);

    // Only dispatch default dates on first mount if Redux state is empty
    useEffect(() => {
        if (!reduxDates || reduxDates.length !== 2 || !reduxDates[0]) {
            const formattedDates = defaultDates.map(item => item.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'));
            dispatch(setDate({ dates: formattedDates }));
        }
    }, []); // Empty dependency - only run once on mount

    // Sync local state when Redux state changes (from other components)
    useEffect(() => {
        if (reduxDates && reduxDates.length === 2 && reduxDates[0] && reduxDates[1]) {
            const newDates = [dayjs(reduxDates[0]), dayjs(reduxDates[1])];
            // Only update if dates are different to avoid infinite loops
            if (!date[0].isSame(newDates[0], 'day') || !date[1].isSame(newDates[1], 'day')) {
                setDateState(newDates);
            }
        }
    }, [reduxDates]);

    const handleChange = (values) => {
        if (values && values.length === 2) {
            // Ensure we're working with dayjs objects and set proper time boundaries
            const startDate = dayjs(values[0]).startOf('day');
            const endDate = dayjs(values[1]).endOf('day');
            const formattedDates = [
                startDate.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
                endDate.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
            ];
            setDateState([startDate, endDate]);
            dispatch(setDate({ dates: formattedDates }));
        } else {
            setDateState(defaultDates);
            const formattedDates = defaultDates.map(item => item.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'));
            dispatch(setDate({ dates: formattedDates }));
        }
    };

    const PickerWrapper = styled.div`
        .custom-range-picker {
            display: inline-flex !important;
            align-items: center !important;
            width: auto !important;
            max-width: 360px !important;
            background: transparent;
            overflow: visible !important;
        }

        /* Force horizontal layout and prevent wrapping */
        .custom-range-picker .ant-picker-range {
            display: flex !important;
            flex-direction: row !important;
            align-items: center !important;
            gap: 6px !important;
            white-space: nowrap !important;
        }

        .custom-range-picker .ant-picker-input {
            display: inline-flex !important;
            align-items: center !important;
            padding: 4px 6px !important;
        }

        .custom-range-picker .ant-picker-input > input {
            min-width: 70px !important;
            max-width: 200px !important;
            overflow: visible !important;
            text-overflow: clip !important;
            white-space: nowrap !important;
            font-size: 14px !important;
        }

        .custom-range-picker .ant-picker-range-separator {
            margin: 0 8px !important;
            display: inline-block !important;
        }

        @media (max-width: 480px) {
            .custom-range-picker {
                /* allow enough room on small phones */
                max-width: 320px !important;
                width: calc(100vw - 64px) !important;
            }
            .custom-range-picker .ant-picker-input > input {
                min-width: 80px !important;
                max-width: 140px !important;
                font-size: 13px !important;
            }
            .custom-range-picker .ant-picker-range-separator {
                margin: 0 6px !important;
            }

            /* For small screens, allow panels to be scrolled horizontally so both months stay accessible */
            .custom-range-dropdown .ant-picker-panels {
                display: flex !important;
                flex-direction: row !important;
                gap: 8px !important;
                overflow-x: auto !important;
                -webkit-overflow-scrolling: touch !important;
                padding-bottom: 6px !important;
            }

            .custom-range-dropdown .ant-picker-panel {
                flex: 0 0 auto !important;
                min-width: 300px !important;
                max-width: 420px !important;
            }
            /* Ensure the dropdown container itself fits within viewport */
            .custom-range-dropdown {
                left: 8px !important;
                right: 8px !important;
                width: calc(100vw - 16px) !important;
                max-width: calc(100vw - 16px) !important;
                box-sizing: border-box !important;
            }
            /* Stack internal range elements vertically as well */
            .custom-range-dropdown .ant-picker-range {
                flex-direction: column !important;
                align-items: stretch !important;
            }
        }

    /* Extra-tight mobile rules for very small screens */
    @media (max-width: 360px) {
        .custom-range-picker {
            max-width: 320px !important;
            width: calc(100vw - 32px) !important;
        }

        .custom-range-dropdown {
            left: 8px !important;
            right: 8px !important;
            width: calc(100vw - 16px) !important;
            max-width: calc(100vw - 16px) !important;
            position: fixed !important;
            top: 72px !important; /* place under header */
            box-sizing: border-box !important;
        }

        .custom-range-dropdown .ant-picker-panels {
            display: flex !important;
            flex-direction: column !important;
        }

        .custom-range-dropdown .ant-picker-panel {
            width: 100% !important;
            max-width: 100% !important;
        }

        .custom-range-dropdown .ant-picker-range {
            flex-direction: column !important;
            gap: 4px !important;
        }
    }
    `;

    const GlobalStyles = createGlobalStyle`
        /* Styles for the popup which is appended to document.body */
        .custom-range-dropdown {
            box-shadow: 0 8px 20px rgba(0,0,0,0.12);
            border-radius: 8px;
            overflow: visible !important;
        }

        /* Panels container: allow horizontal scrolling and prevent wrapping */
        .custom-range-dropdown .ant-picker-panels,
        .ant-picker-dropdown.custom-range-dropdown .ant-picker-panels {
            display: flex !important;
            flex-direction: row !important;
            gap: 8px !important;
            overflow-x: auto !important;
            -webkit-overflow-scrolling: touch !important;
            padding: 8px !important;
            white-space: nowrap !important;
        }

        /* Individual month panels - keep them inline and slightly narrower to fit small screens */
        .custom-range-dropdown .ant-picker-panel,
        .ant-picker-dropdown.custom-range-dropdown .ant-picker-panel {
            flex: 0 0 auto !important;
            min-width: 260px !important;
            max-width: 420px !important;
        }

        /* make horizontal scrollbar visible/usable */
        .custom-range-dropdown .ant-picker-panels::-webkit-scrollbar {
            height: 8px;
        }
        .custom-range-dropdown .ant-picker-panels::-webkit-scrollbar-thumb {
            background: rgba(0,0,0,0.12);
            border-radius: 4px;
        }
        .custom-range-dropdown .ant-picker-panels { -ms-overflow-style: -ms-autohiding-scrollbar; }

        /* tight mobile rules */
        @media (max-width: 360px) {
            .custom-range-dropdown {
                left: 8px !important;
                right: 8px !important;
                width: calc(100vw - 16px) !important;
                max-width: calc(100vw - 16px) !important;
                position: fixed !important;
                top: 72px !important;
                box-sizing: border-box !important;
            }
            .custom-range-dropdown .ant-picker-panels {
                gap: 6px !important;
            }
            .custom-range-dropdown .ant-picker-panel {
                min-width: 280px !important;
            }
        }

        /* For slightly larger small devices, stack months vertically and center popup */
        @media (max-width: 420px) {
            .custom-range-dropdown {
                left: 50% !important;
                transform: translateX(-50%) !important;
                width: calc(100vw - 32px) !important;
                max-width: calc(100vw - 32px) !important;
                position: fixed !important;
                top: 72px !important;
                box-sizing: border-box !important;
            }
            .custom-range-dropdown .ant-picker-panels,
            .ant-picker-dropdown.custom-range-dropdown .ant-picker-panels {
                display: flex !important;
                flex-direction: column !important;
                gap: 6px !important;
                overflow-x: visible !important;
                overflow-y: auto !important;
                max-height: calc(100vh - 160px) !important;
            }
            .custom-range-dropdown .ant-picker-panel,
            .ant-picker-dropdown.custom-range-dropdown .ant-picker-panel {
                width: 100% !important;
                min-width: auto !important;
                max-width: 100% !important;
            }
        }
    `;

    return (
        <PickerWrapper>
            <GlobalStyles />
            <RangePicker 
                onChange={handleChange}
                value={date}
                format="YYYY-MM-DD"
                getPopupContainer={() => document.body}
                placement="bottomRight"
                dropdownClassName="custom-range-dropdown"
                    popupStyle={{ maxWidth: 'calc(100vw - 16px)' }}
                style={{
                    backgroundColor: 'white',
                    border: '2px solid #66bb6a',
                    borderRadius: '8px',
                    minWidth: 140,
                    maxWidth: 360,
                    width: '100%'
                }}
                className="custom-range-picker"
            />
        </PickerWrapper>
    );
};

export default Datepicker;
