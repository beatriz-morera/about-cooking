import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { selectAreas } from '../store/selectors';
import { loadArea } from '../store/features/areasSlice';

import ListRecipes from '../components/List';

const ByAreas: React.FC = () => {
  const { id } = useParams();
  const areas = useSelector(selectAreas);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch<any>(loadArea(id));
  }, [dispatch, id]);

  const area = areas.find(area => area.name === id);

  return <ListRecipes recipes={area.recipes} name={area.name} />;
};

export default ByAreas;
