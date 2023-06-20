import {
  UnstyledButton,
  UnstyledButtonProps,
  Group,
  Avatar,
  Text,
  createStyles,
  Collapse,
  Tooltip
} from '@mantine/core';
import {
  IconChevronDown,
  IconChevronRight,
  IconLogout
} from '@tabler/icons-react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';

const useStyles = createStyles(theme => ({
  user: {
    display: 'block',
    width: '100%',
    padding: theme.spacing.md,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[8]
          : theme.colors.gray[0]
    }
  },
  avatar: {
    backgroundColor: theme.white
  },
  collapse: {
    marginTop: 10,
    display: 'flex',
    justifyContent: 'center'
  }
}));

interface UserButtonProps extends UnstyledButtonProps {
  image: string | undefined | null;
  name: string | undefined | null;
  email: string | undefined | null;
}

export function UserButton({ image, name, email, ...others }: UserButtonProps) {
  const { classes } = useStyles();
  const router = useRouter();

  const [showUser, setShowUser] = useState(false);
  return (
    <UnstyledButton
      className={classes.user}
      {...others}
      onClick={() => setShowUser(prev => !prev)}
    >
      <Group>
        <Avatar className={classes.avatar} src={image} radius='xl' />

        <div style={{ flex: 1 }}>
          <Text size='sm' weight={500}>
            {name}
          </Text>

          <Text color='dimmed' size='xs'>
            {email}
          </Text>
        </div>

        {showUser ? (
          <IconChevronDown size='0.9rem' stroke={1.5} />
        ) : (
          <IconChevronRight size='0.9rem' stroke={1.5} />
        )}
      </Group>
      <Collapse className={classes.collapse} in={showUser}>
        <Tooltip pt={5} label='Logout' position='right'>
          <IconLogout onClick={() => void router.push('/auth/signout')} />
        </Tooltip>
      </Collapse>
    </UnstyledButton>
  );
}
