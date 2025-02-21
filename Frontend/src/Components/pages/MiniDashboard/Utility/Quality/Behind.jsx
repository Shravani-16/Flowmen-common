import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Box, Grid, Typography } from "@mui/material";

const Behind = ({ difference }) => {
  const isOnTime = difference === 0;
  const isAhead = difference < 0; // When actual production is greater than expected production
  const statusMessage = isOnTime ? "On Time" : "Bad Production";

  return (
    <Box
      sx={{
        display: "block",
        height: "auto",
        marginTop: "3%",
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
          Behind By
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
          padding: "0px 10px 24px 12px",
        }}
      >
        <Grid>
          {/* Difference or On Time Message */}
          {isOnTime ? (
            <Typography
              sx={{
                fontSize: "1.2rem",
                marginBottom: "5px",
                color: "#385076",
                fontWeight: "600",
              }}
            >
              {statusMessage}
            </Typography>
          ) : isAhead ? (
            <Typography
              sx={{
                fontSize: "1.2rem",
                marginBottom: "5px",
                color: "#385076",
                fontWeight: "600",
              }}
            >
              {`Ahead by: ${Math.abs(difference)}`}
            </Typography>
          ) : (
            <Typography
              sx={{
                fontSize: "1.2rem",
                marginBottom: "5px",
                color: "#385076",
                fontWeight: "600",
              }}
            >
              {`Delayed by: ${Math.abs(difference)}`}
            </Typography>
          )}
        </Grid>
      </div>
    </Box>
  );
};

export default Behind;
