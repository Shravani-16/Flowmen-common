import { Box, Grid, Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Qty from "./Quality/Qty";

const Quality = ({ Prod, AcProd, RProd }) => {
  return (
    <Box
      sx={{
        display: "block",
        height: "auto",
        marginTop: "0%",
        backgroundColor: "#f1f1f1",
        width: "100%",
        textAlign: "center",
      }}
    >
      {/* Title */}
      <Box sx={{ justifyContent: "space-between", display: "flex" }}>
        <Typography
          sx={{
            padding: "7px 4px 6px 7px",
            fontSize: "16px",
            color: "#385076",
            fontWeight: "600",
          }}
        >
          Quality
        </Typography>
        <Typography
          sx={{ fontSize: "16px", color: "#385076", fontWeight: "600" }}
        >
          <InfoOutlinedIcon
            sx={{ fontSize: "17px", margin: "10px 11px 0px 0px" }}
          />
        </Typography>
      </Box>
      <Typography
        sx={{
          color: "2px solid #0000001c",
          margin: "1% 0% 2% 1%",
          width: "98%",
          borderBottom: "2px solid #0000004a",
        }}
      ></Typography>
      {/* Components */}
      <div
        style={{
          alignItems: "center",
          justifyContent: "center",
          padding: "10px 10px 0px 12px",
        }}
      >
        <Grid
          sx={{ borderBottom: "2px solid #0000004a", margin: "10px 0 0 0" }}
        >
          <Qty title={"Ok Quality"} volume={Prod} isVisi={true} />
        </Grid>
        <Grid
          sx={{
            borderBottom: "2px solid #0000004a",
            margin: "10px 0 0 0",
            padding: "10px 0px 0px 0px",
          }}
        >
          <Qty title={"Not Ok Quality"} volume={AcProd} isVisi={true} />
        </Grid>
        <Grid sx={{ margin: "10px 0 0 0", padding: "10px 0px 0px 0px" }}>
          <Qty
            title={"Rejected Quality (%)"}
            volume={isNaN(RProd) || RProd === null || RProd === undefined ? "0 %" : `${RProd} %`} 
            isVisi={true}
          />
        </Grid>
      </div>
    </Box>
  );
};

export default Quality;
