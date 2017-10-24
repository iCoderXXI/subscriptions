import React from 'react';

import './ListComponent.css';

const headers = [
  {
    name: `id`,
    label: `ID`,
  },
  {
    name: `email`,
    label: `E-Mail`,
  },
  {
    name: `name`,
    label: `Имя`,
  },
  {
    name: `dateTime`,
    label: `Дата подписки`,
  },
  {
    name: `subscriptionType`,
    label: `Тип подписки`,
  }
];


const coverHandler = (handler, id) => () => { handler(id) };

const generateRow = (row, deleteHandler) => (
  <tr key={row.id}>
    {
      headers.map( h => (
        <td key={h.name}>{row[h.name]}</td>
      ))
    }
    <td>
      <button onClick={coverHandler(deleteHandler, row.id)}>&times;</button>
    </td>
  </tr>
)

export default (props) => {
  console.log(props);
  return (
    <div className="list">
      <table>
        <thead>
          { headers.map( h => (<td key={h.name}>{h.label}</td>)) }
          <td>Действия</td>
        </thead>
        <tbody>
          { props.data ? props.data.map(row => generateRow(row, props.deleteHandler)) : null }
        </tbody>
      </table>
    </div>
  )
}
