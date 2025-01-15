import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);
  const location = useLocation();

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const isActiveLink = (...paths) => {
    return paths.some(path => location.pathname === path);  
};

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <IconButton onClick={toggleDrawer(true)}><MenuIcon/></IconButton>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {/* {DrawerList} */}
        <Nav className="flex-column" style={{ height: '45px', backgroundColor: '#f5f5f5', borderRadius: '15px' }}>
            <List>
            
                <ListItem>
                    <Nav.Link
                        as={Link}
                        to="/adviserhomepage"
                        className={`nav-link-custom ${isActiveLink('/adviserhomepage', '/adviserclassroompage', '/group') ? 'active' : ''}`}
                        style={{
                            color: isActiveLink('/adviserhomepage', '/adviserclassroompage', '/group') ? '#000' : '#666666',
                            backgroundColor: isActiveLink('/adviserhomepage', '/adviserclassroompage', '/group') ? '#b9ff66' : 'transparent', 
                            borderRadius: '15px'  
                        }}
                    >
                        Home
                    </Nav.Link>
                </ListItem>
                <ListItem>
                    <Nav.Link
                        as={Link}
                        to="/adviserqueuepage"
                        className={`nav-link-custom ${isActiveLink('/adviserqueuepage') ? 'active' : ''}`}
                        style={{
                            color: isActiveLink('/adviserqueuepage') ? '#000' : '#666666',
                            backgroundColor: isActiveLink('/adviserqueuepage') ? '#b9ff66' : 'transparent', 
                            borderRadius: '15px'  
                        }}
                    >
                        Queue
                    </Nav.Link>
                </ListItem>
                <ListItem>
                    <Nav.Link
                        as={Link}
                        to="/adviseravailabilitypage"
                        className={`nav-link-custom ${isActiveLink('/adviseravailabilitypage') ? 'active' : ''}`}
                        style={{
                            color: isActiveLink('/adviseravailabilitypage') ? '#000' : '#666666',
                            backgroundColor: isActiveLink('/adviseravailabilitypage') ? '#b9ff66' : 'transparent', 
                            borderRadius: '15px'  
                        }}
                    >
                        Availability
                    </Nav.Link>
                </ListItem>
                <ListItem>
                    <Nav.Link
                        as={Link}
                        to="/adviserlogpage"
                        className={`nav-link-custom ${isActiveLink('/adviserlogpage') ? 'active' : ''}`}
                        style={{
                            color: isActiveLink('/adviserlogpage') ? '#000' : '#666666',
                            backgroundColor: isActiveLink('/adviserlogpage') ? '#b9ff66' : 'transparent', 
                            borderRadius: '15px'  
                        }}
                    >
                        Logs
                    </Nav.Link>
                </ListItem>
            </List>
        </Nav>
      </Drawer>
    </div>
  );
}
