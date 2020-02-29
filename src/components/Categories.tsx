import React from 'react';
import { useCategoriesContext } from '../hooks/categories';

import classes from './categories.module.css';

const cardColors = ['coral', 'teal', 'turquoise', 'purple', 'tomato', 'gold', 'mediumvioletred'];

const Categories: React.FC = () => {
  const categories = useCategoriesContext();
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
