export const toTask = (row) => ({
  id: row.id,
  title: row.title,
  done: !!row.done,
});
