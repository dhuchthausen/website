import React, { FC } from "react";
import { Link, navigate } from "gatsby";
import { Category } from "../../types/category";
import Icon from "../Icon";

type Props = {
  category: Category
};

const CategoryCard: FC<Props> = ({ category}) => {
  const to = "/plugins/categories/" + category.name + "/";
  return (
    <div className="column is-4">
      <div className="pointer card has-full-height" onClick={e => navigate(to)}>
        <div className="card-content">
          <Link to={to}>
            <h3 className="card-header-title has-text-link">
              <Icon
                icon={category.icon}
                size="2x"
                className="icon spacing-right"
              />
              {category.displayName}
            </h3>
          </Link>
          <p className="subtitle">{category.description}</p>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
