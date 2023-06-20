import { Box, Header, Navbar, createStyles } from '@mantine/core';
import { Sidebar } from './Sidebar/Sidebar';
import { useMediaQuery } from '@mantine/hooks';
import { IconMenu2 } from '@tabler/icons-react';
import { useState } from 'react';
const useStyles = createStyles(theme => ({
  main: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    flex: 1,
    color: theme.colorScheme === 'dark' ? theme.white : theme.colors.dark[6],
    padding: '6px 10px 6px 10px'
  },
  iconMenu: {
    color: theme.colorScheme === 'dark' ? theme.black : theme.white
  }
}));

export default function Layout({ children }: { children: React.ReactNode }) {
  const { classes } = useStyles();
  const isMobile = useMediaQuery('(max-width:675px )');

  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      <main
        style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row'
        }}
      >
        <Box display={isMobile ? 'none' : 'unset'}>
          <Sidebar />
        </Box>
        {isMobile ? (
          <Header
            sx={theme => ({
              backgroundColor:
                theme.colorScheme === 'dark'
                  ? theme.colors.gray[2]
                  : theme.black,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'end',
              position: 'absolute',
              zIndex: 10
            })}
            height={60}
            p='xs'
          >
            <IconMenu2
              className={classes.iconMenu}
              onClick={() => setShowSidebar(prev => !prev)}
            />
          </Header>
        ) : (
          ''
        )}
        {showSidebar ? (
          <Box
            pos={'fixed'}
            sx={{
              zIndex: 100
            }}
          >
            <Sidebar />
          </Box>
        ) : (
          ''
        )}

        <Box className={classes.main}>{children}</Box>
      </main>
    </>
  );
}
