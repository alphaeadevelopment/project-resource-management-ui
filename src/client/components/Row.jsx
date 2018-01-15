import React from 'react';

const cellData = (cells) => {
  const arr = [];
  for (var i = 0; i < cells.length; i++) {
    arr.push(i);
  }
}

const Cell = (i) => {
  <td>
    <input type={'text'} />
  </td>
}

export default ({ cells, onLeft, onRight, onUp, onDown }) => {
  return (
    <tr>
      {cellData(cells).map(i => <Cell />)}
    </tr>
  )
}
