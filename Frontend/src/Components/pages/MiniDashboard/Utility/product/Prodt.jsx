import { Box, Grid, Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

// Subcomponent
const Prodt = ({ title, volume, isVisi, para }) => {
  return (
    <Box sx={{ paddingBottom: "4%" }}>
      {/* Title */}
      <Typography
        sx={{
          fontWeight: "700",
          fontSize: "16px",
          float: "left",
          color: "#385076",
        }}
      >
        {title}
      </Typography>
      {/* Parameters */}
      <Grid container sx={{ display: "flex", justifyContent: "space-between" }}>
        <Grid item md={12} lg={12}>
          <Typography
            sx={{
              color: "hsl(0deg 0% 100%)",
              fontWeight: "500",
              fontSize: "35px",
              paddingLeft: "4px",
            }}
          >
            {volume}
          </Typography>
        </Grid>
        {/* <Grid
          item
          md={12}
          lg={12}
          sx={{
            width: "30%",
            display: "flex",
            backgroundColor: "#ffff",
            marginTop: "20px",
            height: "24px",
            // padding: "0px 7px 4px 10px",
            borderRadius: "5px",
            // alignContent: "flex-end",
            float: "right",
          }}
        >
          <Box sx={{ margin: "2% 0% 1% 34%", display: "flex" }}>
            <Box sx={{ borderRight: "1px solid black" }}>
              <Typography
                sx={{
                  fontSize: "9px",
                  padding: "0px 4px 0px 4px",
                  fontWeight: 700,
                }}
              >
                Ton
              </Typography>
            </Box>
            <Box sx={{ borderRight: "1px solid black" }}>
              <Typography
                sx={{
                  fontSize: "9px",
                  padding: "0px 3px 0px 10px",
                  fontWeight: 700,
                }}
              >
                Kg
              </Typography>
            </Box>
            <Box>
              <Typography
                sx={{
                  fontSize: "9px",
                  padding: "0px 3px 0px 2px",
                  fontWeight: 700,
                }}
              >
                Pcs
              </Typography>
            </Box>
          </Box>
        </Grid> */}
      </Grid>
    </Box>
  );
};
export default Prodt;
