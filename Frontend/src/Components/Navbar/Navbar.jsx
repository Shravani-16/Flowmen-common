import { Typography, Box, Grid } from "@mui/material"; // Import components from MUI
import Datepicker from "../DateTimePicker/DatePicker";

const Navbar = ({ title = "Dashboard" }) => {
  return (
    <Grid
      columnSpacing={2}
      sx={{ display: "flex", float: "left", width: "100%" }}
    >
      <Grid item lg={7} sx={{ float: "left", display: "flex", alignItems: "center" }}>
        <Typography
          style={{
            color: "#1b5e20",
            fontWeight: 800,
            marginLeft: "2rem",
          }}
        >
          {title}
        </Typography>
      </Grid>

      <Grid
        item
        lg={5}
        sx={{
          marginLeft: "auto",
          boxShadow: "none",
          float: "right",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", marginTop: "3%" }}>
          <Box sx={{ color: "#2e7d32" }}>
            <Datepicker />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
export default Navbar;
