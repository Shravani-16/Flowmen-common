import React, { useEffect, useState } from "react";
import { Box, InputBase, Typography, styled, alpha } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { getMembers } from "../api/membersdata";
import { DataGrid } from "@mui/x-data-grid";

const Component = styled(Box)`
  border: 2px solid #d4d4d4;
  border-radius: 7px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  padding: 16px;
  background-color: #fff;
`;

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const MemCount = styled(Typography)`
  background-color: #e9efff;
  color: #5881fe;
  padding: 2px 8px;
  font-size: 13px;
  border-radius: 10px;
`;

function Members() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMembers();
        // console.log(response.members);
        const formattedMembers = response.members.map((member) => ({
          ...member,
          createdAt: new Date(member.createdAt), // Convert createdAt to Date object
          updatedAt: new Date(member.updatedAt), // Convert updatedAt to Date object
        }));
        setMembers(formattedMembers);
      } catch (error) {
        console.error("Error fetching members data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns = [
    { field: "_id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "role", headerName: "Role", width: 150 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "workingUnder", headerName: "Working Under", width: 200 },
    {
      field: "createdAt",
      headerName: "Created On",
      width: 180,
      type: "dateTime",
    },
  ];
  // console.log(columns)

  return (
    <Component>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "12px 15px",
          gap: 2,
        }}
      >
        <Typography variant="h6">Team Members</Typography>
        <MemCount>
          {members.length} {members.length > 1 ? "members" : "member"}
        </MemCount>
        <Box
          sx={{
            marginLeft: "auto",
            border: "2px solid #d4d4d4",
            height: "35px",
            borderRadius: "7px",
          }}
        >
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </Box>
      </Box>
      <Box>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          <DataGrid
            rows={members}
            columns={columns}
            getRowId={(row) => row._id}
            pageSizeOptions={[5, 10]}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            checkboxSelection
            autoHeight
          />
        )}
      </Box>
    </Component>
  );
}

export default Members;
