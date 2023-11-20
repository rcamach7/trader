import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { useUser } from '@/context/UserContext';
import { useLoadingContext } from '@/context/LoadingContext';
import useAvailableHeight from '@/hooks/useAvailableHeight';

import {
  Box,
  TextField,
  Typography,
  Button,
  Stack,
  Avatar,
} from '@mui/material';

const profileImageOptions = [
  'profile_img_1.png',
  'profile_img_2.png',
  'profile_img_3.png',
];

export default function Login() {
  const { user, setUser } = useUser();
  const router = useRouter();
  const availableHeight = useAvailableHeight();
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    profileImage: 'profile_img_2.png',
  });
  const [errors, setErrors] = useState({ fieldId: null, helperText: null });
  const { setIsPageLoading } = useLoadingContext();

  const handleCredentialsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials((prevState) => {
      return {
        ...prevState,
        [e.target.id]:
          e.target.value === 'username'
            ? e.target.value.toLowerCase()
            : e.target.value,
      };
    });
  };

  const handleProfileImageSelection = (option: string) => {
    setCredentials((prevState) => {
      return {
        ...prevState,
        profileImage: option,
      };
    });
  };

  const handleCreateAccount = async (
    e?: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user]);

  useEffect(() => {
    console.log(credentials);
  }, [credentials]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: availableHeight,
        pb: 10,
      }}
    >
      <Typography variant="h3">Sign Up</Typography>
      <Box
        sx={{ display: 'flex', flexDirection: 'column', gap: 1, pt: 2 }}
        component="form"
        onSubmit={handleCreateAccount}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography sx={{ pb: 1 }}>Select Profile Image:</Typography>
          <Stack direction="row" spacing={2}>
            {profileImageOptions.map((option) => {
              return (
                <Avatar
                  alt={option}
                  src={`/profile/${option}`}
                  onClick={() => {
                    handleProfileImageSelection(option);
                  }}
                  style={{
                    border:
                      credentials.profileImage === option
                        ? 'solid 3px #6fa6b6'
                        : '',
                    width: credentials.profileImage === option ? 65 : 50,
                    height: credentials.profileImage === option ? 65 : 50,
                  }}
                />
              );
            })}
          </Stack>
        </Box>
        <TextField
          required
          id="username"
          label="Username"
          variant="outlined"
          value={credentials.username}
          onChange={handleCredentialsChange}
          error={errors.fieldId === 'username' ? true : false}
          helperText={errors.fieldId === 'username' ? errors.helperText : ''}
        />
        <TextField
          required
          id="password"
          label="Password"
          variant="outlined"
          type="password"
          value={credentials.password}
          onChange={handleCredentialsChange}
          error={errors.fieldId === 'password' ? true : false}
          helperText={errors.fieldId === 'password' ? errors.helperText : ''}
        />
        <TextField
          required
          id="confirmPassword"
          label="Confirm Password"
          variant="outlined"
          type="password"
          value={credentials.confirmPassword}
          onChange={handleCredentialsChange}
          error={errors.fieldId === 'confirmPassword' ? true : false}
          helperText={
            errors.fieldId === 'confirmPassword' ? errors.helperText : ''
          }
        />
        <Button variant="contained" type="submit">
          Create Account
        </Button>
        <Box>
          <Link href="/sign-in">
            <Typography textAlign="center" sx={{ textDecoration: 'underline' }}>
              Already have an account? Sign In
            </Typography>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
