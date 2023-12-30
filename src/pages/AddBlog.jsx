import { useState, useRef } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import SuccessModal from '../components/SuccessModal';

const AddBlogs = () => {
  const [files, setFiles] = useState(null);
  const inputRef = useRef();

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setFiles(event.dataTransfer.files);
  };

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

  if (files)
    return (
      <div className="uploads">
        <ul>
          {Array.from(files).map((file, idx) => (
            <li key={idx}>{file.name}</li>
          ))}
        </ul>
        <div className="actions">
          <button onClick={() => setFiles(null)}>Cancel</button>
          <button onClick={handleUpload}>Upload</button>
        </div>
      </div>
    );

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
        <form>
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
                    style={{ fontWeight: 'bold', textDecoration: 'underline' }}
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
                placeholder="შეიყვანეთ ავტორი"
                className="author form-control d-flex align-items-center rounded-3 "
              />
              <span className="validate">
                {' '}
                <i class="bi bi-dot"></i>მინიმუმ 4 სიმბოლო
              </span>
              <span className="validate">
                {' '}
                <i class="bi bi-dot"></i>მინიმუმ ორი სიტყვა
              </span>
              <span className="validate">
                {' '}
                <i class="bi bi-dot"></i> მხოლოდ ქართული სიმბოლოები
              </span>
            </div>
            <div className="w-50 d-flex flex-column border border-primary ">
              <h5 style={{ fontWeight: 'bold' }}>სათაური *</h5>
              <input
                type="text"
                placeholder="შეიყვანეთ სათაური"
                className="title form-control d-flex align-items-center rounded-3 "
              />
              <span className="validate">მინიმუმ 2 სიმბოლო</span>
            </div>
          </div>
          <div className="d-flex flex-column mt-4">
            <h5 style={{ fontWeight: 'bold' }}>აღწერა *</h5>
            <textarea
              style={{ resize: 'none', border: ' 1px solid #E4E3EB;' }}
              name=""
              placeholder="შეიყვანეთ აღწერა"
              id=""
              cols="30"
              rows="10"
              className="w-100 h-124 border rounded-4 p-2 form-control"
            ></textarea>
            <span className="validate">მინიმუმ 2 სიმბოლო</span>
          </div>
          <div className=" d-flex gap-4 border border-warning mt-4">
            <div className="w-50 d-flex flex-column border border-primary ">
              <h5 style={{ fontWeight: 'bold' }}>გამოქვეყნების თარიღი *</h5>
              <input
                type="date"
                className="date form-control"
                placeholder="12/12/23s"
              />
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
                className="email p-2 form-control"
                placeholder="Example@redberry.ge"
              />
            </div>
            <div className="w-100 d-flex justify-content-end ">
              <div className="w-50 d-flex flex-column border mt-4 ">
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
