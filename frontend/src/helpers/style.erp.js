export const stylesErp = {
  container: (provided) => ({
    ...provided,
    display: 'block',    
    minHeight: '0.7px',
    textAlign: 'left',
    border: 'none',    
    fontSize: '0.7rem',    

  }),
  control: (provided) => ({
    ...provided,
    border: '1px solid #c1c1c1',
    borderRadius: '0.2rem',
    color: '#4d4d4d',
    minHeight: '1px',
    height: '1.8rem',
    background: '#fff'  

  }),
  input: (provided) => ({
    ...provided,
    minHeight: '1px',
    color: '#4d4d4d',    
    borderRadius: '0.5rem'    
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    Height: '0.5px',
    Width: '0.5px',
    paddingTop: '0',
    paddingBottom: '0',
    color: '#4d4d4d'
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    minHeight: '0px',
    height: '0px'
  }),
  clearIndicator: (provided) => ({
    ...provided,
    minHeight: '0.8px',
    color: '#c1c1c1'
  }),
  valueContainer: (provided) => ({
    ...provided,
    minHeight: '1px',
    height: '20px',
    paddingTop: '0',
    paddingBottom: '0',          
    color: '#000'
  }),
  singleValue: (provided) => ({
    ...provided,
    minHeight: '1px',
    paddingBottom: '0px',
    color: '#4d4d4d',
    fontSize: '0.75rem'    
  }),
};
