import { useState, useRef } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import SuccessModal from '../components/SuccessModal';
import { useForm } from 'react-hook-form';
import Form from '../components/Form';

const AddBlogs = () => {
  const [files, setFiles] = useState(null);
  const inputRef = useRef();

  const [author, setAuthor] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

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
    } else if (desc && errorDesc.minLength) {
      return 'success';
    }
    return 'success';
  };

  const handleInputChange = (value) => {
    setAuthor(value);
    validateAuthor(value);
    // setTitle(value);
    // validateTitle(value);
  };

  const handleChangeTitle = (value) => {
    setTitle(value);
    validateTitle(value);
  };

  const handleChangeDesc = (value) => {
    setDesc(value);
    validateDesc(value);
  };

  const onSubmit = (e) => {
    // e.preventDefault();
    setSubmitted(true);

    const isValid = validateAuthor(author);
    const isValidTitle = validateTitle(title);
    const isValidDesc = validateDesc(desc);

    if (isValid && isValidTitle && isValidDesc) {
      // Handle form submission - valid data
      console.log('Form submitted:', author, title, desc);
    } else {
      // Handle form submission - invalid data
      console.log('Invalid data');
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setFiles(event.dataTransfer.files);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm();

  // send files to the server // learn from my other video
  const handleUpload = () => {
    const formData = new FormData();
    formData.append('Files', files);
    console.log(formData.getAll());
    // fetch(
    //   "link", {
    //     method: "POST",
    //     body: formData
    //   }
    // )
  };

  // if (files)
  //   return (
  //     <div className="uploads">
  //       <ul>
  //         {Array.from(files).map((file, idx) => (
  //           <li key={idx}>{file.name}</li>
  //         ))}
  //       </ul>
  //       <div className="actions">
  //         <button onClick={() => setFiles(null)}>Cancel</button>
  //         <button onClick={handleUpload}>Upload</button>
  //       </div>
  //     </div>
  //   );
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
            <h5 style={{ fontWeight: 'bold' }} className="mb-2">
              ატვირთეთ ფოტო
            </h5>
            <div
              style={{
                border: '2px dashed #85858D',
                height: '220px',
              }}
            >
              <div
                className="d-flex flex-column justify-content-center align-items-center  border p-4 rounded-4 h-100 "
                style={{
                  background: '#F4F3FF',
                }}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  multiple
                  onChange={(event) => setFiles(event.target.files)}
                  hidden
                  accept="image/png, image/jpeg"
                  ref={inputRef}
                />
                <button
                  onClick={() => inputRef.current.click()}
                  style={{
                    border: 'none',
                    background: '#F4F3FF',
                  }}
                >
                  <img src="/assets/upload.png" alt="upload" />
                </button>
                <h5 className="mt-4">
                  ჩააგდეთ ფაილი აქ ან{' '}
                  <span
                    style={{
                      fontWeight: 'bold',
                      textDecoration: 'underline',
                      cursor: 'pointer',
                    }}
                    onClick={() => inputRef.current.click()}
                  >
                    აირჩიეთ ფაილი
                  </span>{' '}
                </h5>
              </div>
            </div>
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
              name="desc"
              id="desc"
              placeholder="შეიყვანეთ აღწერა"
              cols="30"
              rows="10"
              value={desc}
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
              <input
                type="text"
                placeholder="აირჩიეთ კატეგორია"
                className="category form-control"
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
                  // required: 'მეილი აუცილებელია',
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
