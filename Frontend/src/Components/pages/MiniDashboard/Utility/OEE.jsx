import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Circle = styled.circle`
  transition: stroke-dashoffset 1s ease-in-out;
`;

const Text = styled.text`
  transition: fill 1s ease-in-out;
`;

const Item = styled.div`
  padding: 20px;
  text-align: center;
`;

const OEE = ({ percentage, gradient = ["#00ff00", "#ff0000"], strokeWidth }) => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedPercentage((prevPercentage) =>
        prevPercentage < percentage ? prevPercentage + 1 : percentage
      );
    }, 10);

    return () => clearInterval(interval);
  }, [percentage]);

  const radius = 60;
  const circumference = 2 * Math.PI * radius;

  // Determine the color based on the percentage
  let dynamicGradient = gradient;
  if (percentage <= 25) {
    dynamicGradient = ["#ff0000", "#ff0000"]; // Red
  } else if (percentage >= 26 && percentage <= 74) {
    dynamicGradient = gradient; // Custom gradient
  } else if (percentage >= 75) {
    dynamicGradient = [
      "hsl(122.42deg 50.3% 63.16%)",
      "hsl(122.42deg 50.3% 63.16%)",
    ]; // Green
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={6} md={6} style={{ padding: "0px 0px 0px 0px" }}>
        <Item>
          <svg width={200} height={200}>
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={dynamicGradient?.[0]} />
                <stop offset="100%" stopColor={dynamicGradient?.[1]} />
              </linearGradient>
              <linearGradient
                id="whiteGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="white" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
            {/* Background circle with gradient white effect */}
            <circle
              r={radius}
              cx={100}
              cy={100}
              fill="transparent"
              stroke={`url(#whiteGradient)`}
              strokeWidth={strokeWidth}
            />
            {/* Foreground circle */}
            <Circle
              r={radius}
              cx={100}
              cy={100}
              fill="transparent"
              stroke={`url(#gradient)`}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={
                ((100 - animatedPercentage) * circumference) / 100
              }
              strokeLinecap="round"
            />
            <Text
              x="50%"
              y="50%"
              dominantBaseline="central"
              textAnchor="middle"
              fontSize={"1.5em"}
              fill={`url(#gradient)`}
            >
              {(animatedPercentage?.toFixed(0)) || 0}%
            </Text>
          </svg>
        </Item>
      </Grid>

      {/* Red Yellow Green */}
      <Grid item xs={6} md={6} style={{ marginTop: "50px" }}>
        <Item
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "0px 7px 10px 0px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              color: "#0e2563",
              fontWeight: "600",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "14px",
              }}
            >
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: "green",
                  marginRight: "8px",
                  borderRadius: "10px",
                }}
              ></div>
              <span>Good Production</span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "14px",
              }}
            >
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: "yellow",
                  marginRight: "8px",
                  borderRadius: "10px",
                }}
              ></div>
              <span>Balanced Production</span>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: "red",
                  marginRight: "8px",
                  borderRadius: "10px",
                }}
              ></div>
              <span>Bad Production</span>
            </div>
          </div>
        </Item>
      </Grid>
    </Grid>
  );
};

export default OEE;
