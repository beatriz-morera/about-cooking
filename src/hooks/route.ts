import { useCallback, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

export function useRoute() {
  const history = useHistory();
  const location = useLocation();
  const lastPath = useRef();

  const push = useCallback(
    (path) => {
      if (path !== location.pathname && path !== lastPath.current) {
        lastPath.current = path;
        history.push(path);
      }
    },
    [location, history, lastPath]
  );

  return { push };
}
