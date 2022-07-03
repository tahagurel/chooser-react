import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setOrder, changeOrder, resetSearchData } from '../store/slices/comparisonSlice';

function TitleAndOrder({ title }) {
  const [order, setOrderVal] = useState('high');

  const orders = [{
    label: 'Öne Çıkanlar',
    value: 'high',
  }, {
    label: 'Oy Sayısı (en çok)',
    value: 'vote_up',
  }, {
    label: 'Oy Sayısı (en az)',
    value: 'vote_down',
  }, {
    label: 'Yorum Sayısı (en çok)',
    value: 'comment_up',
  }, {
    label: 'Yorum Sayısı (en az)',
    value: 'comment_down',
  }, {
    label: 'Eklenme Tarihi (en yeni)',
    value: 'date_up',
  }, {
    label: 'Eklenme Tarihi (en eski)',
    value: 'date_down',
  },

  ];

  const selectedOptionLabel = orders.find((x) => x.value === order).label;

  const dispatch = useDispatch();

  function changeOrderFn(val) {
    setOrderVal(val.value);
    dispatch(setOrder(val.value));
    dispatch(changeOrder());
  }

  useEffect(() => {
    dispatch(resetSearchData());
  }, []);

  return (
    <div className="row">
      <div className="d-flex justify-content-between">
        <h1 className="display-6 py-1">
          {title || selectedOptionLabel }
        </h1>
        <div className="form-group align-self-center col-5 col-md-2">
          <select onChange={(e) => changeOrderFn(e.target)} value={order} className="form-control form-control-sm">
            {orders.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>
      <hr className="row" />
    </div>
  );
}

export default TitleAndOrder;
