import React, {useCallback, useEffect} from 'react'
import { useForm } from 'react-hook-form'
import {Button, Input, RTE,Select } from '../index'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import service from '../../appwrite/config'

function Postform({post}) {
    const {register, handleSubmit, watch, setValue,control,getValues} = useForm({
        defaultValues: {
         title: post?.title || "",
         slug: post?.$id || "",
         content: post?.content || "",
         status: post?.status || 'active'
        },
    });
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        //Here We suppose there is a post and we are updating the featuredImg in the post.
        if (post) {
          const file = data.image?.[0] ? await service.uploadFile(data.image[0]) : null
           if(!file) {
            console.error("Image upload failed.");
            return ;
           }

           const fileId = file.$id;
           data.featuredImg = fileId;

            const dbPost = await service.updatePost(post.$id,{
                ...data,
                featuredImg: file ? file.$id : undefined,
            });
            
            if (dbPost) {
                navigate(`/post/${dbPost.$id}`)
            }                
        } else {
            const file = await service.uploadFile(data.image[0])
            if (file) {
                const fileId = file.$id;
                data.featuredImg = fileId;
                const dbPost = await service.createPost({...data, userId: userData.$id });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string") 
            //method 1: 
            // value.toLowerCase().replace(/ /g, '-')
            // setValue('slug',slug)
            // return slug;

            return value
            .trim()
            .toLowerCase()
            .replace(/[^a-zA-Z\d]+/g, '-');
            
            //else return empty
            return "";
         }, []);

    useEffect(() => {
           const subsription = watch((value, {name}) => {
                if (name === "title") {
                    setValue("slug",slugTransform(value.title), 
                   {shouldValidate: true});
                }
            });

            //Here To optimize the useEffect i.e to stop loop, We store the watch value in a variable and use callback in return  and unsubscribe() the variable..
            return () => subsription.unsubscribe();
    }, [watch, slugTransform, setValue])


 return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={service.getFilePreview(post.featuredImg)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}


export default Postform