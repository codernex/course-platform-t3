import { Box, Title, UnstyledButton } from '@mantine/core';
import { signOut } from 'next-auth/react';
import React from 'react';

const SingOut = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh'
      }}
    >
      <Box
        sx={{
          border: '1px solid #ccc',
          padding: 20,
          height: '300px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          rowGap: 20
        }}
      >
        <Title order={2}>Are you sure you want to sign out?</Title>
        <UnstyledButton title='Sign Out' onClick={() => void signOut()}>
          Sign Out
        </UnstyledButton>
      </Box>
    </Box>
  );
};
export default SingOut;
