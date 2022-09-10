import React from 'react'

const ErrorSnackbar = ({message}) => {
  return (
    <div className="alert alert-danger">
      {message}
    </div>
  )
}

export default ErrorSnackbar;