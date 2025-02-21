import { Typography, Box, Button, Grid } from "@mui/material"; // Import components from MUI
import Datepicker from "../DateTimePicker/DatePicker";
import RefreshIcon from "@mui/icons-material/Refresh";

const Navbar = () => {
  return (
    <Grid
      columnSpacing={2}
      sx={{ display: "flex", float: "left", width: "100%" }}
    >
      <Grid item lg={7} sx={{ float: "left" }}>
        <Typography
          style={{
            color: "hsl(215.84deg 100% 15.1%)",
            fontWeight: 800,
            marginTop: "15%",
            marginLeft: "2rem",
          }}
        >
          Dashboard
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
        <Box sx={{ display: "flex", alignItems: "center", marginTop: "3%" }}>
          <Box sx={{ color: "hsl(215.84deg 100% 15.1%)", marginRight: "2%" }}>
            <Datepicker />
          </Box>
          <Button sx={{ color: "hsl(215.84deg 100% 15.1%)", fontWeight: 550 }}>
            <RefreshIcon />
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};
export default Navbar;
