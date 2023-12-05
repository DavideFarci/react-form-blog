import { useState } from 'react';

function App() {
  const [postList, setPostList] = useState([]);
  const initialData = {
    id: '',
    title: '',
  };

  const [formValues, setFormValues] = useState(initialData);

  const createPost = (newValue, fieldName) => {
    const newFormValue = { ...formValues };

    newFormValue[fieldName] = newValue;

    setFormValues(newFormValue);
  };

  const removePost = (postToRemove) => {
    setPostList(postList.filter((post) => post.id !== postToRemove));
  };

  const handleFormSubmit = (e) => {
    // Per evitare il refresh
    e.preventDefault();

    setPostList([
      ...postList,
      {
        ...formValues,
        id: crypto.randomUUID(),
        title: formValues.title,
      },
    ]);

    // reset input
    setFormValues(initialData);
  };

  return (
    <>
      <h1 className="py-8 text-center text-3xl font-bold">Post Create</h1>
      <form
        onSubmit={handleFormSubmit}
        className="mx-auto flex max-w-xl flex-col"
      >
        <label htmlFor="title" className="font-semibold">
          Titolo del post
        </label>
        <input
          value={formValues.title}
          onChange={(e) => createPost(e.target.value, 'title')}
          type="text"
          name="title"
          className="mb-2 w-full rounded-md border-2 p-2"
        />

        <button
          type="submit"
          className="mt-8 self-center rounded-md bg-blue-600 px-4 py-2 text-white "
        >
          Crea il Post
        </button>
      </form>

      <ul>
        {postList.map((post) => {
          return (
            <li className="flex justify-between px-4" key={post.id}>
              <span>{post.title}</span>
              <span
                onClick={() => removePost(post.id)}
                className="font-bold hover:cursor-pointer"
              >
                X
              </span>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default App;
