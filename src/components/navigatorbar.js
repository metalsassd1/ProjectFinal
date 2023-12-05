// Sidebar.js
import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import HistoryIcon from "@mui/icons-material/History";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { green } from "@mui/material/colors";

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <Drawer
      variant="temporary"
      anchor="left"
      open={isOpen}
      onClose={onClose}
      sx={{ "& .MuiDrawer-paper": { width: 240 } }}
    >
      <List>
        <ListItem
          style={{
            borderBottom: "1px #ccc",
            background: "#1CA82A",
            width: "200%",
            fontSize: "large",
            padding:"10px",
            marginBottom:"10px",
            marginTop:"-8px",
          }}
        >
          PIM CAN TAKE
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <ExploreIcon />
          </ListItemIcon>
          <ListItemText primary="Explore" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <SubscriptionsIcon />
          </ListItemIcon>
          <ListItemText primary="Subscriptions" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <VideoLibraryIcon />
          </ListItemIcon>
          <ListItemText primary="Library" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <HistoryIcon />
          </ListItemIcon>
          <ListItemText primary="History" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <YouTubeIcon />
          </ListItemIcon>
          <ListItemText primary="Your videos" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <ThumbUpIcon />
          </ListItemIcon>
          <ListItemText primary="Liked videos" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <HistoryIcon />
          </ListItemIcon>
          <ListItemText primary="History" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <WatchLaterIcon />
          </ListItemIcon>
          <ListItemText primary="Watch later" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <AddCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Add a video" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
