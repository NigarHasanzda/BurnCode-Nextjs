"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import CircularProgress, {
  circularProgressClasses,
} from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

function BurncodeCircularProgress(
  props: React.ComponentProps<typeof CircularProgress>
) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      {/* Background circle */}
      <CircularProgress
        variant="determinate"
        sx={{ color: "#5D56F1" }}
        size={135}
        thickness={1.5}
        value={100}
      />

      {/* Animated circle */}
      <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={{
          color: "#ffffff",
          animationDuration: "600ms",
          position: "absolute",
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: "round",
          },
        }}
        size={135}
        thickness={2}
        {...props}
      />

      {/* Center text */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: "#ffffff",
            letterSpacing: 1,
          }}
        >
          Burncode
        </Typography>
      </Box>
    </Box>
  );
}

export default function IntroPage() {
  return (
    <Stack
      sx={{
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#5D56F1",
      }}
    >
      <BurncodeCircularProgress />
    </Stack>
  );
}