import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType
} from 'next';
import { getProviders, signIn } from 'next-auth/react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../server/auth';
import { Box, UnstyledButton } from '@mantine/core';

export default function SignIn({
  providers
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Box
        display={'flex'}
        sx={{
          alignItems: 'center',
          justifyContent: 'center'
        }}
        h={'100vh'}
      >
        {Object.values(providers).map(provider => (
          <div key={provider.name}>
            <UnstyledButton onClick={() => void signIn(provider.id)}>
              Sign in with {provider.name}
            </UnstyledButton>
          </div>
        ))}
      </Box>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: '/' } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] }
  };
}
