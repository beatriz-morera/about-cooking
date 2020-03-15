import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectFeatured } from "../../store/selectors";
import { loadFeatured } from "../../store/features/featuredSlice";

import Card from "../../components/Card";

const Featured: React.FC = () => {
  const featured = useSelector(selectFeatured);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch<any>(loadFeatured());
  }, [dispatch]);

  return <>{featured && <Card recipe={featured} key={featured.idMeal} />}</>;
};

export default Featured;
