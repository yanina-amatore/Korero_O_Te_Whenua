import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSearchedRegions, fetchMaoriSearchedRegions } from '../actions/search'

export default function search() {
    
    const [region, setRegion ] = useState('') 
    const [maoriRegion, setMaoriRegion ] = useState('') 
    const dispatch = useDispatch()
    const search = useSelector((state:any) => state.search)

    const [files, setFiles]:any = useState([])
    const [imageURLs, setImageURLs]: any = useState([])

    useEffect(() => {
        if(files.length < 1) return;
        const newImageUrls:any = []
        files.forEach(file => newImageUrls.push(URL.createObjectURL(file)))
        setImageURLs(newImageUrls)
    }, [files])
    const fileSelector = (e) => {
        console.log(e.target.files[0]);
        setFiles([...e.target.files])
    }
    
    const fileUploader = () => {
        console.log(files);
        console.log(imageURLs);
    }

  return (
    <>
        <div>
            <label>Filter By Region(English)
            <input onChange = {(e) => {setRegion(e.target.value)}}/>
            </label>
            <button onClick={() => dispatch(fetchSearchedRegions(region))}>Click</button>
            {search?.map(story => {
                return <h3>{story?.story_id}</h3>
                
            })}
        </div>
        <div>
            <label>Filter By Region(Maori)
            <input onChange = {(e) => {setMaoriRegion(e.target.value)}}/>
            </label>
            <button onClick={() => dispatch(fetchMaoriSearchedRegions(maoriRegion))}>Click</button>
            <h3>{search?.region_id}</h3>
        </div>

        <div>
            <input type= "file" onChange = {fileSelector} id = "img" accept= "image/*" ></input>
            <button onClick={fileUploader}>Upload</button>
        </div>
    
    </>
  )
}



