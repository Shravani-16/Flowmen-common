import { Box, Grid, Tooltip, Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Prodt from "./product/Prodt";

const Production = ({ Prod, AcProd }) => {
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
            padding: "7px 4px 6px 7px",
            fontSize: "18px",
            color: "white",
            fontWeight: "600",
          }}
        >
          Production Target
        </Typography>
        <Typography
          sx={{
            fontSize: "16px",
            color: "white",
            fontWeight: "700",
            cursor: "pointer",
          }}
        >
          <Tooltip title="Expected Production" placement="top">
            <InfoOutlinedIcon
              sx={{ fontSize: "17px", margin: "10px 11px 0px 0px" }}
            />
          </Tooltip>
        </Typography>
      </Box>

      {/* Components */}
      <div
        style={{
          alignItems: "center",
          justifyContent: "center",
          padding: "0px 10px 0px 0px",
        }}
      >
        <Grid sx={{}}>
          <Prodt volume={Prod} isVisi={true} />
        </Grid>
      </div>
    </Box>
  );
};

export default Production;
