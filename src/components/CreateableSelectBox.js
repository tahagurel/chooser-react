import CreatableSelect from 'react-select';

function CreatableSelectBox(props) {
  const { items, selectChange, placeholder } = props;
  function handleChange(newValue) {
    selectChange(newValue);
  }

  return (
    <CreatableSelect
      instanceId="long-value-select"
      isClearable
      onChange={(value) => handleChange(value)}
      options={items}
      getOptionLabel={(item) => item.name}
      getOptionValue={(item) => item.id}
      placeholder={placeholder}
      noOptionsMessage={() => 'Sonuç Bulunamadı'}
    />
  );
}

export default CreatableSelectBox;
