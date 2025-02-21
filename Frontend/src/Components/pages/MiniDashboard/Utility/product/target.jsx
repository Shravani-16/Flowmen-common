import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Box, Grid, Typography } from "@mui/material";
// Subcomponent
const PT = ({ title, volume, isVisi, para }) => {
  return (
    <Box sx={{ paddingBottom: "6%" }}>
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
              // color: "hsl(0deg 0% 100%)",
              fontWeight: "500",
              fontSize: "35px",
              paddingLeft: "4px",
              marginTop: "-10px",
              color: "#385076",
            }}
          >
            {volume}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

const target = ({ AcProd }) => {
  return (
    <Box
      sx={{
        display: "block",
        height: "auto",
        marginTop: "0%",
        // backgroundColor: "#f1f1f1",
        width: "100%",
        textAlign: "center",
      }}
    >
      {/* Title */}
      <Box sx={{ justifyContent: "space-between", display: "flex" }}>
        <Typography
          sx={{
            padding: "5px 4px 13px 7px",
            fontSize: "18px",
            color: "#385076",
            fontWeight: "600",
          }}
        >
          Actual Production
        </Typography>
        <Typography
          sx={{ fontSize: "16px", color: "#385076", fontWeight: "700" }}
        >
          <InfoOutlinedIcon
            sx={{ fontSize: "17px", margin: "10px 11px 0px 0px" }}
          />
        </Typography>
      </Box>

      {/* Components */}
      <div
        style={{
          alignItems: "center",
          justifyContent: "center",
          // padding: "0px 10px 0px 0px",
        }}
      >
        <Grid sx={{}}>
          <PT volume={AcProd} isVisi={true} />
        </Grid>
      </div>
    </Box>
  );
};

export default target;
