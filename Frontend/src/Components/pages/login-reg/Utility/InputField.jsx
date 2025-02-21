import { Box, styled } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';

//Styling Component
const TextBox = styled(Box)`
    display: flex;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    border-radius: 16px;
    align-items: center;
    padding: 0px 1px 0px 11px;
    outline: ${props => props.active ? '2px solid rgb(163 163 163)' : 'none'};
`

const InputField = ({ icon: Icon, type,name, value, onChange, placeholder, style }) => {
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

  return (
    <TextBox ref={inputRef} active={activeBox === 1} onClick={() => setActiveBox(1)} style={style}>
      <Icon style={{ fontSize: '16px', textAlign: 'center', marginRight: '9px' }} />
      <input
        type={type}
        required
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        style={{
          border: 'none',
          height: '41px',
          width: '95%',
          borderRadius: '16px',
          outline: 'none'
        }}
      />
      
    </TextBox>
  );
};

export default InputField;
