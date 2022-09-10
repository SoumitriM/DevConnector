const formatDate = (date) => {
  const newDate = date.slice(0, 10).replaceAll('-', '/');
  return newDate;
}

export default formatDate;