function AppButton({
  label, btnClass, divClass, loading, loadingClass, loadingLabel, disabled, onClick, icon,
}) {
  return (
    <div className={divClass}>
      <button disabled={disabled || loading} onClick={onClick} type="button" className={`btn ${btnClass}`}>
        {!loading
        || <div className={`${loadingClass} spinner-border spinner-border-sm me-1`} role="status" />}
        { (loading && loadingLabel) ? loadingLabel
          : (
            <div className="d-inline">
              <i className={`bi ${icon}`} />
              {label}
            </div>
          )}
      </button>
    </div>
  );
}

AppButton.defaultProps = {
  loadingClass: 'text-white',
};

export default AppButton;
