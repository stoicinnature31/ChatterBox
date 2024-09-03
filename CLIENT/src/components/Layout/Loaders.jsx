import React from "react";
import { Grid, Skeleton, Stack } from "@mui/material";

const Loaders = () => {
  return (
    <div>
      <Grid container height={"calc(100vh - 4rem"} spacing={"1rem"}>
        <Grid
          item
          sm={4}
          md={3}
          sx={{
            display: { xs: "none", sm: "block" },
          }}
          height={"100vh"}>
          <Skeleton variant="rectangular" height={"100vh"} />
        </Grid>

        <Grid item xs={12} sm={8} lg={6} height={"100%"}>
          <Stack spacing={"1rem"}>
            {Array.from({ length: 8 }).map((_, index) => (
              <Skeleton key={index} variant="rectangular" height={"4.5rem"} />
            ))}
          </Stack>
        </Grid>

        <Grid
          item
          md={4}
          lg={3}
          height={"100vh"}
          sx={{
            display: { xs: "none", md: "block" },
          }}>
          <Skeleton variant="rectangular" height={"100vh"} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Loaders;
