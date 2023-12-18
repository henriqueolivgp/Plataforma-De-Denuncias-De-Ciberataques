import { SupaBaseClient } from '../Services/supabase/SupaBaseClient';
import ChildrenContext, { ImgsContext } from "../context/ImgsContext";
import { useState, useCallback } from "react";
import type { ImgType } from '../context/ImgsContext';
import { toast } from "react-toastify";
import { useAuth } from "../hooks/useAuth";



export function ImgsProvider({ children }: ChildrenContext) {
    const { user } = useAuth();
    const [bannerImages, setBannerImages] = useState<ImgType[]>([]);
    const [avatarImages, setAvatarImages] = useState<ImgType[]>([]);
    const [images, setImages] = useState<ImgType[]>([]);

    const getImages = useCallback(async () => {
        console.log("estou aqui")
        try {
            const { data, error } = await SupaBaseClient
                .storage
                .from('Avatar')
                .list(`${user?.id}/`, {
                    limit: 100,
                    offset: 0,
                    sortBy: { column: "name", order: "asc" }
                });

            if (data) {

                setImages(data);
                console.log("estou no provider no getImages")
                setAvatarImages(avatarImages);

                // Retornar as imagens aqui
                return { bannerImages, avatarImages, images: data };
            } else {
                toast.error("Error loading images");
                console.log(error);
                
            }
        } catch (error) {
            console.error(error);
        }
        try {
            const { data, error } = await SupaBaseClient
                .storage
                .from('Avatar')
                .list(`${user?.id}/`, {
                    limit: 100,
                    offset: 0,
                    sortBy: { column: "name", order: "asc" }
                });

            if (data) {

                setImages(data);
                console.log("estou no provider no getImages")
                setBannerImages(bannerImages);

                // Retornar as imagens aqui
                return { bannerImages, avatarImages, images: data };
            } else {
                toast.error("Error loading images");
                console.log(error);
                
            }
        } catch (error) {
            console.error(error);
        }
    }, [avatarImages, bannerImages, user?.id]);

    const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("Função uploadImage chamada");
        const file = e.target.files?.[0];

        if (file && user) {
            try {
                const { data, error } = await SupaBaseClient
                    .storage
                    .from('Avatar')
                    .upload(`${user.id}/${avatarImages}`, file);

                if (data) {
                    getImages();
                } else {
                    console.error(error);
                }
            } catch (error) {
                console.error(error);
            }

            try {
                const { data, error } = await SupaBaseClient
                    .storage
                    .from('Banner')
                    .upload(`${user.id}/${images}`, file);
                    console.log(images)

                if (data) {
                    getImages();

                    if (images.length === 0) {
                        console.log('Imagem enviada como banner.');
                    }
                } else {
                    console.error(error);
                }
            } catch (error) {
                console.error(error);
            }

        }
    };

    return (
        <ImgsContext.Provider value={{ user, bannerImages, avatarImages, images, getImages, uploadImage, }}>
            {children}
        </ImgsContext.Provider>
    );
}
