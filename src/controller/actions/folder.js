import api from '../../controller/api';

export const FOLDER_SUBMIT = 'FOLDER_SUBMIT';

export const FOLDER_SUCCESS = 'FOLDER_SUCCESS';
export const UPDATE_FOLDER_SUCCESS = 'UPDATE_FOLDER_SUCCESS';

export const FOLDER_ERROR = 'FOLDER_ERROR';

export const FOLDER_DELETE = 'FOLDER_DELETE';

/**
 * Components can consume this function to get all Folders
 * On submit: state.folder.loading === true
 * On success: state.folder.folders === [of folders]
 * On fail: state.folder.error === some error object
 */
export const getFolders = () => dispatch => {
  dispatch(folderSubmit());
  api.folders
    .get()
    .then(folders => dispatch(folderSuccess(folders)))
    .catch(err => dispatch(folderError(err)));
};

/**
 * Components can consume this function to update a Topic
 * On submit: state.topic.loading === true
 * On success: state.topic.topics === [of topics]
 * On fail: state.topic.error === some error object
 * @param {{title: string, id: number}} object
 */
export const updateFolder = (title, id) => dispatch => {
  dispatch(folderSubmit());
  api.folders
    .put({ title, id })
    .then(folder => dispatch(updateFolderSuccess(folder)))
    .catch(err => dispatch(folderError(err)));
};

export const folderSubmit = () => ({
  type: FOLDER_SUBMIT
});

export const folderSuccess = folders => ({
  type: FOLDER_SUCCESS,
  payload: folders
});

export const updateFolderSuccess = folder => ({
  type: UPDATE_FOLDER_SUCCESS,
  payload: folder
});

export const folderError = err => ({
  type: FOLDER_ERROR,
  payload: err
});

export const folderDelete = folderId => {
  return {
    type: FOLDER_DELETE,
    payload: folderId
  };
};
