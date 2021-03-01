
import {useSelector} from "react-redux"

import { useRoute } from '../hooks/route';
import { selectAuth } from '../store/selectors';

export default ({ children }) => {
  const route = useRoute();
  const auth = useSelector(selectAuth)
  const {email} = auth

  if (!email) {
    route.push('/auth');
    window.location.reload()
  }

  return children;
};
