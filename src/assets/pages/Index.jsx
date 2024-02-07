
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import * as ant from 'antd'
import * as aniicon from '@ant-design/icons';
import axios from 'axios'
import Meta from 'antd/es/card/Meta';

function Index() {

    const [category, setCategory] = useState([])
    const [title, setTitle] = useState("")
    const [addTitle, setAddTitle] = useState("")
    const [isEditable, setisEditable] = useState(null)
    const [open, setOpen] = useState(false);

    const getCategory = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/category')
            setCategory(response.data)
        } catch (error) {
            console.log("Failed Category Data : " , error);
        }
    }

    useEffect(() => {
        getCategory();
    },[])

    const updateTitle = async () => {
        try {
            const response = await axios.put( `http://localhost:8000/api/category/update`,{
                id:isEditable,
                title:title
            })
            console.log(response);
            setisEditable(null)
            getCategory();
        } catch (error) {
            console.log(error);
        }
    };
    const handleEdit = (categoryId, title) => {
        setisEditable(categoryId);
        setTitle(title);
    };

    const addCategory = async (e) => {
        e.preventDefault()
        try {
            await axios.post('http://localhost:8000/api/category',{
                title : addTitle
            })
            getCategory();
            setOpen(false)
        } catch (error) {
            console.log(error);
        }
    }
    

    const hide = () => {
        setOpen(false);
      };
      const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
      };

    const deleteCategory = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/category/${id}/delete`)
            getCategory()
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className="container">
       
        <div className='d-flex justify-content-end mt-3'>
           
        <ant.Popover
            content={
                <form onSubmit={addCategory} value={addTitle} onChange={(e) => setAddTitle(e.target.value)}>
                    <ant.Input placeholder="Enter something" />
                    <ant.Button type="primary" htmlType="submit" className='mt-3'>Submit</ant.Button>
                </form>
            }
            title="Add Item"
            trigger="click"
            visible={open}
            onVisibleChange={handleOpenChange}
        >
            <ant.Button type="primary" icon={<aniicon.PlusOutlined />}>Add</ant.Button>
        </ant.Popover>
        </div>
        <ant.Row justify="space-evenly mt-4">
            {
               category.map((data) => (
            <ant.Col span={4}  key={data.id}>
            <ant.Card
                style={{ width: 300 }}
                actions={[
                <aniicon.EditOutlined key="edit"  onClick={() => handleEdit(data.id , data.title)}/>,
                <aniicon.DeleteOutlined key="delete" onClick={ () => deleteCategory(data.id) }/>,
                <aniicon.EllipsisOutlined key="ellipsis" />,
                ]}
            >
                {isEditable === data.id ? (
                                <ant.Input
                                    placeholder="Edit Title"
                                    value={title}
                                    onChange={(e) => {
                                        setTitle(e.target.value)
                                    }}
                                    onBlur={updateTitle}
                                />
                            ) : (
                                <Link to={`/notepad_list/${data.id}`} className='text-decoration-none'>
                                    <Meta title={data.title} className='text-center' />
                                </Link>
                            )}
            </ant.Card>
            </ant.Col>
            )) 
            }
        </ant.Row>
    </div>
  )
}

export default Index