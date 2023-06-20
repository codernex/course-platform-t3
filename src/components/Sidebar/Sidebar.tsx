import {
  Navbar,
  Group,
  Code,
  ScrollArea,
  createStyles,
  rem,
  useMantineColorScheme
} from '@mantine/core';
import {
  IconNotes,
  IconCalendarStats,
  IconGauge,
  IconPresentationAnalytics,
  IconFileAnalytics,
  IconAdjustments,
  IconLock,
  IconVideo,
  IconBulb,
  IconBulbOff,
  IconLayoutDashboard
} from '@tabler/icons-react';
import { UserButton } from '../UserButton';
import { LinksGroup } from '../NavbarLinksGroup';
import { Logo } from './Logo';
import { useSession } from 'next-auth/react';

const mockdata: {
  label: string;
  icon: any;
  initiallyOpened?: boolean;
  links?: { label: string; link: string }[];
}[] = [
  { label: 'Dashboard', icon: IconLayoutDashboard },
  {
    label: 'Courses',
    icon: IconVideo,
    initiallyOpened: true,
    links: [{ label: 'Manage Courses', link: '/courses' }]
  }
];

const useStyles = createStyles(theme => ({
  navbar: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
    paddingBottom: 0
  },

  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`
  },

  links: {
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`
  },

  linksInner: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl
  },

  footer: {
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`
  }
}));

export function Sidebar() {
  const { classes } = useStyles();
  const links = mockdata.map(item => <LinksGroup {...item} key={item.label} />);
  const { data } = useSession();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Navbar
      height={'100%'}
      sx={{
        minHeight: '100vh'
      }}
      width={{ sm: 300 }}
      p='md'
      className={classes.navbar}
    >
      <Navbar.Section className={classes.header}>
        <Group position='apart'>
          <Logo width={rem(120)} />
          <Code
            onClick={() => void toggleColorScheme()}
            sx={{ fontWeight: 700, cursor: 'pointer' }}
          >
            {colorScheme === 'dark' ? <IconBulb /> : <IconBulbOff />}
          </Code>
        </Group>
      </Navbar.Section>

      <Navbar.Section grow className={classes.links} component={ScrollArea}>
        <div className={classes.linksInner}>{links}</div>
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <UserButton
          image={data?.user.image}
          name={data?.user.name}
          email={data?.user.email}
        />
      </Navbar.Section>
    </Navbar>
  );
}
