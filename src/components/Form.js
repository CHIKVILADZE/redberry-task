import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TagInput = () => {
  const [categories, setCategories] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    // Fetch categories from the API
    axios
      .get('https://api.blog.redberryinternship.ge/api/categories')
      .then((response) => {
        setCategories(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handleTagSelect = (category) => {
    if (!selectedTags.find((tag) => tag.id === category.id)) {
      setSelectedTags([...selectedTags, category]);
    }
  };

  const handleRemoveTag = (tagId) => {
    const updatedTags = selectedTags.filter((tag) => tag.id !== tagId);
    setSelectedTags(updatedTags);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ display: 'inline-block' }}>
        <h3>Select Tags:</h3>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          {selectedTags.length === 0 && ( // Placeholder condition
            <div
              style={{
                color: 'gray',
                position: 'absolute',
                top: '50%',
                left: '30%',
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none',
              }}
            >
              აირჩიეთ კატეგორია
            </div>
          )}

          {/* Existing code for selected tags */}
          <div
            onClick={toggleDropdown}
            style={{
              width: '286px',
              height: '44px',
              cursor: 'pointer',
              paddingRight: '20px',
              border: '1px solid #E4E3EB',
              borderRight: 'none',
              backgroundColor: '#F7F7FF',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
              gap: '3px',
              flexWrap: 'nowrap',
              overflow: 'hidden',
            }}
          >
            {selectedTags.map((tag) => (
              <div
                key={tag.id}
                style={{
                  backgroundColor: tag.background_color,
                  color: tag.text_color,
                  padding: '8px 16px',
                  height: '80%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                {tag.title} {''}
                <img
                  src="/assets/close.png"
                  alt="close"
                  onClick={() => handleRemoveTag(tag.id)}
                />
              </div>
            ))}
            <div
              style={{
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid #E4E3EB',
                borderLeft: 'none',
                left: '286px',
                width: '44px',
                height: '44px',
                borderRadius: '0px 10px 10px 0px',
                background: '#F7F7FF',
              }}
            >
              <img
                src={'/assets/arrow-down.png'}
                alt="arrow-down"
                onClick={toggleDropdown}
              />
            </div>
          </div>

          {dropdownVisible && (
            <div
              style={{
                position: 'absolute',
                top: '50px',
                left: '0',
                width: '328px',
                borderRadius: '12px',
                border: '1px solid #E4E3EB',
                background: '#FFF',
                boxShadow: '2px 4px 8px 0px rgba(0, 0, 0, 0.08)',
                padding: '10px',
                zIndex: '1',
              }}
            >
              {categories.map((category) => (
                <button
                  key={category.id}
                  style={{
                    backgroundColor: category.background_color,
                    color: category.text_color,
                    padding: '5px 10px',
                    margin: '5px',
                    borderRadius: '5px',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleTagSelect(category)}
                >
                  {category.title}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TagInput;
