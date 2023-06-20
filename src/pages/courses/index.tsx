import {
  Box,
  Button,
  Header,
  Modal,
  SimpleGrid,
  Title,
  TextInput,
  Group,
  Textarea,
  Stack
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { NextPage } from 'next';
import { CourseCard } from '~/components/Card';
import Layout from '~/components/layout';
import { useForm } from '@mantine/form';
import { api } from '~/utils/api';

const Course: NextPage = () => {
  const courses = api.course.getCourses.useQuery();
  const form = useForm({
    initialValues: {
      title: '',
      description: ''
    }
  });

  const [
    isCreateCourseModal,
    { open: openCreateCourseModal, close: closeCreateCourseModal }
  ] = useDisclosure(false);

  const createCourseMutation = api.course.createCourse.useMutation();
  return (
    <Layout>
      <Box>
        <Header
          height={60}
          display={'flex'}
          mb={20}
          sx={{
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Title order={2}>Manage Courses</Title>
          <Button onClick={openCreateCourseModal}>Create Course</Button>
        </Header>
        <Modal
          title='Create Course'
          opened={isCreateCourseModal}
          onClose={closeCreateCourseModal}
        >
          <form
            onSubmit={form.onSubmit(async values => {
              await createCourseMutation.mutateAsync(values);
              courses.refetch();
              form.reset();
              closeCreateCourseModal();
            })}
          >
            <Stack mb={2}>
              <TextInput
                withAsterisk
                label='Title'
                placeholder='React Redux Course'
                required
                {...form.getInputProps('title')}
              />
              <Textarea
                placeholder='describe your course a'
                label='Description'
                withAsterisk
                {...form.getInputProps('description')}
              />
            </Stack>

            <Group position='right' mt='md'>
              <Button type='submit'>Submit</Button>
            </Group>
          </form>
        </Modal>
        <SimpleGrid cols={4} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
          {courses.data?.map(c => (
            <CourseCard course={c} key={c.id} />
          ))}
        </SimpleGrid>
      </Box>
    </Layout>
  );
};

export default Course;
