import { Box, Grid, Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

// Subcomponent
const Qty = ({ title, volume, isVisi, para }) => {
  return (
    <Box sx={{ paddingBottom: "8%" }}>
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
        <Grid item md={7} lg={7}>
          <Typography
            sx={{
              color: "hsl(214.86deg 100% 14.51%)",
              fontWeight: "500",
              fontSize: "28px",
              float: "left",
              paddingLeft: "4px",
            }}
          >
            {volume}
          </Typography>
        </Grid>
        <Grid
          item
          md={3}
          lg={3}
          sx={{
            width: "60%",
            display: "flex",
            backgroundColor: "#ffff",
            marginTop: "20px",
            height: "20px",
            padding: "2px 45px 4px 10px",
            borderRadius: "5px",
            alignContent: "flex-end",
            float: "right",
          }}
        >
          <Box sx={{ margin: "4% 0% 0% 20%", display: "flex" }}>
            <Box sx={{ borderRight: "1px solid black" }}>
              <Typography
                sx={{
                  fontSize: "9px",
                  padding: "0px 3px 0px -2px",
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
                  padding: "0px 3px 0px 2px",
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
        </Grid>
      </Grid>
      {/* End Box */}
      <div style={{ marginTop: "10px", height: "auto" }}>
        <Box
          sx={{
            backgroundColor: "#ffff",
            padding: "2px 0px 4px 0px",
            borderRadius: "5px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{ float: "left", fontSize: "10px", margin: "4px 0px 0px 4px" }}
          >
            {volume}
          </Typography>
          <Typography
            sx={{
              fontSize: "10px",
              textAlign: "right",
              margin: "4px 4px 0px 0px",
            }}
          >
            {para || "MTD"}
          </Typography>
        </Box>
        {isVisi && (
          <Box
            sx={{
              backgroundColor: "hsl(50.1deg 93.41% 48.78% / 68%)",
              padding: "2px 0px 4px 0px",
              borderRadius: "5px",
              marginTop: "7px",
            }}
          >
            <Typography
              sx={{
                float: "left",
                fontSize: "10px",
                margin: "4px 0px 0px 4px",
              }}
            >
              43.3M
            </Typography>
            <Typography
              sx={{
                fontSize: "9px",
                textAlign: "right",
                margin: "4px 4px 0px 0px",
              }}
            >
              YTD
            </Typography>
          </Box>
        )}
      </div>
    </Box>
  );
};
export default Qty;
