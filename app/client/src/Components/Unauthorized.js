import { useLocation } from "react-router-dom";
import { Typography } from "@mui/material";

const Unauthorized = () => {
  const location = useLocation();
  return (
    <div>
      <Typography variant="h1">Error 404</Typography>
      <Typography variant="h2">Page not found</Typography>
    </div>
  );
};

export default Unauthorized;
