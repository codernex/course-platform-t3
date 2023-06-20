import {
  Card as MantineCard,
  AspectRatio,
  Image,
  Text,
  createStyles
} from '@mantine/core';
import { Course } from '@prisma/client';
const useStyles = createStyles(theme => ({
  card: {
    transition: 'transform 150ms ease, box-shadow 150ms ease',

    '&:hover': {
      transform: 'scale(1.01)',
      boxShadow: theme.shadows.md
    }
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 600
  }
}));

export function CourseCard({ course }: { course: Course }) {
  const { classes } = useStyles();
  return (
    <MantineCard
      key={course.title}
      p='md'
      radius='md'
      component='a'
      href='#'
      className={classes.card}
    >
      <AspectRatio ratio={1920 / 1080}>
        <Image
          src={
            'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80'
          }
        />
      </AspectRatio>
      <Text color='dimmed' size='xs' transform='uppercase' weight={700} mt='md'>
        {new Date(course.createdAt).toDateString()}
      </Text>
      <Text className={classes.title} mt={5}>
        {course.title}
      </Text>
    </MantineCard>
  );
}
