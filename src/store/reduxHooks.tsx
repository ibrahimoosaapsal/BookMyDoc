import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from './configureStore';
import {LikeState, RootState, wallData} from '../dto/axios.dto';
import {setTheme} from './slice/Theme/theme.slice';
import {setLike} from './slice/Liked/like.slice';

// --- for dark mode
export function useThemeStore() {
  const res = useSelector((state: RootState) => {
    return state.theme;
  });
  const dispatch = useDispatch<AppDispatch>();
  return {
    theme: res,
    setTheme: (data: boolean) => dispatch(setTheme(data)),
  };
}



// --- for like and unlike
export function useLikeStore() {
  const res = useSelector((state: RootState) => state.like);
  const dispatch = useDispatch<AppDispatch>();

  return {
    likeList: res.likeList,
    likeLoading: res.likeLoading,
    setLike: (data: wallData) => {
      // Check if the ID already exists in the likeList
      const exists = res.likeList.some(item => item.id === data.id);

      if (exists) {
        // Remove the item if it exists
        const updatedList = res.likeList.filter(item => item.id !== data.id);
        dispatch(setLike(updatedList)); // Dispatch the updated list
        console.log(`Item with id ${data.id} removed from the like list.`);
      } else {
        // Add the item if it doesn't exist
        const updatedList = [...res.likeList, data];
        dispatch(setLike(updatedList)); // Dispatch the updated list
        console.log(`Item with id ${data.id} added to the like list.`);
      }
    },
  };
}