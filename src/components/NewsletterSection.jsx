import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { InputNormal } from './InputStyle';


function NewsletterSection() {

const validationSchema = yup.object({
email: yup.string().trim().required('Email is required.'),
name: yup.string().required('Name is required.')
})
const {register, handleSubmit, reset, formState: { errors } } = useForm({
  resolver: yupResolver(validationSchema)
})

const onSubmit = () => {
    toast.success('Thank you for subscribing!', {
      style: {
        background: '#4ade80',
        color: '#fff',
      },
    }),
    reset()
  }

  return (
    <div className="flex p-4 sm:p-6 md:p-8 lg:p-20 flex-col items-center gap-2 sm:gap-4 md:gap-6">
      <div className="flex px-4 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-8 md:py-10 lg:py-20 flex-col items-start gap-2 sm:gap-4 rounded-2xl sm:rounded-3xl bg-primary-300 w-full">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-start gap-4 sm:gap-6 md:gap-8 w-full">
          <label className="font-bold text-2xl sm:text-3xl md:text-4xl leading-tight text-center w-full">Subscribe to our newsletter</label>
          <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 self-stretch">
          <div className='flex flex-col w-full gap'>
            <InputNormal
              type="text"
              id="name"
              placeholder="Enter your name"
              {...register('name')}
                 />
              {errors.name && <div className="px-2 text-wrong-600 text-sm">{errors.name.message}</div>}
            
          </div>
          <div className='flex flex-col w-full gap'>
            <InputNormal
              type="email"
              id="email"
              placeholder="Enter your email"
              {...register('email')}
                 />
              {errors.email && <div className="px-2 text-wrong-600 text-sm">{errors.email.message}</div>}
          </div>
            {/* <input
              type="text"
              placeholder="Your First Name"
              className="flex px-4 py-2 items-center gap-2 flex-[1_0_0] rounded-[6.25rem] border border-primary-500 bg-white field-text1-regular text-sm sm:text-base md:text-lg w-full"
            />
            <input
              type="email"
              placeholder="Your Email Address"
              className="flex px-4 py-2 items-center gap-2 flex-[1_0_0] rounded-[6.25rem] border border-black bg-white field-text1-regular text-sm sm:text-base md:text-lg w-full"
            /> */}
          </div>
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 px-4 py-2 sm:py-3 rounded-full bg-primary-500 text-white hover:bg-primary-600 button-medium text-sm sm:text-base md:text-lg"
          >
            Subscribe now
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewsletterSection;