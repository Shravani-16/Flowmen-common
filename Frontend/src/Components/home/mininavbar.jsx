import React, { useEffect, useState } from "react";
import styled from "styled-components";
import getFilters from "../pages/api/getFilters";

const NavbarContainer = styled.nav`
  padding: 23px 0;
  margin-top: -11px;
  z-index: 1000;
  position: relative;
`;

const NavLinks = styled.ul`
  list-style-type: none;
  margin: 0px 0px -11px;
  padding: 0;
  display: flex;
  justify-content: center;
  font-size: 16px;
  font-weight: bold;
  gap: 20px;
`;

const NavItem = styled.li`
  position: relative;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    transition: background-color 0.3s ease;
  }

  &.active {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const Dropbtn = styled.a`
  color: #001f4d;
  text-align: center;
  padding: 14px 22px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-decoration: none;

  &:hover,
  &.active {
    background-color: #eecf4b;
  }
`;

const DropdownContent = styled.div`
  display: none;
  position: absolute;
  background: #eecf4b;
  min-width: 100%;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  opacity: 0;
  transform: translateY(-10px);
  transition: opacity 0.3s ease, transform 0.3s ease;

  ${NavItem}:hover &,
  ${NavItem}.active & {
    display: block;
    opacity: 1;
    transform: translateY(0);
  }
`;

const DropdownLink = styled.a`
  color: #001f4d;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  transition: background-color 0.3s ease;
  margin-bottom: 5px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  &.active {
    background-color: rgba(255, 255, 255, 0.2);
    font-weight: bold;
  }
`;

const navItems = [
  { id: "plantId", label: "Plant ID" },
  { id: "lineId", label: "Line ID" },
  { id: "machineId", label: "Machine ID" },
  { id: "mouldId", label: "Mould ID" },
  { id: "productId", label: "Product ID" },
];

const CustomNavbar = ({ onSelect, selected }) => {
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const fetchedFilters = await getFilters();
        setFilters(fetchedFilters);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFilters();
  }, []);

  return (
    <NavbarContainer>
      <NavLinks>
        {navItems.map((category, index) => (
          <NavItem
            key={index}
            className={`dropdown ${
              selected.category === category.id ? "active" : ""
            }`}
          >
            <Dropbtn
              href="#"
              className={selected.category === category.id ? "active" : ""}
            >
              {category.label}
              {selected.category === category.id && selected.item
                ? `: ${selected.item}`
                : ""}
            </Dropbtn>
            <DropdownContent>
              {filters.map((filter, idx) => (
                <DropdownLink
                  key={idx}
                  href="#"
                  onClick={() => onSelect(category.id, filter[category.id])}
                  className={
                    selected.item === filter[category.id] ? "active" : ""
                  }
                >
                  {filter[category.id]}
                </DropdownLink>
              ))}
            </DropdownContent>
          </NavItem>
        ))}
      </NavLinks>
    </NavbarContainer>
  );
};

export default CustomNavbar;
