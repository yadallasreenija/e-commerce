import React, { useState } from 'react'
import server from '../server'
import axios from 'axios'
function CreateProduct() {

const [images,setImages]=useState([])
const [preImage,setPreImage]=useState([])
const [name,setName]=useState("")
const [description,setDescription]=useState("")
const [category,setCategory]=useState("")
const [tags,setTags]=useState("")
const [price,setPrice]=useState("");
const [stock,setStock]=useState("");
const [email,setEmail]=useState("");

const categoriesData =[
{
  title:"Electronics"
},
{
  title:"Fashion"
},
{
  title:"Books"
},
{
  title:"Home Appliances"
},

]
const  handleImage=(e)=>{
  const files = Array.from(e.target.files)
  setImages((prevImg)=>[...prevImg,...files])
  const imagePreviews = files.map((file)=>URL.createObjectURL(file))//generates a temporary URL that can be used to display the image in an <img> tag.
  console.log(imagePreviews)
   setPreImage((prev)=>[...prev,...imagePreviews])   

}

const handleSubmit =async(e)=>{
  e.preventDefault()
const formData= new FormData()
 formData.append('name',name)
 formData.append('description',description)
 formData.append('category',category)
 formData.append('tags',tags)
 formData.append('price',price)
 formData.append('stock',stock)
 formData.append('email',email)
images.forEach(images=>{
  formData.append("images",images)
})
try{
const response = await axios.post(`${server}/product/createProduct`,formData,{headers: { 'Content-Type': 'multipart/form-data' },withCredentials:true})

if (response.status === 201) {
  alert("Product created successfully!");
  setImages([]);
  setName("");
  setDescription("");
  setCategory("");
  setTags("");
  setPrice("");
  setStock("");
  setEmail("");
}

}
catch (err) {
  console.error("Error creating product:", err);
  alert("Failed to create product. Please check the data and try again.");
}

}


  return (
    <div>
      <h5>Create Product</h5>
      <form onSubmit = {handleSubmit}>
        <div>
          <label>
            Email <span className='text-red-500'>*</span>
          </label>
           <input type='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter your mail'required/>
        </div>
        <div>
          <label>Name<span className='text-red-500'>*</span></label>
          <input type='text' value={name} onChange={(e)=>setName(e.target.value) }required placeholder='Enter product name'/> 
        </div>
       <div>
       <label>Description<span className='text-red-500'>*</span></label>
        <textarea value={description} onChange={(e)=>setDescription(e.target.value)} placeholder='Enter product Description' rows="5" required />
       </div>
           <div>
            <label>Category<span>*</span></label>
            <select value={category} onChange={(e)=>setCategory(e.target.value)}required>
              <option>Select an option</option>
              {categoriesData.map((item,ind)=>(
                <option value={item.title} key={ind} > {item.title}</option>
              ))}
            </select>
           </div>
           <div>
            <label>Tags</label>
            <input type='text'value={tags} onChange={(e)=>setTags(e.target.value)} />   
           </div>
            <div>
             <label>Price<span className='text-red-500'>*</span></label>
              <input type='number' value={price} onChange={(e)=>setPrice(e.target.value)} required/>
            </div>
            <div>
              <label>Stock <span className='text-red-500'>*</span></label>
               <input type='number' value={stock} onChange={(e)=>setStock(e.target.value) }required/> 
            </div>
            <div>
            <label className="pb-1 block">
                        Upload Images <span className="text-red-500">*</span>
                    </label>
             <input type='file' id='upload' onChange={handleImage} required multiple/>  
              <div>
              {preImage.map((img, index) => ( // Using previewImages
                            <img
                                src={img}
                                key={index}
                                alt="Preview"
                                className="w-[100px] h-[100px] object-cover m-2"
                            />
                        ))}

              </div>
              <button
                    type="submit"
                    className="w-full mt-4 bg-blue-500 text-white p-2 rounded"
                >
                    Create
                </button>
               </div>
                  
              
      </form>
    </div>
  )
}

export default CreateProduct