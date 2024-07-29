"use client"
import { toast } from 'react-toastify';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

interface FormData {
   email: string;
}

const schema = yup
   .object({
      email: yup.string().required().email().label("Email"),
   })
   .required();

const NewsletterForm = () => {

   const { register, handleSubmit, reset, formState: { errors }, } = useForm<FormData>({ resolver: yupResolver(schema), });
   const onSubmit = (data: FormData) => {
      const notify = () => toast('Emeil sent successfully', { position: 'top-center' });
      notify();
      reset();
   };

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <input type="email" {...register("email")} placeholder="Info@gmail.com" />
         <p className="form_error">{errors.email?.message}</p>
         <button type="submit"><i className="fas fa-paper-plane"></i></button>
      </form>
   )
}

export default NewsletterForm
