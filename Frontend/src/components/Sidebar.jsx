import React from "react";
import {
  IconButton,
  Typography,
  List,
  ListItem,
  Drawer,
  Card,
} from "@material-tailwind/react";
import {
  ChevronRightIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export function SidebarWithBurgerMenu() {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <>
      <IconButton variant="text" size="lg" onClick={openDrawer}>
        {isDrawerOpen ? (
          <XMarkIcon className="h-8 w-8 stroke-2" />
        ) : (
          <Bars3Icon className="h-8 w-8 stroke-2" />
        )}
      </IconButton>
      <Drawer open={isDrawerOpen} onClose={closeDrawer}>
        <Card
          color="transparent"
          shadow={false}
          className="h-[calc(100vh-2rem)] w-full p-4"
        >
          <div className=" text-2xl font-bold ml-6 mb-5">
            
             Job<span className="text-[#F83002] ">Portal</span>
          </div>
          <List>
            <ListItem>
              <ChevronRightIcon strokeWidth={3} className="h-4 w-4 mr-2" />
              <Link to="/ats-checker">ATS Checker</Link>
              

             
            </ListItem>
            <ListItem>
              <ChevronRightIcon strokeWidth={3} className="h-4 w-4 mr-2" />
              <Link to="/courses">Courses Recommendation</Link>
            </ListItem>
            <ListItem>
              <ChevronRightIcon strokeWidth={3} className="h-4 w-4 mr-2" />
              <Link to="/rank">Rank</Link>
            </ListItem>
            <ListItem>
              <ChevronRightIcon strokeWidth={3} className="h-4 w-4 mr-2" />
              <Link to="/mentorship">Mentorship</Link>
            </ListItem>
            <ListItem>
              <ChevronRightIcon strokeWidth={3} className="h-4 w-4 mr-2" />
              <Link to="/roadmap">Roadmap</Link>
            </ListItem>
            <ListItem>
              <ChevronRightIcon strokeWidth={3} className="h-4 w-4 mr-2" />
              <Link to="/trending-domain">Trending Domains</Link>
            </ListItem>
          </List>
        </Card>
      </Drawer>
    </>
  );
}
