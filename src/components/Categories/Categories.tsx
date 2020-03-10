import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCategories } from '../../store/selectors';
import { loadCategories } from '../../store/features/categoriesSlice';

import classes from './categories.module.css';

const cardColors = ['coral', 'teal', 'turquoise', 'purple', 'tomato', 'gold', 'mediumvioletred'];

const Categories: React.FC = () => {
  const categories = useSelector(selectCategories);
  const dispatch = useDispatch();

  useEffect(() => dispatch<any>(loadCategories()), [dispatch]);

  return (
    <section className={classes.container}>
      <div className={classes.content}>
        {categories.slice(0, 12).map((c, i) => (
          <div
            className={classes.card}
            style={{ background: cardColors[i % cardColors.length] }}
            key={c.idCategory}
          >
            <figure className={classes.imageContainer}>
              <img src={c.strCategoryThumb} className={classes.image} alt={c.strCategory} />
              <figcaption className={classes.label}>{c.strCategory}</figcaption>
            </figure>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
