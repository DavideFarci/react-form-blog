import { useState } from 'react';

function App() {
  const [postList, setPostList] = useState([]);
  const initialData = {
    id: '',
    title: '',
  };

  const [formValues, setFormValues] = useState(initialData);
  const [editValues, setEditValues] = useState(initialData);
  const [toggleEdit, setToggleEdit] = useState(false);

  const createPost = (newValue, fieldName) => {
    const newFormValue = { ...formValues };

    newFormValue[fieldName] = newValue;

    setFormValues(newFormValue);
  };

  const updatePost = (newValue, fieldName) => {
    const newEditValue = { ...editValues };

    newEditValue[fieldName] = newValue;

    setEditValues(newEditValue);
  };

  const openFormAndSetValueEdit = (postToUpdate) => {
    setToggleEdit(true);

    setEditValues(postToUpdate);

    // setToggleEdit(false);
  };

  const removePost = (postToRemove) => {
    setPostList(postList.filter((post) => post.id !== postToRemove));
  };

  // Funzione per submit del form
  const handleFormCreateSubmit = (e) => {
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

  const handleFormEditSubmit = (e) => {
    e.preventDefault();

    setPostList(
      postList.map((post) => (post.id == editValues.id ? editValues : post)),
    );

    setToggleEdit(false);

    setEditValues(initialData);
  };

  return (
    <>
      <h1 className="py-8 text-center text-3xl font-bold">Post Create</h1>
      <form
        onSubmit={handleFormCreateSubmit}
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
          className="mb-2 w-full rounded-md border-2 p-2 text-black"
        />

        <button
          type="submit"
          className="mt-8 self-center rounded-md bg-blue-600 px-4 py-2 text-white "
        >
          Crea il Post
        </button>
      </form>

      <h2 className="px-8 py-8 text-2xl font-bold">Posts List</h2>
      {/* Form per modifica post  */}
      <form
        onSubmit={handleFormEditSubmit}
        className={`${!toggleEdit && 'hidden'} px-8 py-8`}
      >
        <label htmlFor="title" className="font-semibold">
          Titolo del post
        </label>
        <input
          value={editValues.title}
          onChange={(e) => updatePost(e.target.value, 'title')}
          type="text"
          name="title"
          className="mb-2 w-full rounded-md border-2 p-2 text-black"
        />

        <button
          type="submit"
          className="rounded-md bg-orange-500 px-4 py-1 text-sm font-semibold"
        >
          Modifica
        </button>
      </form>
      <ul>
        {postList.map((post, i) => {
          return (
            <li className="mb-3 flex justify-between pl-4 pr-40" key={post.id}>
              <span>
                {i}. {post.title}
              </span>
              <div>
                <span
                  onClick={() => openFormAndSetValueEdit(post)}
                  className="mr-4 rounded-md bg-orange-400 px-2 py-1 text-sm font-semibold hover:cursor-pointer"
                >
                  Edit
                </span>
                <span
                  onClick={() => removePost(post.id)}
                  className="font-bold hover:cursor-pointer"
                >
                  X
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default App;
