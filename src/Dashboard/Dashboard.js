import * as React from 'react';
import { Modal, Paper, TextField, Button } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useEffect, useState } from 'react';
import { MDBFooter } from 'mdb-react-ui-kit';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Advertisement from './Advertisement';
import ChurchIcon from '@mui/icons-material/Church';
import SubscriptionIcon from '@mui/icons-material/Subscriptions';
import EntityIcon from '@mui/icons-material/AccountTree';
import SubscriptionList from './SubscriptionList';
import Services from './Services';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import BusinessIcon from '@mui/icons-material/Business';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ListIcon from '@mui/icons-material/List';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Entity from './Entity';
import MusicVideoIcon from '@mui/icons-material/MusicVideo';
import Choir from "./Choir";
import HomeIcon from '@mui/icons-material/Home';
import FullWidthGrid from './interviene';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Gallerydisplay from './GalleryInterviene';
import CollectionsIcon from '@mui/icons-material/Collections';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import Swal from 'sweetalert2';
import "./Dashboard.css";
import SuperAdmindashboard from './SuperAdmindashBoard';

const drawerWidth = 160;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 10),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',

    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);



const Footer = styled(MDBFooter)(({ theme }) => ({
  // ...theme.mixins.toolbar,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  // height: '25px',
}));

const AdvertisementWrapper = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  zIndex: 9999,
});

const Marquee = styled('div')({
  width: '100%',
  // backgroundColor: '#1976d2',
  backgroundColor: 'rgba(17,106,162,255)',
  color: 'white',
  fontSize: '1.2rem',
  height: '65px',
  display: 'flex',
  alignItems: 'center',
  marginTop: '30px',
});

const DashboardContent = ({ selectedItem }) => {
  switch (selectedItem) {
    case 'Home':
      return <SuperAdmindashboard />;
    case 'Entity':
      return <FullWidthGrid />;
    case 'Subscription':
      return <SubscriptionList />;
    case 'Services':
      return <Services />;
    case 'Drafts':
      return <Typography variant="h2">Drafts Content</Typography>;
    case 'Choir':
      return <Choir />;
    case 'Subscription':
      return <SubscriptionList />;
    case 'Services':
      return <Services />;
    case 'Gallery':
      return <Gallerydisplay/>;
    case 'Media':
      return <FullWidthGrid />;
    case 'Drafts':
      return <Typography variant="h2">Drafts Content</Typography>;
    default:
      return null;
  }
};

