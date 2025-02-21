import { useEffect, useRef, useState } from "react";

//components
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import InputField from "./InputField";

//Icons
import { IoEyeOutline } from "react-icons/io5";
import { PiEyeClosedBold } from "react-icons/pi";
import { BiSolidLock } from "react-icons/bi";
import { Box, styled } from "@mui/material";


//Styling Component
const TextBox = styled(Box)`
    display: flex;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    border-radius: 16px;
    align-items: center;
    margin: 34px 11px 5px 7px;
    padding: 0px 1px 0px 11px;
    outline: ${props => props.active ? '2px solid rgb(163 163 163)' : 'none'};
`

const PasswordInput = ({ value, onChange, indicator, placeholder, name, disabled, icon: Icon }) => {
    const [hidePass, setHidePass] = useState(true);
    const [activeBox, setActiveBox] = useState(null);
    const inputRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                setActiveBox(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    //Methods
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                setActiveBox(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    const togglePasswordVisibility = () => {
        setHidePass(!hidePass);
    };

    return (

        <Box>
            <OverlayTrigger
                placement="top"
                overlay={
                    indicator ?
                        <Tooltip variant="success" id="button-tooltip-2" style={{ backgroundColor: 'rgb(13 199 38)', alignContent: 'center' }}>{name === 'password' ? <p>Perfect password</p> : <p>password Matched</p>}</Tooltip>
                        :
                        <Tooltip style={{ color: 'black' }}>
                            {name === 'password' ? <p style={{ fontSize: '13px', marginTop: '2%', textAlign: 'start' }}>
                                At least 8 characters<br />
                                One lowercase letter, one uppercase letter, one digit, and one special character from [az], [AZ], [!@#$%^&*]<br />
                                Avoid common patterns and personal information</p>
                                :
                                <p>Please Enter password first</p>}

                        </Tooltip>
                }>
                <TextBox ref={inputRef} active={activeBox === 4} onClick={() => setActiveBox(4)}
                    sx={{ margin: '2% 0px 0px 0px', outlineColor: indicator ? 'rgb(13 199 38)' : 'red' }}>
                    <Icon style={{ fontSize: '16px', textAlign: 'center', marginRight: '9px' }} />
                    <input
                        disabled={disabled}
                        type={hidePass ? 'password' : 'text'}
                        placeholder={placeholder}
                        value={value}
                        name={name}
                        onChange={onChange}
                        style={{
                            border: 'none',
                            height: '40px',
                            width: '95%',
                            borderRadius: '16px',
                            outline: 'none',
                        }}
                    />

                    {
                        hidePass ?
                            <IoEyeOutline style={{ fontSize: '20px', marginRight: '2%' }} onClick={togglePasswordVisibility} />
                            :
                            <PiEyeClosedBold style={{ fontSize: '20px', marginRight: '2%' }} onClick={togglePasswordVisibility} />
                    }
                </TextBox>
            </OverlayTrigger>
        </Box>
    );
};

export default PasswordInput