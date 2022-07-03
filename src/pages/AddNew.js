import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CreatableSelectBox from '../components/CreateableSelectBox';
import { getCategories } from '../store/slices/categorySlice';
import { getItems } from '../store/slices/itemSlice';
import { createComparison } from '../store/slices/comparisonSlice';
import AppButton from '../components/AppButton';

function AddNew() {
  const isLogin = useSelector((state) => state.auth.isLogin);
  const loading = useSelector((state) => state.auth.loading);

  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isLogin) {
      navigate('/');
    }
  }, [loading]);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');

  const [itemType, setItemType] = useState({
    newFirstItem: false,
    newSecondItem: false,
  });

  const [newFirstItemData, setNewFirstItemData] = useState({
    id: '',
    name: '',
    image: '',
  });
  const [newSecondItemData, setNewSecondItemData] = useState({
    id: '',
    name: '',
    image: '',
  });

  const dispatch = useDispatch();

  function createComparisonFunc() {
    const formData = new FormData();
    formData.append('comparison_title', title);
    formData.append('category_id', category);
    if (newFirstItemData.id) formData.append('first_item_id', newFirstItemData.id);
    if (newFirstItemData.name)formData.append('first_item_name', newFirstItemData.name);
    if (newFirstItemData.image) formData.append('first_item_image', newFirstItemData.image);
    if (newSecondItemData.id) formData.append('second_item_id', newSecondItemData.id);
    if (newSecondItemData.name) formData.append('second_item_name', newSecondItemData.name);
    if (newSecondItemData.image) formData.append('second_item_image', newSecondItemData.image);

    dispatch(createComparison(formData));
  }

  const categories = useSelector((state) => state.category.categories);
  const items = useSelector((state) => state.item.items);
  const loadingCreateComparison = useSelector((state) => state.comparison.loading);

  function handleFirstItemTypeChange() {
    setItemType({ ...itemType, newFirstItem: !itemType.newFirstItem });
    setNewFirstItemData({ id: '', name: '', image: '' });
  }
  function handleSecondItemTypeChange() {
    setItemType({ ...itemType, newSecondItem: !itemType.newSecondItem });
    setNewSecondItemData({ id: '', name: '', image: '' });
  }

  const isDisabled = ((!newFirstItemData.name || !newFirstItemData.image) && !newFirstItemData.id);
  const isDisabled2 = ((!newSecondItemData.name || !newSecondItemData.image) && !newSecondItemData.id);
  const isDisabled3 = !title || !category;

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getItems());
  }, []);
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Yeni Karşılaşma</h5>
        <hr />
        <div className="form-group mb-3">
          <label className="form-label">
            Karşılaşma Başlığı
          </label>
          <input className="form-control" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="form-group mb-3">
          <label className="form-label">
            Karşılaşma Kategorisi
          </label>
          <CreatableSelectBox items={categories} placeholder="Kategori Seçiniz" selectChange={(val) => setCategory(val?.id)} />
        </div>
        <div className="row">
          <div className="col">

            <div className="form-group">
              <div className="d-flex justify-content-between  mb-2">
                <label className="form-label align-self-end">1. Seçenek</label>
                <button
                  type="button"
                  onClick={() => handleFirstItemTypeChange()}
                  className="btn btn-outline-dark btn-sm  switcher float-end"
                >
                  { !itemType.newFirstItem ? 'Yeni Oluştur' : 'Listeden Seç' }
                </button>
              </div>
              { !itemType.newFirstItem
                ? (
                  <CreatableSelectBox
                    items={items}
                    placeholder="1. Seçenek"
                    selectChange={(val) => setNewFirstItemData({ ...newFirstItemData, id: val?.id ? val.id : '' })}
                  />
                )
                : (

                  <div>
                    <input
                      type="text"
                      className="form-control mb-3"
                      placeholder="Adı"
                      value={newFirstItemData.name}
                      onChange={(e) => setNewFirstItemData({ ...newFirstItemData, name: e.target.value })}
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setNewFirstItemData({ ...newFirstItemData, image: e.target.files[0] })}
                      className="form-control"
                      placeholder="Adı"
                    />
                  </div>
                )}
            </div>
          </div>
          <div className="col">
            <div className="form-group">
              <div className="d-flex justify-content-between  mb-2">
                <label className="form-label align-self-end">2. Seçenek</label>
                <button
                  type="button"
                  onClick={() => handleSecondItemTypeChange()}
                  className="btn btn-outline-dark btn-sm  switcher float-end"
                >
                  { !itemType.newSecondItem ? 'Yeni Oluştur' : 'Listeden Seç' }
                </button>
              </div>
              { !itemType.newSecondItem
                ? (
                  <CreatableSelectBox
                    items={items}
                    placeholder="2. Seçenek"
                    selectChange={(val) => setNewSecondItemData({ ...newSecondItemData, id: val?.id ? val.id : '' })}
                  />
                )
                : (
                  <div>
                    <input
                      type="text"
                      className="form-control mb-3"
                      placeholder="Adı"
                      value={newSecondItemData.name}
                      onChange={(e) => setNewSecondItemData({ ...newSecondItemData, name: e.target.value })}
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setNewSecondItemData({ ...newSecondItemData, image: e.target.files[0] })}
                      className="form-control"
                      placeholder="Adı"
                    />
                  </div>
                )}
            </div>
          </div>

        </div>

        <div className="col mt-5">
          <AppButton
            btnClass="btn-success"
            divClass="d-grid"
            onClick={() => createComparisonFunc()}
            loading={loadingCreateComparison}
            label="Oluştur"
            loadingLabel="Yükleniyor..."
            disabled={(isDisabled || isDisabled2 || isDisabled3) || loadingCreateComparison}
          />
          {/* <button
            type="button"
            disabled={(isDisabled || isDisabled2 || isDisabled3) || loadingCreateComparison}
            className="btn form-control  btn-block btn-success"
            onClick={() => createComparisonFunc()}
          >
            {!loadingCreateComparison
              ? <span>Oluştur</span>
              : <div className="spinner-border spinner-border-sm text-white me-2" role="status" />}
          </button> */}
        </div>
      </div>
    </div>
  );
}

export default AddNew;
