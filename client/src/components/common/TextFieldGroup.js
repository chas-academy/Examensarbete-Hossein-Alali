import React from 'react';
import classnames from 'classnames';

const TextFieldGroup = ({
  name,
  placeholder,
  value,
  label,
  info,
  error,
  type,
  onChange,
  disabled
}) => {
  return (
    <div className='form-group'>
      <input
        type={type}
        className={classnames('form-control form-control-lg', {
          'is-invalid': error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        label={label}
        onChange={onChange}
        disabled={disabled}
      />
      {info && <small className='form-text text-muted'>{info}</small>}
      {/* if errors is trigered show this invalid feedback message through div */}
      {error && <div className='invalid-feedback'>{error}</div>}
    </div>
  );
};

export default TextFieldGroup;
