import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getSearch } from '../../store/slices/searchSlice';

function SearchInput() {
  const [searchTerm, setSearchTerm] = useState('');
  const [inputRef, setİnputRef] = useState('');
  const [toggleSearchResult, setToggleSearchResult] = useState(false);
  const loading = useSelector((state) => state.search.loading);
  const searchResult = useSelector((state) => state.search.results);
  const dispatch = useDispatch();

  const [searchStart, setSearchStart] = useState(false);

  function clearInput() {
    setSearchTerm('');
    inputRef.focus();
  }
  const navigate = useNavigate();

  function closeResult() {
    setTimeout(() => {
      setToggleSearchResult(false);
    }, 100);
  }

  const goComparison = (slug) => {
    setToggleSearchResult(false);
    setSearchTerm('');
    navigate((`/karsilasma/${slug}`));
  };

  useEffect(() => {
    if (searchTerm.length > 3) {
      setSearchStart(true);
    }
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.length > 3) {
        const formData = {
          keyword: searchTerm,
        };
        dispatch(getSearch(formData));
        setSearchStart(false);
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <div className="searcher-input">
      <div className="input-group">
        <input
          ref={(input) => { setİnputRef(input); }}
          className="form-control form-control-dark"
          type="text"
          onFocus={() => setToggleSearchResult(true)}
          onBlur={() => closeResult()}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Karşılaşma Ara.."
        />
        {!searchTerm
        || (
        <button onClick={() => clearInput()} className="btn btn-outline-secondary rounded-0" type="button">
          <i className="bi bi-x-lg text-white" />
        </button>
        )}

      </div>
      {!toggleSearchResult
      || (
      <ul className="list-group searcher shadow">
        {searchTerm.length < 4
          ? (
            <li className="list-group-item list-group-item-warning">
              Arama için en az 4 harf gerekli
            </li>
          )
          : (searchStart || loading)
            ? (
              <li className="list-group-item list-group-item-warning">
                <div className="spinner-border spinner-border-sm me-1" role="status" />
                Yükleniyor
              </li>
            )
            : searchResult.length
              ? searchResult.map((comparison) => (
                <button
                  type="button"
                  onClick={() => goComparison(comparison.slug)}
                  key={comparison.id}
                  className="list-group-item list-group-item-action"
                >
                  {comparison.title}
                </button>
              ))
              : (
                <li className="list-group-item list-group-item-danger">
                  Sonuç Bulunamadı.
                </li>
              ) }
      </ul>
      )}
    </div>
  );
}

export default SearchInput;
