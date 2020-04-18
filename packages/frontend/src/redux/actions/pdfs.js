import Firebase, { Collections} from '../../SandboxFirebase.js';
import { CREATE_PDF_SUCCESS, CREATE_PDF_FAIL} from '../constants/ActionTypes'

export const createPDFSuccess = (resp) => {
  return {
    type: CREATE_PDF_SUCCESS,
    pdf: resp
  }
}

export const createPDFFail = (error) => {
  return {
    type: CREATE_PDF_FAIL,
    error
  }
}

export const createPDF = newPDF => (dispatch, getState) => {
  const { html, css } = getState();
  Firebase.firestore().collection(Collections.pdfs).add(newPDF)
    .then((resp) => dispatch(createPDFSuccess))
    .catch((resp) => dispatch(createPDFFail))
};