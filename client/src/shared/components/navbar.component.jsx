import { Anchor, AppShell, Burger, Button, Container, Header, MediaQuery, Navbar, createStyles } from '@mantine/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../contexts/app.context';
import { Dropdown } from './dropdown.component';
import { IoLogOut } from 'react-icons/io5';
import { BiDownArrow } from 'react-icons/bi';
import { useLogout } from '@/auth/hooks/use-logout.hook';

const useStyles = createStyles((theme) => ({
  navbar: {
    [theme.fn.largerThan("sm")]: {
      display: "none"
    },
    display: 'flex',
    alignItems: 'left',
    gap: 10,
    margin: 10
  },

  navbarLink: {
    borderBottom: '0.0625rem solid #2C2E33',
    paddingLeft: '1rem'
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none"
    },
    display: 'flex',
    gap: '32px',
  },

  headerContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: '100%'
  },
}));

export function Layout ({ children }) {
  const [opened, setOpened] = React.useState(false)

  return <AppShell
    fixed
    navbarOffsetBreakpoint={"sm"}
    header={<HeaderBar opened={opened} onClick={() => setOpened(old => !old)} />}
    navbar={<NavBar hidden={!opened} onClick={() => setOpened(false)} />}
  >
    {children}
  </AppShell>
}

function NavBar ({ hidden, onClick }) {
  const { classes } = useStyles();
  const { isAuthenticated } = React.useContext(AppContext)
  const { handleLogout } = useLogout()

  return <Navbar
    className={classes.navbar}
    width={{ base: "100%", sm: 0 }}
    hidden={hidden}
  >
    {isAuthenticated ? (
      <>
        <NavLink className={classes.navbarLink} onClick={onClick} to={'/topics'}>Topics</NavLink>
        <NavLink className={classes.navbarLink} onClick={onClick} to={'/reports'}>Reports</NavLink>
        <Button color='red' onClick={handleLogout}><IoLogOut /> Logout</Button>
      </>
    ) : null
    }
  </Navbar >
}

function HeaderBar (props) {
  const { classes } = useStyles();
  const { isAuthenticated } = React.useContext(AppContext)

  return <Header height={50}>
    <Container h={'100%'}>
      <div className={classes.headerContent}>
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Burger
            {...props}
            size="sm"
            mr="xl"
          />
        </MediaQuery>
        <NavLink to="/" fw={700} fz="xl">
          Time Tracker
        </NavLink>
        <div className={classes.links}>
          {isAuthenticated ? (
            <>
              <NavLink to={'/topics'}>Topics</NavLink>
              <NavLink to={'/reports'}>Reports</NavLink>
              <UserDropdown />
            </>
          ) : null}
        </div>
      </div>
    </Container>
  </Header>
}

function NavLink ({ to, children, ...props }) {
  return <Anchor color='white' {...props} underline={false} component={Link} to={to}>{children}</Anchor>
}

function UserDropdown () {
  const { user } = React.useContext(AppContext)
  const { handleLogout } = useLogout()

  const menuItems = [
    {
      label: 'Logout',
      onClick: handleLogout,
      icon: <IoLogOut />,
      color: 'yellow'
    }
  ]

  return (
    <Dropdown anchorText={<span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>{user.name} <BiDownArrow /></span>} menuItems={menuItems} />
  );

}
