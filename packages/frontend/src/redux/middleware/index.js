export const persistLocalState = (store) => (next) => (action) => {
    if (action.type === 'SET_HTML' || action.type === 'SET_CSS') {
        const { html, css } = store.getState().pdfs;
        localStorage.setItem('state', JSON.stringify({html, css}));
    }
    return next(action);
}