import axios from 'axios';
import  { useEffect, useRef, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import { useParams } from 'react-router-dom';

function Notepad() {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const { id } = useParams();
    const quillRef = useRef(null);

    useEffect(() => {
      ;( async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/notepad/${id}/edit`)
            setTitle(response.data.title)  
            setContent(response.data.content)    
        }
         catch (error) {
            console.log("Notepad Data Error" ,error);
        }
      } )()
    }, [])

    const up_note = async (e) => {
      e.preventDefault();
      try {
          const response = await axios.put(`http://localhost:8000/api/notepad/update`,{
            id : id,
            title : title,
            content : content
          })
          console.log(response.data);
      } catch (error) {
        console.log("Notepad Update Error : " , error);
      }
    }

    const handleQuillChange = (value) => {
      setContent(value);
    };

    const getHtmlContent = () => {
      if (quillRef.current) {
        const quill = quillRef.current.getEditor();
        const htmlContent = quill.root.innerHTML;
        console.log(htmlContent);
      }
    };

    return (
        <div className='container'>
            <form action="#" onSubmit={up_note}>
                <button className='btn btn-info text-white' type='submit'>Save</button>
                <input 
                    id='title'
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className='form-control'
                />
                <br />
                <ReactQuill
                    theme="snow"
                    value={content}
                    onChange={handleQuillChange}
                    ref={quillRef}
                />
            </form>
        </div>
    )
}

export default Notepad