export default function Dashboard() {

  const settings = ["profile", "Settings", "Change password", "Logout"];
  const [anchorElUser, setAnchorElUser] = React.useState("");
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [email, setEmail] = useState('');
  const [openForgotModal, setOpenForgotModal] = useState('');
  const[sdetails,setSdetails]=useState([]);
  const loggedin=localStorage.getItem('Id');



  const handleCloseUserMenu = () => {
    setAnchorElUser();
  };

  const handleOpenUserMenu = (event, index) => {
    const clickedItem = settings[index];

    if (clickedItem === 'Change password') {
      Swal.fire({
        title: 'Change Password',
        text: 'Do you want to change your password?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
          setOpenForgotModal(true);
        }
      });
    } else {
      setAnchorElUser(event.currentTarget);
    }
  };





  useEffect(() => {
    fetch(`http://localhost:9999/user/api/getByUser/${loggedin}`)
    .then(response=>response.json())
    .then(value=>setSdetails(value))
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState('Home');
  const [error, setError] = useState('');

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const passwordReset = localStorage.getItem('PasswordReset');
    if (passwordReset !== 'true') {
      Swal.fire({
        title: 'Password Reset Required',
        text: 'Do you want to reset your password?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
          setOpenForgotModal(true);
        } else {
          console.log('User clicked No');
        }
      });
    }
  }, []);



  const showToast = (icon, title, text) => {
    Swal.fire({
      icon: icon,
      // title: title,
      text: text,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      customClass: {
        container: 'toast-container',
      },
    });
  };


  const handleUpdate = () => {
    const email = localStorage.getItem('email');
    setEmail(email)
;

    if (!email || !password || !newPassword || !confirmPwd) {
      showToast('error', 'Error', 'Please fill in all the fields.');
      return;
    }

    if (newPassword !== confirmPwd) {
      showToast('error', 'Error', 'New password and confirm password do not match.');
      return;
    }

    const resetDto = {
      email: email,
      password: password,
      newPassword: newPassword,
      confirmPwd: confirmPwd,
    };

    fetch('http://localhost:9999/user/api/resetPassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resetDto),
    })
      .then(response => {
        if (!response.ok) {
          if (response.status === 401) {
            return response.json().then(data => {
              throw new Error(data.message);
            });
          } else {
            throw new Error('Network response was not ok');
          }
        }
        showToast('success', 'Success', 'Password updated successfully.');
        return response.json();
      })
      .then(data => {
        console.log(data);
        setOpenForgotModal(false);
      })
      .catch(error => {
        console.error('Error:', error);
        showToast('error', 'Error', error.message);
      });
  };


  const handleCloseForgot = () => {
    setOpenForgotModal(false);
  };



  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', overflow: 'hidden', maxHeight: 'calc(100vh - 120px)' }}>
        <Marquee>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, marginLeft: "35%", marginTop: "1%" }}>
            Welcome to Super Admin Dashboard!
          </Typography>
          <Typography variant="subtitle1" noWrap component="div" style={{ color: "white", marginLeft: "-5%", marginTop: "1.5%", fontSize: "0.7rem" }}>
            <b>{sdetails.firstName}</b> <br />
            {new Date().toLocaleString()}
          </Typography>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenUserMenu}
            color="inherit"
            style={{ marginTop: "20px" }}
          >
            <AccountCircleIcon style={{ width: "35px", height: "35px" }} />
            <ArrowDropDownIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((item, index) => (
              <MenuItem key={index} onClick={(event) => handleOpenUserMenu(event, index)}>
                {item}
              </MenuItem>
            ))}

          </Menu>
        </Marquee>

        <CssBaseline />
        <AppBar position="fixed" open={open} sx={{ backgroundColor: 'rgba(17,106,162,255)', height: "45px" }} md={{ height: "25px" }}>
          <Toolbar >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open} sx={{ backgroundColor: 'rgba(17,106,162,255)' }}>
          <DrawerHeader style={{ marginLeft: "30%" }}>
            <div style={{ marginRight: "60%" }}>
              <ChurchIcon /></div>
            <b style={{ marginLeft: "35%" }}>CMS</b><IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <div >
            <List >
              {['Home','Entity', 'Subscription', 'Services', 'Reports'].map((text, index) => (
                <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                  <ListItemButton
                    onClick={() => setSelectedItem(text)}
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 1,
                      bgcolor: selectedItem === text ? 'rgba(17,106,162,255)' : 'inherit',
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                      }}
                    >
                      {text === 'Home' ? <HomeIcon /> :
                      text === 'Entity' ? <EntityIcon /> :
                        text === 'Subscription' ? <SubscriptionIcon /> :
                          text === 'Services' ? <BusinessIcon /> :
                            text === 'Reports' ? <AssessmentIcon /> :
                              <InboxIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Divider />
            <List >
              {['Choir', 'List', 'Marketing', 'Gallery', 'Media', 'LogOff'].map((text, index) => (
                <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                  <ListItemButton
                    onClick={() => setSelectedItem(text)}
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 1,
                      bgcolor: selectedItem === text ? 'rgba(17,106,162,255)' : 'inherit',
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                      }}
                    >
                      {text === 'Choir' ? <MusicVideoIcon /> :
                        text === 'List' ? <ListIcon /> :
                          text === 'Marketing' ? <TrendingUpIcon /> :
                            text === 'Gallery' ? <CollectionsIcon /> :
                              text === 'Media' ? <PermMediaIcon /> :
                                text === 'LogOff' ? <ExitToAppIcon /> :
                                  <InboxIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Divider />
          </div>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, pt: 1 }}>
          <DashboardContent selectedItem={selectedItem} />
        </Box>
       
        <AdvertisementWrapper>
          <Advertisement />
        </AdvertisementWrapper>
        <Footer className='css-ikz5aw' sx={{ backgroundColor: 'rgba(17,106,162,255)', height: "20px" }} style={{ backgroundColor: 'rgba(17,106,162,255)', color: "white", textAlign: "center", height: "30px" }}>
          &copy; {new Date().getFullYear()} Copyright: cms.com
        </Footer>
      </Box>
      <Modal
        open={openForgotModal}
        onClose={handleCloseForgot}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ padding: '4px' }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 2,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <TextField id="input-email" label="Email" variant="standard" fullWidth value={email}
              onChange={e => setEmail(e.target.value)} style={{ display: 'none' }} />
            <TextField
              type="password"
              id="input-old-password"
              label="Old Password"
              variant="standard"
              fullWidth
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <TextField
              type="password"
              id="input-new-password"
              label="New Password"
              variant="standard"
              fullWidth
              required
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
            />
            <TextField
              type="password"
              id="input-confirm-password"
              label="Confirm Password"
              variant="standard"
              fullWidth
              required
              value={confirmPwd}
              onChange={e => setConfirmPwd(e.target.value)}
            />
          </Box>
          <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '16px' }}>
            <Button variant="contained" onClick={handleUpdate}>
              Update
            </Button>
            <Button variant="contained" onClick={handleCloseForgot}>
              Cancel
            </Button>
          </div>
        </Paper>
      </Modal>
    </>
  );
}