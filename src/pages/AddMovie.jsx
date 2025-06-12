import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import NavbarAdmin from '../components/NavbarAdmin';
import Button from '../components/Button';
import { InputNormal } from '../components/InputStyle';
import { useDispatch } from 'react-redux';
import { addMovieAction } from '../redux/reducers/movies';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function AddMovie() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [imagePreview, setImagePreview] = useState(null)

  const schema = yup.object({
    movieTitle: yup.string().trim().required('Movie name is required.'),
    category: yup.string().trim().required('Category is required.'),
    releaseDate: yup.date().required('Release date is required.').typeError('Invalid date.'),
    durationHour: yup.number().required('Duration hour is required.').min(0),
    durationMinute: yup.number().required('Duration minute is required.').min(0).max(59, "Duration minutes max. 59"),
    director: yup.string().trim().required('Director is required.'),
    cast: yup.string().trim().required('Cast is required.'),
    synopsis: yup.string().trim().required('Synopsis is required.'),
  })

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { 
      movieTitle: '', 
      category: '', 
      releaseDate: '', 
      durationHour: '', 
      durationMinute: '', 
      director: '', 
      cast: '', 
      synopsis: '' 
    },
  })

 const handleImageChange = (e) => {
  const file = e.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result) 
    }
    reader.readAsDataURL(file)
  }
}

  const onSubmit = (data) => {
    const movieData = { 
      ...data, 
      id: Date.now(), 
      releaseDate: new Date(data.releaseDate).toISOString(), 
      duration: `${data.durationHour}h ${data.durationMinute}m`,
      poster_path: imagePreview || '/assets/imageplaceholder.png' 
    }
    dispatch(addMovieAction(movieData))
    toast.success('Movie saved!')
    reset()
    setImagePreview(null)
    navigate('/listmovie')
  }

  return (
    <>
      <NavbarAdmin />
      <div className="min-h-screen bg-gray-100 pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-lg shadow-md">
          <h1 className="text-lg sm:text-xl font-medium text-gray-700 mb-6">Add New Movie</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex items-center justify-evenly border-2 border-dashed border-gray-300 rounded-lg p-4 h-40 relative gap-4">
              <div className='flex flex-col items-center'>
                <p className="text-sm text-gray-500 mb-2">Upload Movie Poster</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  id="imageUpload"
                />
                <Button
                  variant="primary"
                  className="mt-2 px-4 py-2 text-sm"
                  as="label"
                  htmlFor="imageUpload"
                >
                  Choose Image
                </Button>
              </div>
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mt-4 w-32 h-32 object-cover rounded-lg border-gray-200"
                />
              )}
            </div>
            <InputNormal label="Movie Name" type="text" placeholder="Enter movie name" id="movieTitle" {...register('movieTitle')} className="border border-gray-300 focus:ring-blue-500" />
            {errors.movieTitle && <div className="text-red-600 text-sm">{errors.movieTitle.message}</div>}
            <InputNormal label="Category" type="text" placeholder="Enter category" id="category" {...register('category')} className="border border-gray-300 focus:ring-blue-500" />
            {errors.category && <div className="text-red-600 text-sm">{errors.category.message}</div>}
            <div className='flex items-end justify-end gap-2'>
              <InputNormal label="Release Date" type="date" placeholder="Enter date" id="releaseDate" {...register('releaseDate')} className="border border-gray-300 focus:ring-blue-500" />
              <div className='flex items-end gap-2'>
                <InputNormal label="Duration" type="number" placeholder="Hour" id="durationHour" {...register('durationHour')} className="border border-gray-300 focus:ring-blue-500  w-25" />
                <InputNormal  type="number" placeholder="Minute" id="durationMinute" {...register('durationMinute')} className="border border-gray-300 focus:ring-blue-500 w-25" />
              </div>
            </div>

              {errors.releaseDate && <div className="text-red-600 text-sm">{errors.releaseDate.message}</div>}
              {errors.durationHour && <div className="text-red-600 text-sm">{errors.durationHour.message}</div>}
              {errors.durationMinute && <div className="text-red-600 text-sm">{errors.durationMinute.message}</div>}
            
            <InputNormal label="Director Name" type="text" placeholder="Enter director name" id="director" {...register('director')} className="border border-gray-300 focus:ring-blue-500" />
            {errors.director && <div className="text-red-600 text-sm">{errors.director.message}</div>}
            <InputNormal label="Cast" type="text" placeholder="Enter cast name" id="cast" {...register('cast')} className="border border-gray-300 focus:ring-blue-500" />
            {errors.cast && <div className="text-red-600 text-sm">{errors.cast.message}</div>}
            <InputNormal label="Synopsis" type="text" placeholder="Enter synopsis" id="synopsis" {...register('synopsis')} className="border border-gray-300 focus:ring-blue-500" />
            {errors.synopsis && <div className="text-red-600 text-sm">{errors.synopsis.message}</div>}
            <Button variant="primary" type="submit" className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">Save Movie</Button>
          </form>
        </div>
      </div>
    </>
  )
}

export default AddMovie;