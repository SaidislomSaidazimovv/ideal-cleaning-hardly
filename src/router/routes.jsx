import { Icon } from "@mui/material";
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import ViewListOutlinedIcon from '@mui/icons-material/ViewListOutlined';
import CleaningServicesOutlinedIcon from '@mui/icons-material/CleaningServicesOutlined';
import PersonIcon from "@mui/icons-material/Person";

const routes = [
  {
    path: "/main",
    content: "Dashboard",
    icon: <Icon component={DashboardCustomizeOutlinedIcon} />,
  },
  {
    path: "/main/order",
    content: "Order",
    icon: <Icon component={ViewListOutlinedIcon} />,
  },
  {
    path: "/main/service",
    content: "Service",
    icon: <Icon component={CleaningServicesOutlinedIcon} />,
  },
  {
    path: "/main/client",
    content: "Client",
    icon: <Icon component={PersonIcon} />,
  },
];

export default routes;
