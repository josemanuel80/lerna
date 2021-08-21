import { useEffect, useState } from 'react';
import { deleteById, newData, putData } from '../lib/fetch.js';
import { Link, useParams } from 'react-router-dom';
import '../style/home.css';
import { fetchData } from '../lib/fetch.js';

export const Home = () => {
  const [item, setItem] = useState([]);

  const listItems = async () => {
    const listed = await fetchData();
    setItem(listed);
    return listed;
  };
  useEffect(() => {
    listItems();
  }, []);

  const [data, setData] = useState({
    data1: '',
    data2: 0,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { data1, data2 } = data;
    if (data1 !== '') {
      const dataCreated = await newData(data1, data2);
      window.location.reload();
      return dataCreated;
    }
  };
  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.currentTarget;
    const allData = { ...data, [name]: value };
    setData(allData);
  };
  const handleEdit = async (event) => {
    const { id } = event.currentTarget;
    const putTheData = await putData(item[id]._id);
    console.log(putTheData);
    deleteById(item[id]._id);
  };
  const handleDelete = async (event) => {
    event.preventDefault();
    const { id } = event.currentTarget;
    const deleteItem = await deleteById(item[id]._id);
    window.location.reload();
    return deleteItem;
  };

  return (
    <div className="wrapper">
      <div className="main">
        <Link to={'/list'}>Ver contenido de la base de datos</Link>;<br></br>
        <br></br>
        <form onSubmit={handleSubmit}>
          <p>Nombre</p>
          <input
            placeholder="nombre"
            type="text"
            name="data1"
            value={data.data1}
            onChange={handleChange}
          />
          <br></br>
          <p>Edad</p>
          <input
            type="text"
            name="data2"
            value={data.data2}
            onChange={handleChange}
          />
          <button onClick={handleSubmit}>Enviar</button>

          <br></br>
          <ul>
            {item.map((e, i) => {
              return (
                <>
                  <ul key={i}>
                    {/* <p>{e._id}</p> */}
                    <li>{e.data1}</li>
                    <li>{e.data2} años</li>
                    <button onClick={handleEdit} id={i}>
                      editar
                    </button>
                    <button onClick={handleDelete} id={i}>
                      Borrar
                    </button>
                  </ul>
                </>
              );
            })}
          </ul>
        </form>
      </div>
    </div>
  );
};
