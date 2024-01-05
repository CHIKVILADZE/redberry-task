import { useState, useContext, useEffect } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import SuccessModal from '../components/SuccessModal';
import { useForm } from 'react-hook-form';
import CategoryInputTag from '../components/CategoryInputTag';
import UploadImage from '../components/UploadImage';
import axios from 'axios';
import { TokenContext } from '../context/TokenProvider';

const AddBlogs = () => {
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState('No selected file');
  const [author, setAuthor] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDesc] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [categories, setCategories] = useState([]);

  const { token } = useContext(TokenContext);

  const [errorsAuthor, setErrorsAuthor] = useState({
    minLength: false,
    hasNoSpace: false,
    isGeorgian: false,
  });
  const [errorTitle, setErrorTitle] = useState({
    minLength: false,
  });
  const [errorDesc, setErrorDesc] = useState({
    minLength: false,
  });

  useEffect(() => {
    axios
      .get('https://api.blog.redberryinternship.ge/api/categories')
      .then((response) => {
        setCategories(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const validateAuthor = (value) => {
    const hasNoSpace = !value.includes(' ');
    const isGeorgian = /^[ა-ჰ\s]+$/.test(value);
    const isFourCharacters = value.length < 4;

    setErrorsAuthor({
      minLength: isFourCharacters,
      hasNoSpace: hasNoSpace,
      isGeorgian: !isGeorgian,
    });

    return !isFourCharacters && !hasNoSpace && isGeorgian;
  };

  const validateTitle = (value) => {
    const isFourCharacters = value.length < 4;

    setErrorTitle({
      minLength: isFourCharacters,
    });

    return !isFourCharacters;
  };

  const validateDesc = (value) => {
    const isFourCharacters = value.length < 4;

    setErrorDesc({
      minLength: isFourCharacters,
    });

    return !isFourCharacters;
  };

  const getClassName = (
    errorConditionAuthor,
    errorConditionTitle,
    errorConditionDesc
  ) => {
    if (!submitted) {
      return 'validate text-secondary';
    } else if (
      errorConditionAuthor ||
      errorConditionTitle ||
      errorConditionDesc
    ) {
      return 'validate text-danger';
    } else if (
      author &&
      !errorsAuthor.minLength &&
      !errorsAuthor.hasNoSpace &&
      !errorsAuthor.isGeorgian
    ) {
      return 'success';
    } else if (title && errorTitle.minLength) {
      return 'success';
    } else if (description && errorDesc.minLength) {
      return 'success';
    }
    return 'success';
  };

  const handleInputChange = (value) => {
    setAuthor(value);
    validateAuthor(value);
  };

  const handleChangeTitle = (value) => {
    setTitle(value);
    validateTitle(value);
  };

  const handleChangeDesc = (value) => {
    setDesc(value);
    validateDesc(value);
  };

  const onSubmit = async () => {
    setSubmitted(true);

    const isValid = validateAuthor(author);
    const isValidTitle = validateTitle(title);
    const isValidDesc = validateDesc(description);
    const categoryIds = selectedTags.map((tag) => tag.id);

    if (isValid && isValidTitle && isValidDesc) {
      try {
        const formData = new FormData();
        formData.append('image', image); // Append the file object directly
        formData.append('author', author);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('publish_date', document.querySelector('.date').value);
        formData.append('categories', JSON.stringify(categoryIds));
        formData.append(
          'email',
          document.querySelector('input[type=email]').value
        );

        const response = await axios.post(
          'https://api.blog.redberryinternship.ge/api/blogs',
          formData,
          {
            headers: {
              accept: 'application/json',
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
              'access-control-allow-origin': '*',
            },
          }
        );

        if (response.status === 204) {
          console.log('formDataaa', formData);
          console.log('Blog submitted successfully with status 204');
          console.log('Hello', response);
        } else if (response.status === 200) {
          console.log('formDataaa', formData);
          console.log('Blog submitted successfully with status 200');
        } else {
          console.log('Failed to submit blog:', response.statusText);
          console.log('formDataaa', formData);
          // Handle other status codes accordingly
        }
      } catch (error) {
        console.error('Error submitting blog:', error);

        // Handle error cases
      }
    } else {
      console.log('Invalid data');
      // Handle invalid data cases
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm();

  return (
    <div
      className="d-flex justify-content-center w-100"
      style={{ backgroundColor: '#F4F3FF' }}
    >
      <div className="border border-black w-50 d-flex flex-column gap-3">
        <h2
          className="font"
          style={{
            fontWeight: 'bold',
          }}
        >
          ბლოგის დამატება
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="border border-warning mt-2 ">
            <UploadImage
              image={image}
              setImage={setImage}
              fileName={fileName}
              setFileName={setFileName}
            />
          </div>
          <div className=" d-flex gap-4 border border-warning mt-4">
            <div className="w-50 d-flex flex-column border border-primary ">
              <h5 style={{ fontWeight: 'bold' }}>ავტორი *</h5>

              <input
                type="text"
                placeholder="ავტორი"
                className={
                  (errorsAuthor.minLength && isSubmitted) ||
                  (errorsAuthor.hasNoSpace && isSubmitted) ||
                  (errorsAuthor.isGeorgian && isSubmitted)
                    ? 'invalidInputs'
                    : 'validInputs'
                }
                value={author}
                onChange={(e) => handleInputChange(e.target.value)}
              />

              <span className={getClassName(errorsAuthor.minLength)}>
                <i className="bi bi-dot"></i> მინიმუმ 4 სიმბოლო
              </span>

              <span className={getClassName(errorsAuthor.hasNoSpace)}>
                <i className="bi bi-dot"></i> მინიმუმ ორი სიტყვა
              </span>

              <span className={getClassName(errorsAuthor.isGeorgian)}>
                <i className="bi bi-dot"></i> მხოლოდ ქართული სიმბოლოები
              </span>
            </div>
            <div className="w-50 d-flex flex-column border border-primary ">
              <h5 style={{ fontWeight: 'bold' }}>სათაური *</h5>
              <input
                type="text"
                value={title}
                placeholder="შეიყვანეთ სათაური"
                className={
                  errorTitle.minLength ? 'invalidInputs' : 'validInputs'
                }
                onChange={(e) => handleChangeTitle(e.target.value)}
              />

              <span className={getClassName(errorTitle?.minLength)}>
                <i className="bi bi-dot"></i> მინიმუმ 4 სიმბოლო
              </span>
            </div>
          </div>
          <div className="d-flex flex-column mt-4">
            <h5 style={{ fontWeight: 'bold' }}>აღწერა *</h5>
            <textarea
              name="description"
              id="description"
              placeholder="შეიყვანეთ აღწერა"
              cols="30"
              rows="10"
              value={description}
              className={errorDesc.minLength ? 'invalidInputs' : 'validInputs'}
              onChange={(e) => handleChangeDesc(e.target.value)}
            ></textarea>
            <span className={getClassName(errorDesc?.minLength)}>
              <i className="bi bi-dot"></i> მინიმუმ 4 სიმბოლო
            </span>
          </div>
          <div className=" d-flex gap-4 border border-warning mt-4">
            <div className="w-50 d-flex flex-column border border-primary ">
              <h5 style={{ fontWeight: 'bold' }}>გამოქვეყნების თარიღი *</h5>
              <input type="date" className="date form-control" />
            </div>
            <div className="w-50 d-flex flex-column border border-primary ">
              <h5 style={{ fontWeight: 'bold' }}>კატეგორია *</h5>
              <CategoryInputTag
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
                categories={categories}
              />
            </div>
          </div>
          <div>
            <div className="w-50 d-flex flex-column border mt-4">
              <h5 style={{ fontWeight: 'bold' }}>ელ-ფოსტა</h5>
              <input
                type="email"
                className={errors.email ? 'invalidInputs' : 'validInputs'}
                placeholder="Example@redberry.ge"
                {...register('email', {
                  required: 'მეილი სავალდებულოა',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@redberry\.ge$/,
                    message: 'მეილი უნდა მთავრდებოდეს @redberry.ge-ით',
                  },
                })}
              />

              {errors.email && (
                <span className="validate text-danger fs-6">
                  <img src="/assets/errorIcon.png" alt="error" /> &nbsp;
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="w-100 d-flex justify-content-end ">
              <div className="w-50 d-flex flex-column border mt-4 ">
                <button type="submit">submit </button>
                <SuccessModal />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlogs;
