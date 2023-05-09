import { useLocation } from "react-router-dom";
import { Typography } from "@mui/material";

const Unauthorized = () => {
  const location = useLocation();
  return (
    <div>
      <Typography variant="h1">Unauthorized</Typography>
      <Typography variant="h2">
        You are not authorized to access {location?.state?.from?.pathname}
      </Typography>
    </div>
  );
};

export default Unauthorized;
