import React from 'react';
import styles from '../app/styles/CategoryFilter.module.css';

type CategoryFilterProps = {
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
};

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }: CategoryFilterProps) => {
  const getCategoryTextColorClass = (index: number) => {
    const textColorClasses = [
      styles.categoryTextColor1,
      styles.categoryTextColor2,
      styles.categoryTextColor3,
      styles.categoryTextColor4,
      styles.categoryTextColor5,
    ];
    return textColorClasses[index % textColorClasses.length];
  };

  return (
    <div className={styles.categoryFilter}>
      <button 
        className={`${styles.categoryButton} ${selectedCategory === null ? styles.active : ''}`} 
        onClick={() => onSelectCategory(null)}
      >
        Todos
      </button>
      {categories.map((category, index) => (
        <button 
          key={category} 
          className={`${styles.categoryButton} ${getCategoryTextColorClass(index)} ${selectedCategory === category ? styles.active : ''}`} 
          onClick={() => onSelectCategory(category)}
        >
          {category.replace("-", " ")}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
