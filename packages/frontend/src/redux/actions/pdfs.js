import Firebase, { Collections} from '../../SandboxFirebase.js';
import { nanoid } from 'nanoid'
import { CREATE_PDF_SUCCESS, CREATE_PDF_FAIL, SET_HTML, SET_CSS, SET_CREATING_PDF, FETCH_PDF_SUCCESS, SET_FETCHING_PDF, SET_NAME} from '../constants/ActionTypes'
import { push } from 'connected-react-router';
import { matchPath } from 'react-router';

export const createPDFSuccess = (resp) => {
  return {
    type: CREATE_PDF_SUCCESS,
    creating: false,
    pdf: resp
  }
}

export const createPDFFail = (error) => {
  return {
    type: CREATE_PDF_FAIL,
    creating: false,
    error
  }
}

export const setSaving = () => ({
  type: SET_CREATING_PDF,
  creating: true
})

export const setHTML = (html) => ({
    type: SET_HTML,
    payload: html
})

export const setCSS = (css) => ({
    type: SET_CSS,
    payload: css
})

export const setFetching = () => ({
  type: SET_FETCHING_PDF
})

export const fetchPDFSuccess = (pdf) => ({
  type: FETCH_PDF_SUCCESS,
  payload: pdf
})

export const setName = (name) => ({
  type: SET_NAME,
  payload: name
})

export const fetchPDF = id => async (dispatch, getState) => {
  console.log('trying to fetch pdf')
  dispatch(setFetching());
  console.log('trying to fetch pdf')
  const pdf = await Firebase.firestore().collection(Collections.pdfs).doc(id).get();
  dispatch(fetchPDFSuccess(pdf));
}

export const savePDF = newPDF => async (dispatch, getState) => {
  dispatch(setSaving());

  const { html, css, pdf, name } = getState().pdfs;

  const {
      params
    } = matchPath(getState().router.location.pathname, {
      path: '/:id',
      exact: true,
      strict: false
    }) || { params: {} };

    if (!params.id) {
      const ref = Firebase.firestore().collection(Collections.pdfs).doc(nanoid(10));
      try {
        await ref.set({
          html,
          css,
          name
        })
        const pdf = await ref.get();
        dispatch(fetchPDFSuccess(pdf));
        window.location.assign(`/${pdf.id}`);
      } catch (err) {
        dispatch(createPDFFail())
      }
    } else {
      await pdf.ref.update({
        html,
        css,
        name
      })
      const updated = await pdf.ref.get();
      dispatch(fetchPDFSuccess(updated));
    }
};