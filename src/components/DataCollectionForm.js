function DataCollectionForm({name, title, btnCaption, btnEnabled, onSubmit, children}) {
  return (
    <main className="content">
      <div className={`data data_type_${name} data_opened`}>
        <div className="data__conteiner">
          <h2 className="data__title">{title}</h2>
          <form onSubmit={btnEnabled ? onSubmit : undefined} className="data-form" name={name} noValidate>
            {children}
            <button
              type="submit"
              disabled={!btnEnabled}
              className={`data__submit-btn ${!btnEnabled ? 'data__submit-btn_inactive': ''}`}>
              {btnCaption}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default DataCollectionForm;
