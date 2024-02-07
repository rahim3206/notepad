import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'

function NotepadList() {
    const [notepadList, setNotepadList] = useState([])
    const {category_id} = useParams();

    const addNotepad = async () => {
        try {
    
            // Set default values if needed
    
            const response = await axios.post('http://localhost:8000/api/add/notepad', {
                category_id: 1,
                content: "dgfsdf",
                title: "sdfgsdf"
            });

            console.log(response.data);
            not_l();
        } catch (error) {
            console.log("Add Notepad Error", error);
        }
    };
    const not_l = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/notepad/${category_id}/`)
                setNotepadList(response.data)
            } catch (error) {
                console.log("notepad Fetching Error" , error);
            }
        }
    
    useEffect(() => {
        not_l();
    }, [])
    
  return (
    <div className="container">
        <div className='p-3 w-100 d-flex justify-content-end'>
            <button className='btn btn-primary' onClick={addNotepad}>Add Notepad</button>
        </div>
        <br />
        <ul className="list-group">
            {
               notepadList.map((data) => (
                <li className="list-group-item" key={data.id}><Link to={`/notepad/${data.id}`} className='text-decoration-none text-dark'>{data.title}</Link></li>
               )) 
            }
        </ul>
    </div>
  )
}

export default NotepadList