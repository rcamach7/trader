import {
  Edit as EditIcon,
  FavoriteBorder as FavoriteBorderIcon,
  DeleteOutline as DeleteOutlineIcon,
  ThumbUpOffAlt as ThumbUpOffAltIcon,
} from '@mui/icons-material';
import { Box, Typography, Button } from '@mui/material';

import axios from 'axios';

import { useUser } from '@/context/UserContext';
import { useLoadingContext } from '@/context/LoadingContext';
import { useFeedbackContext } from '@/context/FeedbackContext';
import Shelf from '@/types/shelf';

interface Props {
  shelf: Shelf;
}

export default function ActionButtons({ shelf }: Props) {
  const { user, setUser } = useUser();
  const { addAlertMessage } = useFeedbackContext();
  const { setIsPageLoading } = useLoadingContext();

  const isUsersShelf = () => {
    if (!user) return false;
    if (shelf.creator._id === user._id) return true;
    return false;
  };

  const handleFavoriteShelfToggle = async () => {
    if (!user) {
      addAlertMessage({
        text: 'Please sign in to favorite a shelf',
        severity: 'error',
      });
      return;
    } else {
      setIsPageLoading(true);
      try {
        const res = await axios.post('/api/shelf/' + shelf._id + '/favorite');
        setUser((U) => ({ ...U, shelves: res.data.shelves }));
      } catch (error) {
        addAlertMessage({
          text: 'Error toggling favorite on shelf',
          severity: 'error',
        });
      }
      setIsPageLoading(false);
    }
  };

  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        height: '100%',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Button
        size="small"
        sx={{ px: 0.5, minWidth: 20 }}
        onClick={handleFavoriteShelfToggle}
      >
        <ThumbUpOffAltIcon sx={{ fontSize: 20 }} />
        <Typography
          sx={{
            display: { xs: 'none', sm: 'block' },
            fontSize: { xs: '.8rem', sm: '.9rem' },
            pl: { xs: 0, sm: 0.5 },
          }}
        >
          Like
        </Typography>
      </Button>

      {isUsersShelf() ? (
        <>
          <Button size="small" color="error" sx={{ px: 0.5, minWidth: 20 }}>
            <DeleteOutlineIcon sx={{ fontSize: 20 }} />
            <Typography
              sx={{
                display: { xs: 'none', sm: 'block' },
                fontSize: { xs: '.8rem', sm: '.9rem' },
              }}
            >
              Delete Shelf
            </Typography>
          </Button>
          <Button size="small" sx={{ px: 0.5, minWidth: 20 }}>
            <EditIcon sx={{ fontSize: 20 }} />
            <Typography
              sx={{
                display: { xs: 'none', sm: 'block' },
                fontSize: { xs: '.8rem', sm: '.9rem' },
              }}
            >
              Edit Shelf
            </Typography>
          </Button>
        </>
      ) : (
        <>
          <Button
            size="small"
            sx={{ px: 0.5, minWidth: 20 }}
            onClick={handleFavoriteShelfToggle}
          >
            <FavoriteBorderIcon sx={{ fontSize: 20 }} />
            <Typography
              sx={{
                display: { xs: 'none', sm: 'block' },
                fontSize: { xs: '.8rem', sm: '.9rem' },
                pl: { xs: 0, sm: 0.5 },
              }}
            >
              Favorite
            </Typography>
          </Button>
        </>
      )}
    </Box>
  );
}
