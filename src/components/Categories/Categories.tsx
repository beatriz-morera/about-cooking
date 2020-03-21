import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { selectCategories } from "../../store/selectors";
import { loadCategories } from "../../store/features/categoriesSlice";
import LoadImage from "../LazyLoadImage";

import classes from "./Categories.module.css";

const cardColors = [
  "coral",
  "teal",
  "turquoise",
  "purple",
  "tomato",
  "gold",
  "mediumvioletred"
];

const Categories: React.FC = () => {
  const categories = useSelector(selectCategories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch<any>(loadCategories());
  }, [dispatch]);

  return (
    <section className={classes.container}>
      <div className={classes.content}>
        {categories.slice(0, 12).map((c, i) => (
          <Link
            key={c.idCategory}
            to={`/category/${c.strCategory}`}
            style={{ textDecoration: "none" }}
          >
            <div className={classes.card}>
              <div style={{ background: cardColors[i % cardColors.length] }}>
                <figure className={classes.imageContainer}>
                  <LoadImage src={c.strCategoryThumb} alt={c.strCategory} />
                  <figcaption className={classes.label}>
                    {c.strCategory}
                  </figcaption>
                </figure>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Categories;
